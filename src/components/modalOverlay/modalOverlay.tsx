import React from 'react';
import styles from './modalOverlay.module.css';
import { TModal } from '../../types/types';

const ModalOverlay: React.FC<TModal> = ({active, setClose, children}) => {

  return (
    <div className={active ? `${styles.modalOverlay} ${styles.modalOverlay__visibility_active}` : `${styles.modalOverlay}`} onClick={setClose}>
        {children}
    </div>
  );
}

export default ModalOverlay;