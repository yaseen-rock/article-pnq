// ** Next Import
import Link from 'next/link'
import React, { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports

import ChartjsPolarAreaChart from 'src/views/charts/online-charts/ChartjsPolarAreaChart'
import ChartjsTable from 'src/views/charts/online-charts/ChartjsTable'
import ChartsAppBar from 'src/views/charts/online-charts/ChartsAppBar'

import {
  filterArticlesByDateRange,
  countArticlesByCompany,
  calculateShareOfVoice
} from 'src/views/charts/online-charts/articleUtils' // Adjust the import path
import { articles } from 'src/views/table/data-grid/Db-Articles'

// ** Third Party Styles Import
import 'chart.js/auto'
import ChartjsBarChart from 'src/views/charts/online-charts/ChartjsLineChart'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const ChartJS = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('')
  const [tableData, setTableData] = useState([])
  const [shareOfVoiceData, setShareOfVoiceData] = useState([])

  const handleDateRangeChange = range => {
    setSelectedDateRange(range)

    // Filter and count articles based on the selected date range
    const filteredArticles = filterArticlesByDateRange(articles, range)
    const newTableData = countArticlesByCompany(filteredArticles)

    // Calculate share of voice data
    const newShareOfVoiceData = calculateShareOfVoice(filteredArticles)

    // Update the state with the new tableData and shareOfVoiceData
    setTableData(newTableData)
    setShareOfVoiceData(newShareOfVoiceData)
  }

  // ** Hook
  const theme = useTheme()

  // Vars
  const whiteColor = '#fff'
  const yellowColor = '#ffe802'
  const primaryColor = '#836af9'
  const areaChartBlue = '#2c9aff'
  const barChartYellow = '#ffcf5c'
  const polarChartGrey = '#4f5d70'
  const polarChartInfo = '#299aff'
  const lineChartYellow = '#d4e157'
  const polarChartGreen = '#28dac6'
  const lineChartPrimary = '#8479F2'
  const lineChartWarning = '#ff9800'
  const horizontalBarInfo = '#26c6da'
  const polarChartWarning = '#ff8131'
  const scatterChartGreen = '#28c76f'
  const warningColorShade = '#ffbd1f'
  const areaChartBlueLight = '#84d0ff'
  const areaChartGreyLight = '#edf1f4'
  const scatterChartWarning = '#ff9f43'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  return (
    <DatePickerWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h4'>
              <LinkStyled href='https://github.com/reactchartjs/react-chartjs-2' target='_blank'>
                React ChartJS 2
              </LinkStyled>
            </Typography>
          }
          subtitle={<Typography sx={{ color: 'text.secondary' }}>React wrapper for Chart.js</Typography>}
        />

        <ChartsAppBar md={6} handleDateRangeChange={handleDateRangeChange} />

        <Grid item xs={12} md={6}>
          {/* Pass color variables as props */}
          <ChartjsPolarAreaChart
            shareOfVoiceData={shareOfVoiceData}
            legendColor={legendColor}
            primary={primaryColor}
            yellow={yellowColor}
            warning={lineChartWarning}
            info={polarChartInfo}
            grey={polarChartGrey}
            green={polarChartGreen}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartjsTable tableData={tableData} />
        </Grid>
        <Grid item xs={12}>
          <ChartjsBarChart
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            legendColor={legendColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
          />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default ChartJS
