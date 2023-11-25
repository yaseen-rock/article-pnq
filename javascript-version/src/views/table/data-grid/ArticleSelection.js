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
import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/material/Button' // Import Button
import Checkbox from '@mui/material/Checkbox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

// ** MUI-X DatePicker

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// ** MUI icons
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
    <text x='50%' y='50%' fill='#7367F0' fontSize='14px' text-anchor='middle' alignment-baseline='middle'>
      1D
    </text>
  </SvgIcon>
)

// 2D Icon
const TwoDIcon = props => (
  <SvgIcon {...props}>
    <text x='50%' y='50%' fill='#7367F0' fontSize='14px' text-anchor='middle' alignment-baseline='middle'>
      7D
    </text>
  </SvgIcon>
)

// 3D Icon
const ThreeDIcon = props => (
  <SvgIcon {...props}>
    <text x='50%' y='50%' fill=' #7367F0' fontSize='14px' text-anchor='middle' alignment-baseline='middle'>
      1M
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
  },
  {
    id: 21,
    article: 'Sample Article 21',
    shortHeading: 'Incididunt Ut Labore',
    description: 'Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    date: '2024-09-01'
  },
  {
    id: 22,
    article: 'Sample Article 22',
    shortHeading: 'Lorem Ipsum Dolor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2024-09-15'
  },
  {
    id: 23,
    article: 'Sample Article 23',
    shortHeading: 'Reprehenderit In Voluptate',
    description:
      'Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    date: '2024-10-02'
  },
  {
    id: 24,
    article: 'Sample Article 24',
    shortHeading: 'Cupidatat Non Proident',
    description:
      'Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nisi ut aliquip ex ea commodo consequat.',
    date: '2024-10-18'
  },
  {
    id: 25,
    article: 'Sample Article 25',
    shortHeading: 'Duis Aute Irure Dolor',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: '2024-11-05'
  },
  {
    id: 26,
    article: 'Sample Article 26',
    shortHeading: 'Tempor Incididunt Ut Labore',
    description:
      'Tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: '2024-11-21'
  },
  {
    id: 27,
    article: 'Sample Article 27',
    shortHeading: 'Consectetur Adipiscing Elit',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2024-12-08'
  },
  {
    id: 28,
    article: 'Sample Article 28',
    shortHeading: 'Ut Enim Ad Minim Veniam',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: '2024-12-25'
  },
  {
    id: 29,
    article: 'Sample Article 29',
    shortHeading: 'Nisi Ut Aliquip Ex Ea Commodo',
    description:
      'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: '2025-01-10'
  },
  {
    id: 30,
    article: 'Sample Article 30',
    shortHeading: 'Dolor Sit Amet',
    description: 'Dolor sit amet, consectetur adipiscing elit. Nisi ut aliquip ex ea commodo consequat.',
    date: '2025-01-26'
  },
  {
    id: 31,
    article: 'Sample Article 31',
    shortHeading: 'Dolor Sit Amet',
    description: 'Dolor sit amet, consectetur adipiscing elit. Nisi ut aliquip ex ea commodo consequat.',
    date: '2023-11-23'
  },
  {
    id: 32,
    article: 'Sample Article 32',
    shortHeading: 'Dolor Sit Amet',
    description: 'Dolor sit amet, consectetur adipiscing elit. Nisi ut aliquip ex ea commodo consequat.',
    date: '2023-10-28'
  },
  {
    id: 33,
    article: 'Sample Article 33',
    shortHeading: 'Dolor Sit Amet',
    description: 'Dolor sit amet, consectetur adipiscing elit. Nisi ut aliquip ex ea commodo consequat.',
    date: '2023-11-25'
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
      <Checkbox
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
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(null)

  // Filter articles based on the selected date range and search query
  const filteredArticles = useMemo(() => {
    let result = articles

    // Apply date range filter
    if (selectedStartDate && selectedEndDate) {
      result = result.filter(article => {
        const articleDate = new Date(article.date)

        return articleDate >= selectedStartDate && articleDate <= selectedEndDate
      })
    }

    // Apply search query filter
    if (searchQuery) {
      result = result.filter(
        article =>
          article.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.shortHeading.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply duration filter
    if (selectedDuration) {
      const currentDate = new Date()
      const startDate = new Date(currentDate)

      if (selectedDuration === 1) {
        startDate.setDate(currentDate.getDate() - 1)
      } else if (selectedDuration === 7) {
        startDate.setDate(currentDate.getDate() - selectedDuration)
      } else if (selectedDuration === 30) {
        startDate.setMonth(currentDate.getMonth() - 1)
      }

      result = result.filter(article => {
        const articleDate = new Date(article.date)

        return articleDate >= startDate && articleDate <= currentDate
      })
    }

    return result
  }, [selectedStartDate, selectedEndDate, searchQuery, selectedDuration])

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

  // Function to toggle search bar visibility
  const toggleSearchBarVisibility = () => {
    setIsSearchBarVisible(prev => !prev)
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
    setSelectedDuration(1)
  }

  const handleFilter7D = () => {
    setSelectedDuration(7)
  }

  const handleFilter1M = () => {
    setSelectedDuration(30)
  }

  return (
    <Card>
      <CardHeader title='Article Selection' />
      {/* Toolbar with Date Filter */}
      <Toolbar>
        <Typography variant='h6' sx={{ flex: '1' }}>
          Article List
        </Typography>
        {/* Search Bar */}
        {isSearchBarVisible && (
          <TextField
            label='Search Articles'
            variant='outlined'
            size='small'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        )}
        <IconButton onClick={toggleSearchBarVisibility} sx={{ color: '#7367F0', mr: 1 }}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={handleDelete} sx={{ color: '#7367F0' }}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleEmail} sx={{ color: '#7367F0' }}>
          <EmailIcon />
        </IconButton>
        <IconButton onClick={handleImage} sx={{ color: '#7367F0' }}>
          <ImageIcon />
        </IconButton>
        <IconButton onClick={handleDownload} sx={{ color: '#7367F0' }}>
          <DownloadIcon />
        </IconButton>
        <IconButton onClick={handleRssFeed} sx={{ color: '#7367F0' }}>
          <RssFeedIcon />
        </IconButton>
        <IconButton onClick={openFilterPopover} sx={{ color: '#7367F0' }}>
          <DateRangeIcon />
        </IconButton>
        {/* Custom Icons for Filtering */}
        <IconButton onClick={handleFilter1D}>
          <OneDIcon />
        </IconButton>
        <IconButton onClick={handleFilter7D}>
          <TwoDIcon />
        </IconButton>
        <IconButton onClick={handleFilter1M}>
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
        <Stack spacing={2} p={2} sx={{ minWidth: '200px', minHeight: '200px' }}>
          <Typography variant='subtitle2'>Filter by Date Range</Typography>
          <Divider />
          {/* Use mui-x DatePicker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display='flex' alignItems='center'>
              <DatePicker label='Start Date' value={selectedStartDate} onChange={date => setSelectedStartDate(date)} />
              {selectedStartDate && (
                <IconButton onClick={() => setSelectedStartDate(null)}>
                  <ClearIcon />
                </IconButton>
              )}
            </Box>
            <Box display='flex' alignItems='center'>
              <DatePicker label='End Date' value={selectedEndDate} onChange={date => setSelectedEndDate(date)} />
              {selectedEndDate && (
                <IconButton onClick={() => setSelectedEndDate(null)}>
                  <ClearIcon />
                </IconButton>
              )}
            </Box>
          </LocalizationProvider>
          {/* Clear both dates at the same time */}
          <Button
            onClick={() => {
              setSelectedStartDate(null)
              setSelectedEndDate(null)
            }}
          >
            Clear
          </Button>
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
