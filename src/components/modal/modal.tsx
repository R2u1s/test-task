import React from 'react';
import styles from './modal.module.css';
import { TModal } from '../../types/types';

//const modalRoot = document.getElementById("modal");

export const Modal: React.FC<TModal> = ({ active, setClose, children }) => {

  const escFunction: (event: KeyboardEvent) => void = React.useCallback((event) => {
    if (event.key === "Escape") {
      setClose();
    }
  }, []);

  React.useEffect(() => {
    if (active) {
      document.addEventListener("keydown", escFunction);
    }
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [active]);

  return (
    <div className={active ? `${styles.modalOverlay} ${styles.modalOverlay__visibility_active}` : `${styles.modalOverlay}`} onClick={setClose}>

        {children}
    </div>
  );
}

