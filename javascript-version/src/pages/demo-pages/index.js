import React from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'

const DemoPage = () => {
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit'>Primary</Button>
          <Button color='inherit' disabled>
            Disabled
          </Button>
          <Button color='inherit' href='#text-buttons'>
            Link
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default DemoPage
