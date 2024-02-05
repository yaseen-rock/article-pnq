import React, { useRef, useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import axios from 'axios'

const ArticleCountDistribution = () => {
  const [printArticleCountDistribution, setPrintArticleDistribution] = useState([])
  const BASE_URL = 'http://51.68.220.77:8001'
  const storedToken = localStorage.getItem('accessToken')
  const userData = JSON.parse(localStorage.getItem('userData'))
  const clientId = userData?.clientId

  useEffect(() => {
    const fetchPrinArticleCountDistribution = () => {
      let headers = {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }

      let params = { clientId }

      const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&')
      const URL = `${BASE_URL}/printArticleCountDistribution?${queryString}`

      axios
        .get(URL, { headers })
        .then(response => setPrintArticleDistribution(response.data.articleCounts))
        .catch(error => console.log(error))
    }
    fetchPrinArticleCountDistribution()
  }, [])

  const sliderRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [slidesToShow, setSlidesToShow] = useState(2) // Change this to 2 for two columns
  const totalTables = Math.ceil(printArticleCountDistribution.length / slidesToShow)

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: slidesToShow,
    responsive: [
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const newSlidesToShow = width < 650 ? 1 : 2

      if (slidesToShow !== newSlidesToShow) {
        setSlidesToShow(newSlidesToShow)

        // Update the current page based on the new slidesToShow
        const newTotalTables = Math.ceil(printArticleCountDistribution?.length / newSlidesToShow)
        setCurrentPage(prevPage => Math.min(prevPage, newTotalTables))
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [slidesToShow, printArticleCountDistribution.length])

  const handleNext = () => {
    sliderRef.current.slickNext()
    setCurrentPage(prev => prev + 1)
  }

  const handlePrev = () => {
    sliderRef.current.slickPrev()
    setCurrentPage(prev => prev - 1)
  }

  return (
    <Card>
      <CardHeader title={`Article Count Distribution`} />
      <CardContent>
        <Slider ref={sliderRef} {...settings}>
          {printArticleCountDistribution.map(article => (
            <Grid key={article.company.id} lg={11}>
              <Box mx={2} width='100%'>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>{article.company.name}</TableCell>
                        <TableCell>Tier 1</TableCell>
                        <TableCell>Overall</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Today</TableCell>
                        <TableCell>{article.countTier1.today}</TableCell>
                        <TableCell>{article.countOverall.today}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Last Week</TableCell>
                        <TableCell>{article.countTier1.lastWeek}</TableCell>
                        <TableCell>{article.countOverall.lastWeek}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Last Month</TableCell>
                        <TableCell>{article.countTier1.lastMonth}</TableCell>
                        <TableCell>{article.countOverall.lastMonth}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Last Three Months</TableCell>
                        <TableCell>{article.countTier1.lastThreeMonth}</TableCell>
                        <TableCell>{article.countOverall.lastThreeMonth}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          ))}
        </Slider>
        <Box display='flex' justifyContent='flex-end' alignItems='center' marginTop='16px'>
          <span style={{ margin: '0 10px' }}>{`Tables ${slidesToShow * (currentPage - 1) + 1} - ${
            slidesToShow * currentPage
          } of ${printArticleCountDistribution.length}`}</span>
          <IconButton onClick={handlePrev} disabled={currentPage === 1}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleNext} disabled={currentPage === totalTables}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ArticleCountDistribution
