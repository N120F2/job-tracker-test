import * as React from 'react'

interface PageWrapperProps extends React.PropsWithChildren {}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div>
      {children}
      <footer>
        <div>Author: Sobal Uladzislau</div>
        <div>
          <a href={'https://github.com/N120F2'} target='_blank' rel='noopener noreferrer'>
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}

export default PageWrapper
