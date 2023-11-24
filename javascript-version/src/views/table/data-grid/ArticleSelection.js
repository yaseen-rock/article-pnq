// ** React Import
import { useState, useMemo } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import DateRangeIcon from '@mui/icons-material/DateRange'
import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import { DataGrid } from '@mui/x-data-grid'

// ** React DatePicker
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import EmailIcon from '@mui/icons-material/Email'
import ImageIcon from '@mui/icons-material/Image'
import DownloadIcon from '@mui/icons-material/Download'
import RssFeedIcon from '@mui/icons-material/RssFeed'

import SvgIcon from '@mui/material/SvgIcon'

// 1D Icon
const OneDIcon = props => (
  <SvgIcon {...props}>
    <text x='50%' y='50%' fill='grey' fontSize='14px' text-anchor='middle' alignment-baseline='middle'>
      1D
    </text>
  </SvgIcon>
)

// 2D Icon
const TwoDIcon = props => (
  <SvgIcon {...props}>
    <text x='50%' y='50%' fill='grey' fontSize='14px' text-anchor='middle' alignment-baseline='middle'>
      2D
    </text>
  </SvgIcon>
)

// 3D Icon
const ThreeDIcon = props => (
  <SvgIcon {...props}>
    <text x='50%' y='50%' fill='grey' fontSize='14px' text-anchor='middle' alignment-baseline='middle'>
      3D
    </text>
  </SvgIcon>
)

// ** Dummy Article Data
const articles = [
  {
    id: 1,
    article: 'Sample Article 1',
    shortHeading: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: '2023-01-01'
  },
  {
    id: 2,
    article: 'Sample Article 2',
    shortHeading: 'Sed Do Eiusmod',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2023-02-15'
  },
  {
    id: 3,
    article: 'Sample Article 3',
    shortHeading: 'Excepteur Sint Occaecat',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '2023-06-18'
  },
  {
    id: 4,
    article: 'Sample Article 4',
    shortHeading: 'Nisi Ut Aliquip',
    description:
      'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: '2023-07-02'
  },
  {
    id: 5,
    article: 'Sample Article 5',
    shortHeading: 'Culpa Qui Officia',
    description:
      'Culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident.',
    date: '2023-08-14'
  },
  {
    id: 6,
    article: 'Sample Article 6',
    shortHeading: 'Excepteur Sint Occaecat',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '2023-06-18'
  },
  {
    id: 7,
    article: 'Sample Article 7',
    shortHeading: 'Nisi Ut Aliquip',
    description:
      'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: '2023-07-02'
  },
  {
    id: 8,
    article: 'Sample Article 8',
    shortHeading: 'Culpa Qui Officia',
    description:
      'Culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident.',
    date: '2023-08-14'
  },
  {
    id: 9,
    article: 'Sample Article 9',
    shortHeading: 'Proident Sunt In',
    description:
      'Proident sunt in culpa qui officia deserunt mollit anim id est laborum. Nisi ut aliquip ex ea commodo consequat.',
    date: '2023-09-27'
  },
  {
    id: 10,
    article: 'Sample Article 10',
    shortHeading: 'Reprehenderit In Voluptate',
    description:
      'Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit.',
    date: '2023-10-09'
  },
  {
    id: 11,
    article: 'Sample Article 11',
    shortHeading: 'Velit Esse Cillum',
    description: 'Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    date: '2023-11-20'
  },
  {
    id: 12,
    article: 'Sample Article 12',
    shortHeading: 'Mollit Anim Id Est',
    description: 'Mollit anim id est laborum. Culpa qui officia deserunt mollit anim id est laborum.',
    date: '2023-12-03'
  },
  {
    id: 13,
    article: 'Sample Article 13',
    shortHeading: 'Dolor Sit Amet',
    description: 'Dolor sit amet, consectetur adipiscing elit. Nisi ut aliquip ex ea commodo consequat.',
    date: '2024-01-15'
  },
  {
    id: 14,
    article: 'Sample Article 14',
    shortHeading: 'Consectetur Adipiscing Elit',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2024-02-28'
  },
  {
    id: 15,
    article: 'Sample Article 15',
    shortHeading: 'Tempor Incididunt Ut Labore',
    description:
      'Tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: '2024-03-12'
  },
  {
    id: 16,
    article: 'Sample Article 16',
    shortHeading: 'Duis Aute Irure Dolor',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: '2024-04-25'
  },
  {
    id: 17,
    article: 'Sample Article 17',
    shortHeading: 'Excepteur Sint Occaecat Cupidatat',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '2024-05-08'
  },
  {
    id: 18,
    article: 'Sample Article 18',
    shortHeading: 'Nisi Ut Aliquip Ex Ea Commodo',
    description:
      'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: '2024-06-20'
  },
  {
    id: 19,
    article: 'Sample Article 19',
    shortHeading: 'Culpa Qui Officia Deserunt',
    description:
      'Culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident.',
    date: '2024-07-03'
  },
  {
    id: 20,
    article: 'Sample Article 20',
    shortHeading: 'Proident Sunt In Culpa Qui',
    description:
      'Proident sunt in culpa qui officia deserunt mollit anim id est laborum. Nisi ut aliquip ex ea commodo consequat.',
    date: '2024-08-16'
  }

  // Add more articles as needed
]

