// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar } from 'react-chartjs-2' // Import Bar from 'react-chartjs-2'

const ChartjsBarChart = props => {
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
        label: 'Europe', // Change label to 'Europe'
        backgroundColor: primary, // Change backgroundColor to primary color
        borderColor: primary, // Change borderColor to primary color
        borderWidth: 1,
        data: [80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360, 375]
      },
      {
        label: 'Asia', // Change label to 'Asia'
        backgroundColor: warning, // Change backgroundColor to warning color
        borderColor: warning, // Change borderColor to warning color
        borderWidth: 1,
        data: [80, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200, 280]
      },
      {
        label: 'Africa', // Change label to 'Africa'
        backgroundColor: success, // Change backgroundColor to success color
        borderColor: success, // Change borderColor to success color
        borderWidth: 1,
        data: [80, 99, 82, 90, 115, 115, 74, 75, 130, 155, 125, 90, 140, 130, 180]
      }
    ]
  }

  return (
    <Card>
      <CardHeader title='New Technologies Data' subheader='Commercial networks & enterprises' />
      <CardContent>
        <Bar data={data} height={500} options={options} /> {/* Change Line to Bar */}
      </CardContent>
    </Card>
  )
}

export default ChartjsBarChart
