import React from "react";
import styles from "./button.module.scss";

interface Input {
  type: "submit" | "button";
  bg?: string;
  children: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  disabled?:boolean;
  
}

export default function Button({
  type,
  bg,
  children,
  width,
  height,
  onClick,
  disabled,
}: Input) {
  const button = [
    styles.button,
    bg && styles[`bg${bg as string}`],
    width && styles[`width${width as string}`],
    height && styles[`height${height as string}`],
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      type={type}
      className={button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
