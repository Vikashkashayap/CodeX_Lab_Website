import { useState, useCallback } from 'react';
import Modal from '../components/common/Modal';

interface ModalState {
  isOpen: boolean;
  title?: string;
  message: string;
  type: 'alert' | 'confirm';
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: '',
    type: 'alert',
  });

  const showAlert = useCallback((message: string, title?: string) => {
    return new Promise<void>((resolve) => {
      setModalState({
        isOpen: true,
        message,
        title,
        type: 'alert',
        onConfirm: () => {
          resolve();
          setModalState((prev) => ({ ...prev, isOpen: false }));
        },
      });
    });
  }, []);

  const showConfirm = useCallback(
    (message: string, title?: string): Promise<boolean> => {
      return new Promise((resolve) => {
        setModalState({
          isOpen: true,
          message,
          title,
          type: 'confirm',
          onConfirm: () => {
            resolve(true);
            setModalState((prev) => ({ ...prev, isOpen: false }));
          },
          onCancel: () => {
            resolve(false);
            setModalState((prev) => ({ ...prev, isOpen: false }));
          },
          confirmText: 'OK',
          cancelText: 'Cancel',
        });
      });
    },
    []
  );

  const closeModal = useCallback(() => {
    if (modalState.onCancel) {
      modalState.onCancel();
    } else {
      setModalState((prev) => ({ ...prev, isOpen: false }));
    }
  }, [modalState]);

  const ModalComponent = () => (
    <Modal
      isOpen={modalState.isOpen}
      onClose={closeModal}
      title={modalState.title}
      message={modalState.message}
      type={modalState.type}
      onConfirm={modalState.onConfirm}
      confirmText={modalState.confirmText}
      cancelText={modalState.cancelText}
    />
  );

  return {
    showAlert,
    showConfirm,
    ModalComponent,
  };
};

