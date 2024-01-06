//FullScreenHTMLDialog.js
import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import PublicationInfo from './PublicationInfo'

const FullScreenHTMLDialog = ({ open, handleClose, fileContent, articles }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true) // Reset loading to true when the dialog is opened
    if (fileContent) {
      setLoading(false) // Set loading to false when the image source is available
    }
  }, [open, fileContent])

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='xl' fullWidth>
      <DialogContent>
        <PublicationInfo articles={articles} />
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <div dangerouslySetInnerHTML={{ __html: fileContent }} />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FullScreenHTMLDialog
