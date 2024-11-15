import { Box, Link } from '@mui/material'
import * as React from 'react'

interface PageWrapperProps extends React.PropsWithChildren {}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <Box>
      {children}
      <Box component={'footer'} sx={{ position: 'fixed', bottom: 20 }}>
        <div>Author: Sobal Uladzislau</div>
        <div>Email: sobolvladsav@gmail.com</div>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Link href={'https://github.com/N120F2'} target='_blank' rel='noopener noreferrer'>
            GitHub
          </Link>
          <Link
            href={'https://www.linkedin.com/in/uladzislau-sobal-ba43b8212/'}
            target='_blank'
            rel='noopener noreferrer'
          >
            LinkedIn
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default PageWrapper
