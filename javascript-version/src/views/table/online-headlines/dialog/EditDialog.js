// EditDialog.js
import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Iframe from 'react-iframe'

const EditDialog = ({ open, handleClose, socialFeed, handleSave }) => {
  const [editedSocialFeed, setEditedSocialFeed] = useState({
    headline: '',
    author: ''
  })

  useEffect(() => {
    if (socialFeed) {
      setEditedSocialFeed({
        headline: socialFeed.headline || '',
        author: socialFeed.socialFeedAuthorName || ''
      })
    }
  }, [socialFeed])

  const handleDiscard = () => {
    setEditedSocialFeed({
      headline: socialFeed.headline || '',
      author: socialFeed.socialFeedAuthorName || ''
    })
    handleClose()
  }

  const handleInputChange = (field, value) => {
    setEditedSocialFeed(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveChanges = () => {
    handleSave(editedSocialFeed)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      {/* Set maxWidth and fullWidth props */}
      <DialogTitle>Edit Social Feed</DialogTitle>
      <DialogContent>
        <TextField
          label='Headline'
          value={editedSocialFeed.headline}
          onChange={e => handleInputChange('headline', e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Author'
          value={editedSocialFeed.author}
          onChange={e => handleInputChange('author', e.target.value)}
          fullWidth
          margin='normal'
        />
        <Iframe
          url={socialFeed?.socialFeedlink || ''}
          width='100%'
          height='500px'
          id='myId'
          className='myClassname'
          display='initial'
          position='relative'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDiscard} color='primary'>
          Discard
        </Button>
        <Button onClick={handleSaveChanges} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditDialog
