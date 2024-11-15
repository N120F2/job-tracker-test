import * as React from 'react'

import styles from './Modal.module.css'

interface ModalProps extends React.PropsWithChildren {
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className={styles.backgroundBlur} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
