'use client'
import React, { useCallback, useEffect, useState } from 'react'

export default function useSelect(initialValue:string, onPopup:() => void) {
  const [value, setValue] = useState(initialValue);
  const onValue = useCallback((newValue: string) => {
      setValue(newValue);
      onPopup();
    }, [onPopup]);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return [value, onValue] as const;
}
