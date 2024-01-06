// PublicationInfo.js

import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'

const PublicationInfo = ({ articles }) => {
  // Dummy data for illustration
  const [publicationInfo, setPublicationInfo] = useState({
    mediaType: articles.publicationCategory,
    publicationType: articles.publicationType,
    publication: articles.publication,
    language: articles.language,
    pageNumber: articles.pageNumber,
    size: articles.size,
    circulation: articles.circulation,
    edition: articles.editionTypeName
  })

  const formattedDate = new Date(articles.articleDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  return (
    <>
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
      {/* <Divider sx={{ marginBottom: 2 }} /> */}
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
            <strong>Publication:</strong> {publicationInfo.publication}
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
      <Divider sx={{ marginTop: 2 }} />
    </>
  )
}

export default PublicationInfo
