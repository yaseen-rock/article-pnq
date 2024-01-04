//MoreDialopg.js

import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import FullScreenDialog from './FullScreenDialog'

const ViewDialog = ({ open, handleClose, articles }) => {
  const [fullScreenOpen, setFullScreenOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState('')

  const fetchReadArticleFile = async fileType => {
    try {
      const storedToken = localStorage.getItem('accessToken')

      if (storedToken) {
        const base_url = 'http://51.68.220.77:8001'

        const request_params = {
          articleId: articles.articleId,
          fileType: fileType
        }

        const response = await axios.get(`${base_url}/readArticleFile/`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          },
          params: request_params,
          responseType: 'json' // Set the responseType to 'json'
        })

        // Check if the response contains valid content
        if (response.data && response.data.fileContent) {
          if (fileType === 'jpg') {
            const imageSrc = `data:image/jpeg;base64,${response.data.fileContent}`
            setImageSrc(imageSrc)
          } else if (fileType === 'pdf') {
            // If fileType is PDF, assume it's base64-encoded PDF
            const pdfSrc = `data:application/pdf;base64,${response.data.fileContent}`

            // Open a new window and create an iframe element to display the PDF
            const newWindow = window.open()
            newWindow.document.write(
              `<iframe width="100%" height="100%" src="${pdfSrc}" type="application/pdf"></iframe>`
            )
          } else if (fileType === 'htm') {
            // If fileType is HTML, assume it's base64-encoded HTML
            // Decode base64 content
            const decodedHTML = atob(response.data.fileContent)

            // Open a new window and write the decoded HTML content
            const newWindow = window.open()
            newWindow.document.write(decodedHTML)
          }
        } else {
          console.log('Empty or invalid content in the response.')
        }
      }
    } catch (error) {
      console.error('Error fetching read Article File:', error)
    }
  }

  const handleViewHTML = () => {
    fetchReadArticleFile('htm')
  }

  const handleViewJPG = () => {
    // Fetch the JPG file and set the image source
    fetchReadArticleFile('jpg')

    // Open the full-screen dialog when the button is clicked
    setFullScreenOpen(true)
  }

  const handleViewPDF = () => {
    fetchReadArticleFile('pdf')
  }

  const handleFullScreenClose = () => {
    setFullScreenOpen(false)
    setImageSrc('')
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        View Options
        <IconButton aria-label='close' onClick={handleClose} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogActions>
        <Button onClick={handleViewHTML} color='primary'>
          View HTML
        </Button>
        <Button onClick={handleViewJPG} color='primary'>
          View JPG
        </Button>
        <Button onClick={handleViewPDF} color='primary'>
          View PDF
        </Button>

        {/* Render the FullScreenDialog component when open */}
        <FullScreenDialog
          open={fullScreenOpen}
          handleClose={handleFullScreenClose}
          imageSrc={imageSrc}
          articles={articles}
        />
      </DialogActions>
    </Dialog>
  )
}

export default ViewDialog
