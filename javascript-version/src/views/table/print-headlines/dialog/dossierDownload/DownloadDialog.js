// DownloadDialog.js
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const DownloadDialog = ({ open, handleClose }) => {
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [subject, setSubject] = useState('')
  const [formDataToDate, setFormDataToDate] = useState('')

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handleCompanyNameChange = event => {
    setCompanyName(event.target.value)
  }

  const handleSubjectChange = event => {
    setSubject(event.target.value)
  }

  const handleFormDataToDateChange = event => {
    setFormDataToDate(event.target.value)
  }

  const handleSubmit = () => {
    // Add your logic to handle form submission
    console.log('Email:', email)
    console.log('Company Name:', companyName)
    console.log('Subject:', subject)
    console.log('Form Data To Date:', formDataToDate)

    // Display a message to the user
    alert('After submitting the request, the system will send a Dossier link to the selected E-Mail IDs.')

    // Close the dialog
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Dossier</DialogTitle>
      <DialogContent>
        <TextField fullWidth label='Enter Email' value={email} onChange={handleEmailChange} margin='normal' />
        <TextField
          fullWidth
          label='Enter Client/Company Name'
          value={companyName}
          onChange={handleCompanyNameChange}
          margin='normal'
        />
        <TextField
          fullWidth
          label='Enter Title/Subject'
          value={subject}
          onChange={handleSubjectChange}
          margin='normal'
        />
        <TextField
          fullWidth
          label='Enter Form Data-To Date'
          value={formDataToDate}
          onChange={handleFormDataToDateChange}
          margin='normal'
        />
        {/* Message for the user */}
        <p style={{ margin: '16px 0', color: '#757575' }}>
          After submitting the request, the system will send a Dossier link to the selected E-Mail IDs.
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color='primary'>
          Submit Your Request
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DownloadDialog
