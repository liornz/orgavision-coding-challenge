import React from 'react';
import styles from './Modal.module.css';

interface Props {
  close: () => void;
  show: boolean;
}

const Modal: React.FC<Props> = ({close, show}) => {
  return show ? (
    <div className={styles.container}>
      <div className={styles.modal}>Hello From Lior Nitzan</div>
      <div className={styles.backdrop} onClick={close}></div>
    </div>
  ) : (null);
};

export default Modal;
