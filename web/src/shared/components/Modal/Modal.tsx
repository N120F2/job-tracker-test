import * as React from 'react'

import styles from './Modal.module.css'

interface ModalProps extends React.PropsWithChildren {
  visible: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, visible, onClose }) => {
  if (!visible) return <></>
  return (
    <div className={styles.backgroundBlur} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
