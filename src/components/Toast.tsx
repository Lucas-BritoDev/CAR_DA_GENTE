import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-gray-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 transition-all animate-bounce">
      <span className="material-symbols-outlined text-green-400">info</span>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
