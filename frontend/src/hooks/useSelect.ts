'use client'
import React, { useCallback, useState } from 'react'

export default function useSelect(initialValue:string, onPopup:() => void) {
  const [value, setValue] = useState(initialValue);
  const onValue = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onPopup();
    },
    [onPopup]
  );
  return [value, onValue] as const;
}
