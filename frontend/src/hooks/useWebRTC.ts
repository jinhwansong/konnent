'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import SimplePeer, { SignalData } from 'simple-peer';
import { Socket } from 'socket.io-client';

interface UseWebRTCOptions {
  roomId: string;
  userId: string;
  socket: Socket | null; // 소켓은 초기에는 null일 수 있음
  isInitiator?: boolean;
}

interface WebRTCUser {
  id: string;
  name: string;
  image?: string;
  isMentor: boolean;
  stream?: MediaStream;
}

interface WebRTCSignalPayload {
  roomId: string;
  targetUserId: string;
  signal: SignalData;
  type: 'offer' | 'answer' | 'ice_candidate';
}

// 화면 공유 제약 조건 타입 (DOM lib 일부 환경 호환)
type DisplaySurfaceType = 'browser' | 'window' | 'application' | 'monitor' | 'screen' | 'tab';
type DisplayMediaConstraints = {
  video: boolean | (MediaTrackConstraints & { displaySurface?: DisplaySurfaceType });
  audio?: boolean | MediaTrackConstraints;
};

export const useWebRTC = ({ roomId, userId, socket }: UseWebRTCOptions) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(
    new Map()
  );
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [originalStream, setOriginalStream] = useState<MediaStream | null>(
    null
  );

  type PeerInstance = SimplePeer.Instance;
  const peersRef = useRef<Map<string, PeerInstance>>(new Map());
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // 로컬 스트림 초기화
  const initializeLocalStream = useCallback(async () => {
    try {
      setIsLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setLocalStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      socket?.emit('stream_ready', { roomId, userId });
    } catch (err) {
      console.error('Error accessing media devices:', err);
      setError('카메라와 마이크에 접근할 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [roomId, userId, socket]);

  // Peer 연결 생성
  const createPeer = useCallback(
    (targetUserId: string, isInitiator: boolean): PeerInstance => {
      const peer = new SimplePeer({
        initiator: isInitiator,
        trickle: false,
        stream: localStream || undefined,
      });

      peer.on('signal', (signal: SignalData) => {
        const payload: WebRTCSignalPayload = {
          roomId,
          targetUserId,
          signal,
          type: isInitiator ? 'offer' : 'answer',
        };
        socket?.emit('webrtc_signal', payload);
      });

      peer.on('stream', (stream: MediaStream) => {
        setRemoteStreams(prev => new Map(prev.set(targetUserId, stream)));
      });

      peer.on('connect', () => {
        console.log('Peer connected:', targetUserId);
        setIsConnected(true);
      });

      peer.on('error', (err: Error) => {
        console.error('Peer error:', err);
        setError('연결 중 오류가 발생했습니다.');
      });

      peer.on('close', () => {
        console.log('Peer disconnected:', targetUserId);
        setRemoteStreams(prev => {
          const newMap = new Map(prev);
          newMap.delete(targetUserId);
          return newMap;
        });
        peersRef.current.delete(targetUserId);
      });

      return peer;
    },
    [localStream, roomId, socket]
  );

  // WebRTC 시그널 처리
  const handleWebRTCSignal = useCallback(
    (data: WebRTCSignalPayload) => {
      const { targetUserId, signal, type } = data;

      if (targetUserId === userId) return; // 자신에게 온 신호는 무시

      const existingPeer = peersRef.current.get(targetUserId);

      if (type === 'offer') {
        const newPeer = createPeer(targetUserId, false);
        newPeer.signal(signal);
        peersRef.current.set(targetUserId, newPeer);
      } else if (type === 'answer' && existingPeer) {
        existingPeer.signal(signal);
      } else if (type === 'ice_candidate' && existingPeer) {
        existingPeer.signal(signal);
      }
    },
    [userId, createPeer]
  );

  // 사용자 참여 처리
  const handleUserJoined = useCallback(
    (userData: WebRTCUser) => {
      if (userData.id === userId) return;
      if (peersRef.current.has(userData.id)) return;

      const peer = createPeer(userData.id, true);
      peersRef.current.set(userData.id, peer);
    },
    [userId, createPeer]
  );

  // 사용자 나가기 처리
  const handleUserLeft = useCallback((leftUserId: string) => {
    const peer = peersRef.current.get(leftUserId);
    if (peer) {
      peer.destroy();
      peersRef.current.delete(leftUserId);
    }

    setRemoteStreams(prev => {
      const newMap = new Map(prev);
      newMap.delete(leftUserId);
      return newMap;
    });
  }, []);

  // Socket 이벤트 리스너 등록
  useEffect(() => {
    if (!socket) return;

    socket.on('webrtc_signal', handleWebRTCSignal);
    socket.on('user_joined', handleUserJoined);
    socket.on('user_left', handleUserLeft);
    socket.on('stream_ready', handleUserJoined);

    return () => {
      socket.off('webrtc_signal', handleWebRTCSignal);
      socket.off('user_joined', handleUserJoined);
      socket.off('user_left', handleUserLeft);
      socket.off('stream_ready', handleUserJoined);
    };
  }, [socket, handleWebRTCSignal, handleUserJoined, handleUserLeft]);

  // 언마운트 시 정리
  useEffect(() => {
    const currentPeers = peersRef.current;
    const currentStream = localStream;

    return () => {
      currentPeers.forEach(peer => peer.destroy());
      currentPeers.clear();
      if (currentStream) currentStream.getTracks().forEach(t => t.stop());
    };
  }, [localStream]);

  // 비디오/오디오 토글
  const toggleVideo = useCallback(() => {
    if (!localStream) return;
    const videoTrack = localStream.getVideoTracks()[0];
    if (videoTrack) videoTrack.enabled = !videoTrack.enabled;
  }, [localStream]);

  const toggleAudio = useCallback(() => {
    if (!localStream) return;
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) audioTrack.enabled = !audioTrack.enabled;
  }, [localStream]);

  
  // 화면 공유 중지
  const stopScreenShare = useCallback(async () => {
    try {
      if (originalStream) {
        setLocalStream(originalStream);
        setIsScreenSharing(false);
        setOriginalStream(null);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = originalStream;
        }

        // 모든 Peer에 원래 스트림으로 복원
        peersRef.current.forEach(peer => {
          const oldTrack = localStream?.getVideoTracks()[0];
          const newTrack = originalStream.getVideoTracks()[0];
          if (oldTrack && newTrack) {
            peer.replaceTrack(oldTrack, newTrack, localStream!);
          }
        });

        // 소켓으로 화면 공유 중지 상태 전송
        socket?.emit('screen_share_stopped', { roomId, userId });
      }
    } catch (err) {
      console.error('Error stopping screen share:', err);
      setError('화면 공유를 중지할 수 없습니다.');
    }
  }, [originalStream, localStream, roomId, userId, socket]);

  // 화면 공유 시작
  const startScreenShare = useCallback(
    async (source: 'screen' | 'window' | 'tab' = 'screen') => {
      try {
        setIsLoading(true);

        // 현재 스트림 저장 (복원용)
        if (localStream && !isScreenSharing) {
          setOriginalStream(localStream);
        }

        const constraints: DisplayMediaConstraints = {
          video: {
            displaySurface: source,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: true,
        };

        const screenStream =
          await navigator.mediaDevices.getDisplayMedia(constraints as MediaStreamConstraints);

        setLocalStream(screenStream);
        setIsScreenSharing(true);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }

        // 모든 Peer에 새 스트림 전송
        peersRef.current.forEach(peer => {
          const oldTrack = localStream?.getVideoTracks()[0];
          const newTrack = screenStream.getVideoTracks()[0];
          if (oldTrack && newTrack) {
            peer.replaceTrack(oldTrack, newTrack, localStream!);
          }
        });

        // 화면 공유 종료 이벤트 처리
        screenStream.getVideoTracks()[0].onended = () => {
          stopScreenShare();
        };

        // 소켓으로 화면 공유 상태 전송
        socket?.emit('screen_share_started', { roomId, userId });
      } catch (err) {
        console.error('Error starting screen share:', err);
        setError('화면 공유를 시작할 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [localStream, isScreenSharing, roomId, userId, socket, stopScreenShare]
  );

  return {
    localStream,
    remoteStreams,
    isConnected,
    isLoading,
    error,
    isScreenSharing,
    localVideoRef,
    initializeLocalStream,
    toggleVideo,
    toggleAudio,
    startScreenShare,
    stopScreenShare,
  };
};
