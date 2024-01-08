// FullScreenEditDetailsDialog.js

import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import PublicationInfo from './PublicationInfo'
import EditJournalist from './EditJournalist'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const FullScreenEditDetailsDialog = ({ open, handleClose, articles }) => {
  const [tags, setTags] = useState(articles.tags || []) // Assuming articles.tags is an array

  const handleAddTag = (companyIndex, tagIndex, tag) => {
    const newTags = [...tags]
    newTags[companyIndex] = { ...(newTags[companyIndex] || {}), [`tag${tagIndex + 1}`]: tag }
    setTags(newTags)
  }

  const handleSaveDetails = () => {
    // Save the changes, e.g., call an API or update state
    // You can access the updated tags via the `tags` state
    console.log(tags)
    handleClose() // Close the dialog after saving
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='xl' fullWidth>
      <DialogTitle>
        Edit Details
        <IconButton aria-label='close' onClick={handleClose} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <PublicationInfo articles={articles} />
        <EditJournalist articles={articles} />

        <TableContainer component={Paper}>
          <Typography variant='h6' align='center' sx={{ marginTop: 3 }}>
            Article Tag Edit
          </Typography>
          <Table>
            <TableBody>
              {/* Use the actual company names from the articles data */}
              {articles.companies.map((company, companyIndex) => (
                <TableRow key={company.id}>
                  <TableCell>{company.name}</TableCell>
                  {[1, 2, 3, 4, 5].map(tagIndex => (
                    <TableCell key={tagIndex}>
                      <TextField
                        size='small'
                        label={`Tag ${tagIndex}`}
                        value={(tags[companyIndex] && tags[companyIndex][`tag${tagIndex}`]) || ''}
                        onChange={e => handleAddTag(companyIndex, tagIndex - 1, e.target.value)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Save and Cancel Buttons */}
          <Grid container justifyContent='flex-end' sx={{ marginTop: 2 }}>
            <Button color='primary' onClick={handleSaveDetails}>
              Save
            </Button>
            <Button color='primary' onClick={handleClose} sx={{ marginLeft: 2 }}>
              Cancel
            </Button>
          </Grid>
        </TableContainer>
      </DialogContent>
    </Dialog>
  )
}

export default FullScreenEditDetailsDialog
