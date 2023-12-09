// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { Line } from 'react-chartjs-2'

const ChartjsLineChart = props => {
  // ** Props
  const { white, primary, success, warning, labelColor, borderColor, legendColor } = props

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
        max: 400,
        ticks: {
          stepSize: 100,
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

  const data = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
    datasets: [
      {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: 'TATA STEEL',
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: primary,
        backgroundColor: primary,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: primary,
        data: [80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360, 375]
      }
    ]
  }

  const handleCompanyChange = event => {
    // Handle company change logic here
    console.log('Selected Company: ', event.target.value)
  }

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
              value={''} // Provide the selected company value here
              onChange={handleCompanyChange}
              inputProps={{ id: 'company-select' }}
              style={{ width: '200px' }}
            >
              <MenuItem value={'Company1'}>Company 1</MenuItem>
              <MenuItem value={'Company2'}>Company 2</MenuItem>
              {/* Add more MenuItem components for additional companies */}
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
