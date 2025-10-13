'use client';

import { useEffect, useState } from 'react';

interface MicrophoneSelectorProps {
  onDeviceChange: (deviceId: string) => void;
}

export default function MicrophoneSelector({ onDeviceChange }: MicrophoneSelectorProps) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');

  useEffect(() => {
    const getDevices = async () => {
      try {
        // 먼저 권한 요청
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // 디바이스 목록 가져오기
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = allDevices.filter(device => device.kind === 'audioinput');
        
        console.log('🎤 Available microphones:', audioInputs);
        setDevices(audioInputs);
        
        if (audioInputs.length > 0 && !selectedDevice) {
          setSelectedDevice(audioInputs[0].deviceId);
        }
      } catch (err) {
        console.error('Failed to get audio devices:', err);
      }
    };

    getDevices();
    
    // 디바이스 변경 감지
    navigator.mediaDevices.addEventListener('devicechange', getDevices);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getDevices);
    };
  }, [selectedDevice]);

  const handleChange = (deviceId: string) => {
    console.log('🎤 Switching to microphone:', deviceId);
    setSelectedDevice(deviceId);
    onDeviceChange(deviceId);
  };

  if (devices.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-[120px] right-4 bg-black/90 p-3 rounded-lg text-white text-xs font-mono z-50 border-2 border-blue-500 max-w-xs">
      <div className="font-bold mb-2">🎤 마이크 선택</div>
      <select
        value={selectedDevice}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full bg-gray-800 text-white px-2 py-1 rounded text-xs border border-gray-600 focus:border-blue-500 focus:outline-none"
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Microphone ${device.deviceId.slice(0, 5)}...`}
          </option>
        ))}
      </select>
      <div className="mt-2 text-xs text-gray-400">
        총 {devices.length}개 감지됨
      </div>
    </div>
  );
}


