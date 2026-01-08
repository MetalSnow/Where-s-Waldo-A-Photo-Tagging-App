import { SquareX } from 'lucide-react';
import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

function Modal({ openModal, closeModal, children }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog className={styles.modal} ref={ref} onCancel={closeModal}>
      {children}
      <button className={styles.closeBtn} onClick={closeModal}>
        <SquareX size={24} />
        Cancel
      </button>
    </dialog>
  );
}

export default Modal;
