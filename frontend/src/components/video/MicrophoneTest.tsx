'use client';

import { useEffect, useRef, useState } from 'react';

interface MicrophoneTestProps {
  stream: MediaStream | null;
}

export default function MicrophoneTest({ stream }: MicrophoneTestProps) {
  const [volume, setVolume] = useState(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!stream) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    
    analyser.fftSize = 256;
    microphone.connect(analyser);
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateVolume = () => {
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setVolume(Math.min(100, (average / 128) * 100));
      }
      animationRef.current = requestAnimationFrame(updateVolume);
    };

    updateVolume();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      microphone.disconnect();
      analyser.disconnect();
      audioContext.close();
    };
  }, [stream]);

  const barHeight = Math.max(4, (volume / 100) * 40);
  const barColor = volume > 50 ? 'bg-green-500' : volume > 20 ? 'bg-yellow-500' : 'bg-gray-500';

  return (
    <div className="fixed top-4 right-4 bg-black/90 p-3 rounded-lg text-white text-xs font-mono z-50 border-2 border-purple-500">
      <div className="font-bold mb-2">🎤 마이크 테스트</div>
      <div className="flex items-end gap-1 h-10 mb-2">
        {Array.from({ length: 20 }).map((_, i) => {
          const isActive = i < (volume / 5);
          return (
            <div
              key={i}
              className={`w-2 transition-all ${isActive ? barColor : 'bg-gray-700'}`}
              style={{ height: isActive ? `${barHeight}px` : '4px' }}
            />
          );
        })}
      </div>
      <div className="text-center">
        볼륨: {Math.round(volume)}%
        {volume > 10 ? ' 🔊' : ' 🔇'}
      </div>
      <div className="text-center text-xs text-gray-400 mt-1">
        {volume > 10 ? '말하는 중 감지됨!' : '조용함...'}
      </div>
    </div>
  );
}

