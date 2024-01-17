import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import axios from 'axios'
import JSZip from 'jszip'

const ImageDialog = ({ open, handleClose, selectedArticles }) => {
  const [imageSrc, setImageSrc] = useState('')
  const [pdfSrc, setPdfSrc] = useState('')

  const fetchReadArticleFile = async (articleId, fileType) => {
    try {
      const storedToken = localStorage.getItem('accessToken')

      if (storedToken) {
        const base_url = 'http://51.68.220.77:8001'

        const request_params = {
          articleId: articleId,
          fileType: fileType
        }

        console.log(articleId)

        const response = await axios.get(`${base_url}/readArticleFile/`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          },
          params: request_params,
          responseType: 'json'
        })

        if (response.data && response.data.fileContent) {
          return response.data.fileContent // Return file content directly
        } else {
          console.log('Empty or invalid content in the response.')
        }
      }
    } catch (error) {
      console.error('Error fetching read Article File:', error)
    }
  }

  const handleDownload = async fileType => {
    try {
      const zip = new JSZip()

      for (const article of selectedArticles) {
        try {
          const fileContent = await fetchReadArticleFile(article.articleId, fileType)

          if (fileContent) {
            const fileSrc = `data:${fileType === 'jpg' ? 'image/jpeg' : 'application/pdf'};base64,${fileContent}`

            // Add the file to the zip archive
            zip.file(`downloaded_${article.articleId}.${fileType}`, fileContent, { base64: true })
          } else {
            console.log('Empty or invalid content in the response.')
          }
        } catch (error) {
          console.error('Error downloading file:', error)
        }
      }

      // Generate a blob from the zip content and create a download link
      zip.generateAsync({ type: 'blob' }).then(blob => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'downloaded_files.zip'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    } catch (error) {
      console.error('Error creating zip file:', error)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Download
        <IconButton aria-label='close' onClick={handleClose} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogActions>
        <Button color='primary'>Download Excel</Button>
        <Button color='primary' onClick={() => handleDownload('jpg')}>
          Download JPG
        </Button>
        <Button color='primary' onClick={() => handleDownload('pdf')}>
          Download PDF
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ImageDialog
