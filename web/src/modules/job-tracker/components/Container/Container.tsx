import * as React from 'react'

import styles from './Container.module.css'

interface ContainerProps extends React.PropsWithChildren {}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default Container
