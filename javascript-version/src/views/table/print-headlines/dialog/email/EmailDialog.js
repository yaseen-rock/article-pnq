import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'

const EmailDialog = ({ open, onClose }) => {
  const [to, setTo] = useState('')
  const [cc, setCc] = useState('')
  const [bcc, setBcc] = useState('')
  const [selectedOption, setSelectedOption] = useState('to') // 'to', 'cc', or 'bcc'

  const handleSend = () => {
    // Implement your send email logic here
    // You can use the values of 'to', 'cc', 'bcc', and 'selectedOption' for further processing
    console.log('Sending email:', { to, cc, bcc, selectedOption })

    // Close the dialog after sending email
    onClose()
  }

  const handleCancel = () => {
    // Close the dialog without sending email
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Send Email</DialogTitle>
      <form>
        <ToggleButtonGroup
          value={selectedOption}
          exclusive
          onChange={(event, newOption) => setSelectedOption(newOption)}
          aria-label='Email Options'
        >
          <ToggleButton value='to' aria-label='To'>
            To
          </ToggleButton>
          <ToggleButton value='cc' aria-label='Cc'>
            Cc
          </ToggleButton>
          <ToggleButton value='bcc' aria-label='Bcc'>
            Bcc
          </ToggleButton>
        </ToggleButtonGroup>
        <TextField
          label={selectedOption === 'to' ? 'To' : selectedOption === 'cc' ? 'Cc' : 'Bcc'}
          fullWidth
          margin='normal'
          value={selectedOption === 'to' ? to : selectedOption === 'cc' ? cc : bcc}
          onChange={e => {
            if (selectedOption === 'to') setTo(e.target.value)
            else if (selectedOption === 'cc') setCc(e.target.value)
            else setBcc(e.target.value)
          }}
        />
      </form>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSend} color='primary'>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EmailDialog
