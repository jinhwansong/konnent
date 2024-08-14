'use client';
import React, { useCallback, useState } from 'react';

export default function useTap(initialValue: number) {
  const [tap, setTap] = useState(initialValue);
  const changeTap = useCallback((id:number) => {
    setTap(id);
  }, []);
  return [tap, changeTap] as const;
}