// ** Renders article column
const renderArticle = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
        {row.article}
      </Typography>
      <Typography noWrap variant='caption'>
        {row.shortHeading}
      </Typography>
      {/* Displaying the description */}
      <Typography noWrap variant='caption'>
        {row.description}
      </Typography>
    </Box>
  )
}

const columns = [
  {
    flex: 0.1,
    minWidth: 40,
    headerName: 'Select',
    field: 'select',
    renderCell: params => (
      <input
        type='checkbox'
        checked={params.row.isSelected}
        onChange={() => params.api.selectRow(params.row.id, !params.row.isSelected, false)}
      />
    )
  },
  {
    flex: 0.25,
    minWidth: 290,
    field: 'article',
    headerName: 'Article',
    renderCell: renderArticle
  },
  {
    flex: 0.175,
    type: 'date',
    minWidth: 120,
    headerName: 'Issue Date',
    field: 'date',
    valueGetter: params => new Date(params.value),
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.date}
      </Typography>
    )
  }
]

const TableSelection = () => {
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [filterPopoverAnchor, setFilterPopoverAnchor] = useState(null)

  // Filter articles based on the selected date range
  const filteredArticles = useMemo(() => {
    if (!selectedStartDate || !selectedEndDate) {
      return articles
    }

    return articles.filter(article => {
      const articleDate = new Date(article.date)

      return articleDate >= selectedStartDate && articleDate <= selectedEndDate
    })
  }, [selectedStartDate, selectedEndDate])

  // Divide articles into left and right columns
  const leftArticles = filteredArticles.filter((_, index) => index % 2 === 0)
  const rightArticles = filteredArticles.filter((_, index) => index % 2 !== 0)

  // Open the date filter popover
  const openFilterPopover = event => {
    setFilterPopoverAnchor(event.currentTarget)
  }

  // Close the date filter popover
  const closeFilterPopover = () => {
    setFilterPopoverAnchor(null)
  }

  const handleDelete = () => {
    // Add your delete logic here
    console.log('Delete action triggered')
  }

  // Function to handle search action
  const handleSearch = () => {
    // Add your search logic here
    console.log('Search action triggered')
  }

  const handleEmail = () => {
    // Add your search logic here
    console.log('Search action triggered')
  }

  const handleImage = () => {
    // Add your search logic here
    console.log('Search action triggered')
  }

  const handleDownload = () => {
    // Add your search logic here
    console.log('Search action triggered')
  }

  const handleRssFeed = () => {
    // Add your search logic here
    console.log('Search action triggered')
  }

  const handleFilter1D = () => {
    // Implement 1D filtering logic
    console.log('Filtering 1D')
  }

  const handleFilter2D = () => {
    // Implement 2D filtering logic
    console.log('Filtering 2D')
  }

  const handleFilter3D = () => {
    // Implement 3D filtering logic
    console.log('Filtering 3D')
  }

  return (
    <Card>
      <CardHeader title='Article Selection' />
      {/* Toolbar with Date Filter */}
      <Toolbar>
        <Typography variant='h6' sx={{ flex: '1' }}>
          Article List
        </Typography>
        <IconButton onClick={handleSearch} sx={{ mr: 1 }}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleEmail}>
          <EmailIcon />
        </IconButton>
        <IconButton onClick={handleImage}>
          <ImageIcon />
        </IconButton>
        <IconButton onClick={handleDownload}>
          <DownloadIcon />
        </IconButton>
        <IconButton onClick={handleRssFeed}>
          <RssFeedIcon />
        </IconButton>
        <IconButton onClick={openFilterPopover}>
          <DateRangeIcon />
        </IconButton>
        {/* Custom Icons for Filtering */}
        <IconButton onClick={handleFilter1D}>
          <OneDIcon />
        </IconButton>
        <IconButton onClick={handleFilter2D}>
          <TwoDIcon />
        </IconButton>
        <IconButton onClick={handleFilter3D}>
          <ThreeDIcon />
        </IconButton>
      </Toolbar>
      {/* Date Filter Popover */}
      <Popover
        open={Boolean(filterPopoverAnchor)}
        anchorEl={filterPopoverAnchor}
        onClose={closeFilterPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Stack spacing={2} p={2} sx={{ minWidth: '200px', minHeight: '400px' }}>
          <Typography variant='subtitle2'>Filter by Date Range</Typography>
          <Divider />
          {/* Use react-datepicker instead of MUI DatePicker */}
          <DatePicker
            selected={selectedStartDate}
            onChange={date => setSelectedStartDate(date)}
            selectsStart
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            customInput={<TextField variant='standard' />}
          />
          <DatePicker
            selected={selectedEndDate}
            onChange={date => setSelectedEndDate(date)}
            selectsEnd
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            minDate={selectedStartDate}
            customInput={<TextField variant='standard' />}
          />
        </Stack>
      </Popover>
      {/* DataGrid */}
      <Box display='flex'>
        {/* Left Column */}
        <Box flex='1' p={2} pr={1}>
          <DataGrid
            autoHeight
            rows={leftArticles}
            columns={columns}
            pageSizeOptions={[5, 10, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            hideFooterPagination
          />
        </Box>

        {/* Right Column */}
        <Box flex='1' p={2} pl={1}>
          <DataGrid
            autoHeight
            rows={rightArticles}
            columns={columns}
            pageSizeOptions={[5, 10, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Box>
      </Box>
    </Card>
  )
}

export default TableSelection
