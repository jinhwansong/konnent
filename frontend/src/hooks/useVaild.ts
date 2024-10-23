"use client";
import React, { useCallback, useState } from "react";

export default function useVaild<T>(
  initialValue: T,
  validator: (value: T) => string
) {
  const [name, setName] = useState(initialValue);
  const [error, setError] = useState("");
  const [vaild,setVaild] = useState(false);
  const onName = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const value = e.target.value as T;
      setName(value);
      setVaild(false)
      if (validator) {
        const errorMessage = validator(value);
        setError(errorMessage);
      }
    },
    [validator]
  );
  return [name, onName, error, vaild, setVaild] as const;
}
