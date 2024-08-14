"use client";
import React, { useCallback, useState } from "react";

export default function useNumber(initialValue: string) {
  const [number, setNumber] = useState(initialValue);
  const onNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 문자 제거
    const value = e.target.value.replace(/\D/g, "");
    const unit = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setNumber(unit);
  };
  return [number, onNumber] as const;
}
