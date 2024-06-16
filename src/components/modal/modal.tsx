import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { TModal } from '../../types/types';
import closeButtonIcon from '../../icons/close-button.svg';

const modalRoot = document.getElementById("modal");

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

  return ReactDOM.createPortal(
    (
      <div className={active ? `${styles.modalOverlay} ${styles.modalOverlay__visibility_active}` : `${styles.modalOverlay}`} onClick={setClose}>
        <div className={active ? `${styles.modal__container} ${styles.modal__contVisibility_active}` : `${styles.modal__container}`} onClick={(e) => e.stopPropagation()}>
          <button className={styles['modal__close-button']} onClick={setClose}>
            <img src={closeButtonIcon as string} />
          </button>
          {children}
        </div>
      </div>
    ), modalRoot!
  );
}

