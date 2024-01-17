import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const TaggingDialog = ({ open, onClose }) => {
  const [tag, setTag] = useState('')

  const handleTagChange = event => {
    setTag(event.target.value)
  }

  const handleSave = () => {
    // Handle the save logic here (you can save the tag or perform any other actions)
    console.log('Tag to be saved:', tag)

    // Close the dialog
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Tag</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='tag'
          label='Enter Tag'
          type='text'
          fullWidth
          value={tag}
          onChange={handleTagChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant='contained' color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaggingDialog
