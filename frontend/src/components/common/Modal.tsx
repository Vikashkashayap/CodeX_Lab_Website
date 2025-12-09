import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'alert' | 'confirm';
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'alert',
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && type === 'alert') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="glass rounded-2xl p-6 md:p-8 max-w-md w-full border border-neon-blue/30 shadow-2xl animate-scaleIn">
        {title && (
          <h3 className="text-xl md:text-2xl font-heading font-bold text-neon-blue mb-4">
            {title}
          </h3>
        )}
        <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          {type === 'confirm' && (
            <button
              onClick={onClose}
              className="px-6 py-2 border-2 border-neon-blue/50 text-neon-blue rounded-lg font-semibold hover:bg-neon-blue/10 transition-all"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              type === 'confirm'
                ? 'bg-neon-blue text-space-black hover:shadow-neon-blue'
                : 'bg-neon-blue text-space-black hover:shadow-neon-blue'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

