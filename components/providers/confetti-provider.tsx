"use client";

import ReactConfetti from "react-confetti";

import { useConfettiStore } from "@/hooks/use-confetti-store";

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();
  if (!confetti.isOpen) return null;
  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={400}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
      }}
    />
  )
}