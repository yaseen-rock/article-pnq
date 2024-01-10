import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import axios from 'axios' // Import Axios for making HTTP requests

const ArticleTagEdit = ({ articles, handleClose, token }) => {
  const [tags, setTags] = useState(articles.tags || [])

  const handleAddTag = (companyIndex, tagIndex, tag) => {
    const newTags = [...tags]
    newTags[companyIndex] = { ...(newTags[companyIndex] || {}), [`tag${tagIndex + 1}`]: tag }
    setTags(newTags)
  }

  const handleSaveDetails = async () => {
    try {
      const storedToken = localStorage.getItem('accessToken')

      const url = `http://51.68.220.77:8001/updateClientTagsToCompany/`
      const clientId = articles.clientId

      // Filter out companies without tags
      const companiesWithTags = articles.companies.filter((company, companyIndex) => {
        const clientTags = tags[companyIndex]

        return clientTags && Object.values(clientTags).some(tag => tag.trim() !== '')
      })

      const promises = companiesWithTags.map((company, companyIndex) => {
        const companyId = company.id
        const clientTags = tags[companyIndex] ? Object.values(tags[companyIndex]) : []
        const requestData = { clientId, companyId, clientTags }
        console.log(clientId, companyId, clientTags)

        return axios.post(url, requestData, {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
      })

      const responses = await Promise.all(promises)

      responses.forEach(response => {
        console.log(response.data)
      })
    } catch (error) {
      console.error('Error saving tags:', error)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant='h6' align='center' sx={{ marginTop: 3 }}>
        Article Tag Edit
      </Typography>
      <Table>
        <TableBody>
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
      <Grid container justifyContent='flex-end' sx={{ marginTop: 2 }}>
        <Button color='primary' onClick={handleSaveDetails}>
          Save
        </Button>
        <Button color='primary' onClick={handleClose} sx={{ marginLeft: 2 }}>
          Cancel
        </Button>
      </Grid>
    </TableContainer>
  )
}

export default ArticleTagEdit
