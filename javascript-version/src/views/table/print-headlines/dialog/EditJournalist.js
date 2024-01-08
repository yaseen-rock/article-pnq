// EditJournalist.js

import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

const EditJournalist = ({ articles, onSave, onCancel }) => {
  const [articleData, setArticleData] = useState({
    headline: articles.headline,
    journalist: articles.articleJournalist
  })

  const handleInputChange = (field, value) => {
    setArticleData(prevData => ({ ...prevData, [field]: value }))
  }

  return (
    <>
      <Paper elevation={0} sx={{ flexGrow: 1, textAlign: 'left', padding: '7px' }}></Paper>
      <Typography variant='h6' align='center' sx={{ marginBottom: 2 }}>
        Article Data
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {/* Grid for Article Data */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Headline'
            variant='outlined'
            value={articleData.headline}
            onChange={e => handleInputChange('headline', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Journalist'
            variant='outlined'
            value={articleData.journalist}
            onChange={e => handleInputChange('journalist', e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Save and Cancel Buttons */}
      <Grid container justifyContent='flex-end' sx={{ marginTop: 2 }}>
        <Button color='primary' onClick={() => onSave(articleData)}>
          Save
        </Button>
        <Button color='primary' onClick={onCancel} sx={{ marginLeft: 2 }}>
          Cancel
        </Button>
      </Grid>
      <Divider sx={{ marginTop: 2 }} />
    </>
  )
}

export default EditJournalist
