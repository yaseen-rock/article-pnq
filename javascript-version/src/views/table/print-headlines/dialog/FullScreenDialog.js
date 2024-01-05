// FullScreenDialog.js (updated for MUI with Grid)

import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'

const FullScreenDialog = ({ open, handleClose, imageSrc, articles }) => {
  const [loading, setLoading] = useState(true)

  // Dummy data for illustration
  const publicationInfo = {
    mediaType: 'Print',
    publicationType: 'Magazine',
    publication: 'Sample Publication',
    language: 'English',
    pageNumber: 10,
    size: 'A4',
    circulation: 5000,
    edition: articles.editionTypeName
  }

  useEffect(() => {
    setLoading(true) // Reset loading to true when the dialog is opened
    if (imageSrc) {
      setLoading(false) // Set loading to false when the image source is available
    }
  }, [open, imageSrc, articles])

  // Format the articleDate
  const formattedDate = new Date(articles.articleDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='xl' fullWidth>
      <DialogContent>
        <Paper elevation={0} sx={{ flexGrow: 1, textAlign: 'left', padding: '7px' }}>
          <Grid container justifyContent='space-between' alignItems='center'>
            {/* Left side heading */}
            <Grid item>
              <Typography variant='h7' color='primary' component='div'>
                {articles.headline}
              </Typography>
            </Grid>
            {/* Right side date */}
            <Grid item>
              <Typography variant='subtitle1' color='primary'>
                {formattedDate}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        {/*<Divider sx={{ marginBottom: 2 }} />*/}
        <Grid container spacing={2}>
          {/* Grid for Header Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='body2' color='textSecondary'>
              <strong>Media Type:</strong> {publicationInfo.mediaType}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='body2' color='textSecondary'>
              <strong>Publication Type:</strong> {publicationInfo.publicationType}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='body2' color='textSecondary'>
              <strong>Publication:</strong> {articles.publisher}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='body2' color='textSecondary'>
              <strong>Language:</strong> {publicationInfo.language}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='body2' color='textSecondary'>
              <strong>Page Number:</strong> {publicationInfo.pageNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='body2' color='textSecondary'>
              <strong>Size:</strong> {publicationInfo.size}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='body2' color='textSecondary'>
              <strong>Circulation:</strong> {publicationInfo.circulation}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='body2' color='textSecondary'>
              <strong>Edition:</strong> {publicationInfo.edition}
            </Typography>
          </Grid>
        </Grid>
        {/*<Divider sx={{ marginTop: 2 }} />*/}
        {/* Box for Image */}
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
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FullScreenDialog
