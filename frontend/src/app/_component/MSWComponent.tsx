'use client';
import React, { useEffect } from 'react';

export default function MSWComponent() {
  // 브라우저에서만 돌아가게
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        require('@/mocks/browser');
      }
    }
  }, []);
  return null;
}
