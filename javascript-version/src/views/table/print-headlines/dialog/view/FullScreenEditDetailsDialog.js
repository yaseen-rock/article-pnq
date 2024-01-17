// FullScreenEditDetailsDialog.js

import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import PublicationInfo from './PublicationInfo'
import EditJournalist from './EditJournalist'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import FooterDialog from './FooterDialog'
import PublicationLogo from './PublicationLogo'
import ArticleTagEdit from './ArticleTagEdit'

const FullScreenEditDetailsDialog = ({ open, handleClose, imageSrc, articles }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (imageSrc) {
      setLoading(false)
    }
  }, [open, imageSrc])

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='xl' fullWidth>
      <IconButton aria-label='close' onClick={handleClose} style={{ position: 'absolute', right: 8, top: 8 }}>
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <Box border={1} borderColor='grey.300' borderRadius={4} p={3} mt={2}>
          {/* Wrap the components inside the Box */}
          <PublicationLogo articles={articles} />
          <PublicationInfo articles={articles} />
          <EditJournalist articles={articles} />
          <ArticleTagEdit articles={articles} handleClose={handleClose} />
        </Box>

        <Box mt={2}>
          {/* Conditional rendering of loader */}
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <CircularProgress />
            </div>
          ) : (
            <img src={imageSrc} alt='JPG Image' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          )}
        </Box>
      </DialogContent>
      <FooterDialog />
    </Dialog>
  )
}

export default FullScreenEditDetailsDialog
