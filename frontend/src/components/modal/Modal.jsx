import { SquareX } from 'lucide-react';
import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

function Modal({ openModal, children }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog className={styles.modal} ref={ref}>
      {children}
    </dialog>
  );
}

export default Modal;
