import * as React from 'react'
import ReactDOM from 'react-dom'

export const useModal = (modal: React.JSX.Element, isModalVisible: boolean): React.JSX.Element => {
  const root = document.getElementById('root')
  if (!root)
    throw new Error('Error: Modal component cant be displayed. Root to mount did not found!')
  if (!isModalVisible) return <></>
  return ReactDOM.createPortal(modal, root)
}
