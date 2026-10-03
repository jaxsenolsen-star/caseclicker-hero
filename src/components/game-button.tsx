import type { ButtonHTMLAttributes } from "react";

type GameButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function GameButton({ className = "", ...props }: GameButtonProps) {
  return <button className={className} {...props} />;
}