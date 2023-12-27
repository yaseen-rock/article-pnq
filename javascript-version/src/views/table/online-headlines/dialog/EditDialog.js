// EditDialog.js
import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const EditDialog = ({ open, handleClose, socialFeed, handleSave }) => {
  const [editedSocialFeed, setEditedSocialFeed] = useState({
    headline: '',
    publisher: '',
    summary: ''
  })

  useEffect(() => {
    if (socialFeed) {
      setEditedSocialFeed({
        headline: socialFeed.headline || '',
        publisher: socialFeed.publisher || '',
        summary: socialFeed.summary || ''
      })
    }
  }, [socialFeed])

  const handleDiscard = () => {
    setEditedSocialFeed({
      headline: socialFeed.headline || '',
      publisher: socialFeed.publisher || '',
      summary: socialFeed.summary || ''
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
    <Dialog open={open} onClose={handleClose}>
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
          label='Publisher'
          value={editedSocialFeed.publisher}
          onChange={e => handleInputChange('publisher', e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Summary'
          value={editedSocialFeed.summary}
          onChange={e => handleInputChange('summary', e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin='normal'
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
