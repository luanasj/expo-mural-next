import { useEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

type FlashMessageProps = {
  success: boolean;
  message: string;
  onClose: () => void;
};

export default function FlashMessage({ success, message, onClose }: FlashMessageProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // 3 segundos
    return () => clearTimeout(timer); // limpa o timer se o componente for desmontado
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg flex items-center space-x-3 transition-all duration-300 ${
        success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {success ? (
        <AiOutlineCheckCircle size={24} />
      ) : (
        <AiOutlineCloseCircle size={24} />
      )}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
