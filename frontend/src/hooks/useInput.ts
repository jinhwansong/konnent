'use client';
import React, { useCallback, useState } from 'react';

export default function useInput(initialValue: string) {
  const [name, setName] = useState(initialValue);

  const onName = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      setName(e.target.value);
    },
    [],
  );
  return [name, onName, setName] as const;
}
