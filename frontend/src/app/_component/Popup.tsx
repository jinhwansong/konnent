import React from 'react'

interface IPopup {
  children:string;
}

export default function Popup({ children }: IPopup) {
  return <div>{children}</div>;
}
