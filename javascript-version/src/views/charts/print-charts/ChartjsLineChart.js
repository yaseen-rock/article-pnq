// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import axios from 'axios'
import { useState, useEffect } from 'react'

// ** Redux
import { useSelector } from 'react-redux' // Import useSelector from react-redux
import { selectSelectedClient } from 'src/store/apps/user/userSlice'

// ** Third Party Imports
import { Line } from 'react-chartjs-2'

const ChartjsLineChart = props => {
  const [companies, setCompanies] = useState([])
  const [companyIds, setCompanyIds] = useState([])
  const [priorityCompanyListByClients, setPriorityCompanyListByClients] = useState([])
  const [companyListByClients, setCompanyListByClients] = useState([])
  const [priorityLargestCountForYaxis, setPriorityLargestCountForYaxis] = useState(0)
  const [largestCountForYaxis, setLargestCountForYaxis] = useState(0)

  const BASE_URL = 'http://51.68.220.77:8001'
  const selectedClient = useSelector(selectSelectedClient)
  const clientId = selectedClient ? selectedClient.clientId : null
  const storedToken = localStorage.getItem('accessToken')
  const priorityCompanyId = selectedClient ? selectedClient.priorityCompanyId : ''

  console.log(clientId)
  console.log(priorityCompanyId)

  // let priorityCompanyName = 'TATA CONSTRUCTION & PROJECTS PROJECTS'
  useEffect(() => {
    if (companyListByClients.length > 0) {
      const counts = companyListByClients.map(item => Math.max(...item.dailyCounts.map(subItem => subItem.count)))
      const maxCount = Math.max(...counts)
      const roundedMaxCount = Math.ceil(maxCount / 10) * 10
      setLargestCountForYaxis(roundedMaxCount)
    }
  }, [companyListByClients])

  // ** Props
  const { white, primary, success, warning, labelColor, borderColor, legendColor } = props

  const datesForChart =
    companyListByClients.length > 0 ? companyListByClients[0].dailyCounts.map(entry => entry.date) : []

  const priorityDatesForChart =
    priorityCompanyListByClients.length > 0 ? priorityCompanyListByClients[0].dailyCounts.map(entry => entry.date) : []

  // Use the appropriate dates based on whether priority or regular is selected
  const chartLabels = companyListByClients.length > 0 ? datesForChart : priorityDatesForChart

  // Use the appropriate Y-axis maximum based on whether priority or regular is selected
  const yAxisMax = companyListByClients.length > 0 ? largestCountForYaxis || 10 : priorityLargestCountForYaxis || 10

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          color: borderColor
        }
      },
      y: {
        min: 0,
        max: yAxisMax,
        ticks: {
          stepSize: Math.ceil(yAxisMax / 2),
          color: labelColor
        },
        grid: {
          color: borderColor
        }
      }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          padding: 25,
          boxWidth: 10,
          color: legendColor,
          usePointStyle: true
        }
      }
    }
  }

  const getRandomColor = () => {
    // You can implement your logic to generate random colors
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }

    return color
  }

  const priorityDataSets = priorityCompanyListByClients.map(item => {
    return {
      fill: false,
      tension: 0.5,
      pointRadius: 1,
      label: item.company.name,
      pointHoverRadius: 5,
      pointStyle: 'circle',
      borderColor: primary,
      backgroundColor: primary,
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: white,
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: primary,
      data: item.dailyCounts.map(subItem => subItem.count)
    }
  })

  const dataSets = companyListByClients.map(item => {
    const lineColor = getRandomColor()

    return {
      fill: false,
      tension: 0.5,
      pointRadius: 1,
      label: item.company.name,
      pointHoverRadius: 5,
      pointStyle: 'circle',
      borderColor: lineColor,
      backgroundColor: lineColor,
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: white,
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: primary,
      data: item.dailyCounts.map(subItem => subItem.count)
    }
  })

  const data = {
    labels: chartLabels,
    datasets: [...priorityDataSets, ...dataSets]
  }

  useEffect(() => {
    const fetchUserDataAndCompanies = async () => {
      try {
        const storedToken = localStorage.getItem('accessToken')
        if (storedToken) {
          const response = await axios.get('http://51.68.220.77:8001/companyListByClient/', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            },
            params: {
              clientId: clientId
            }
          })
          setCompanies(response.data.companies)
        }
      } catch (error) {
        console.error('Error fetching user data and companies:', error)

        // Handle error, maybe set an error state or display an error message
      }
    }

    fetchUserDataAndCompanies()
  }, [clientId])

  function fetchPriorityPrintMediaCoverage() {
    let headers = {
      Authorization: `Bearer ${storedToken}`,
      'Content-Type': 'application/json'
    }

    const URL = `${BASE_URL}/printMediaCoverage/?clientId=${clientId}&companyIds=${priorityCompanyId}`
    axios
      .get(URL, { headers })
      .then(response => setPriorityCompanyListByClients(response.data.mediaCoverageCounts))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    const fetchPrintMediaCoverage = async () => {
      let headers = {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }

      let params = {
        clientId,
        companyIds: companyIds.join('&companyIds=')
      }

      const queryString = Object.keys(params)
        .map(key => {
          if (key === 'companyIds') {
            return `${encodeURIComponent(key)}=${params[key]}`
          }

          return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        })
        .join('&')

      const URL = `${BASE_URL}/printMediaCoverage?${queryString}`

      try {
        const response = await axios.get(URL, { headers })
        setCompanyListByClients(response.data.mediaCoverageCounts)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPrintMediaCoverage()
  }, [companyIds])
  useEffect(() => {
    fetchPriorityPrintMediaCoverage()
  }, [clientId])

  useEffect(() => {
    if (priorityCompanyListByClients.length > 0) {
      const counts = priorityCompanyListByClients.map(item =>
        Math.max(...item.dailyCounts.map(subItem => subItem.count))
      )
      const maxCount = Math.max(...counts)
      const roundedMaxCount = Math.ceil(maxCount / 10) * 10
      setPriorityLargestCountForYaxis(roundedMaxCount)
    }
  }, [priorityCompanyListByClients])

  return (
    <Card>
      <CardHeader
        title='Media Coverage'
        subheader='Commercial networks & enterprises'
        action={
          <FormControl>
            <InputLabel id='competitor-label'>Select competitor</InputLabel>
            <Select
              label='Select Company'
              multiple
              value={companyIds}
              onChange={e => setCompanyIds(e.target.value)}
              inputProps={{ id: 'company-select' }}
              style={{ width: '200px' }}
            >
              {companies?.map(item => (
                <MenuItem key={item.companyId} value={item.companyId}>
                  {item.companyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />
      <CardContent>
        <Line data={data} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsLineChart
