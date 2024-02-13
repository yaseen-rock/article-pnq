import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'

// ** Redux
import { useSelector } from 'react-redux'
import { selectSelectedClient } from 'src/store/apps/user/userSlice'

const CardSelection = () => {
  const [isContainerOpen, setContainerOpen] = useState(false)
  const [companies, setCompanies] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const selectedClient = useSelector(selectSelectedClient)
  const clientId = selectedClient ? selectedClient.clientId : null

  const fetchArticlesForCompanies = async companyIds => {
    try {
      const storedToken = localStorage.getItem('accessToken')

      const articlesPromises = companyIds.map(companyId =>
        axios
          .get('http://51.68.220.77:8001/latestArticlesForClientCompany/', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            },
            params: {
              clientId: clientId,
              companyId: companyId
            }
          })
          .then(response => {
            console.log(`Received response for company ${companyId}:`, response?.data?.articles || [])

            return response
          })
          .catch(error => {
            console.error(`Error fetching articles for company ${companyId}:`, error)

            return null
          })
      )

      console.log('Sending requests for news articles for all companies...')

      articlesPromises.forEach((promise, index) => {
        const companyId = companyIds[index]
        console.log(`Sending request for company ${companyId}...`)
      })

      const articlesResponses = await Promise.all(articlesPromises)

      console.log('Received responses for news articles for all companies:', articlesResponses)

      const allArticles = articlesResponses.flatMap(response => response?.data?.articles || [])
      setArticles(allArticles.slice(0, 5))

      return articlesResponses
    } catch (error) {
      console.error('Error fetching articles:', error)

      return null
    }
  }

  useEffect(() => {
    const fetchUserDataAndCompanies = async () => {
      try {
        setLoading(true)
        const storedToken = localStorage.getItem('accessToken')
        if (storedToken && clientId) {
          const response = await axios.get('http://51.68.220.77:8001/companyListByClient/', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            },
            params: {
              clientId: clientId
            }
          })
          setCompanies(response.data.companies)

          const companyIds = response.data.companies.map(company => company.companyId)
          const articlesResponses = await fetchArticlesForCompanies(companyIds)
          setLoading(false)
        } else {
          setCompanies([])
          setArticles([])
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchUserDataAndCompanies()
  }, [clientId])

  const handleOpenContainer = () => {
    setContainerOpen(true)
  }

  const handleCloseContainer = () => {
    setContainerOpen(false)
  }

  return (
    <Card>
      <Toolbar>
        <Button startIcon={<TrendingUpIcon />} onClick={handleOpenContainer}>
          Latest Competitive News
        </Button>
      </Toolbar>

      {isContainerOpen && (
        <>
          {loading ? (
            <Box display='flex' justifyContent='center' alignItems='center' height={300}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2} justifyContent='center' p={4}>
              {companies.map((company, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card sx={{ width: '100%', height: '100%', textAlign: 'center' }}>
                    <CardHeader title={company.companyName} />
                    <Typography variant='body1'>{company.description}</Typography>
                    {articles
                      .filter(article => article.companies.some(comp => comp.id === company.companyId))
                      .map((article, articleIndex) => (
                        <TableContainer key={articleIndex}>
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <div>
                                    <Typography variant='h6'>{article.headline}</Typography>
                                  </div>
                                  <div>
                                    <Typography variant='body2'>
                                      {`${article.publication} - (${new Date(article.articleDate).toLocaleDateString(
                                        'en-US',
                                        {
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric'
                                        }
                                      )})`}
                                    </Typography>
                                  </div>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ))}
                    {articles.filter(article => article.companies.some(comp => comp.id === company.companyId))
                      .length === 0 && <Typography variant='body2'>No latest competition news</Typography>}
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Box display='flex' justifyContent='center' pb={4}>
            <Button color='primary' onClick={handleCloseContainer}>
              Close
            </Button>
          </Box>
        </>
      )}
    </Card>
  )
}

export default CardSelection
