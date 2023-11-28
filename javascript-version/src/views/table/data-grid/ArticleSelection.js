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

import ToolbarComponent from './toolbar/ToolbarComponent'
import ArticleFullScreenDialog from './dialog/ArticleDialog'
import EditDialog from './dialog/EditDialog'

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
import EditIcon from '@mui/icons-material/Edit'

// ** Article Database
import { articles } from './Db-Articles'

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

const TableSelection = () => {
  const columns = [
    {
      flex: 0.1,
      minWidth: 5,
      headerName: 'Select',
      field: 'select',

      renderCell: params => (
        <Checkbox
          checked={params.row.isSelected}
          onChange={() => params.api.selectRow(params.row.id, !params.row.isSelected, false)}
          onClick={e => e.stopPropagation()} // Stop propagation to prevent opening the dialog
        />
      )
    },
    {
      flex: 0.25,
      minWidth: 240,
      field: 'article',
      headerName: 'Article',
      renderCell: renderArticle
    },
    {
      flex: 0.175,
      type: 'date',
      minWidth: 30,
      headerName: 'Issue Date',
      field: 'date',
      valueGetter: params => new Date(params.value),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.date}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 5,
      field: 'edit',
      headerName: 'Edit',
      renderCell: params => (
        <IconButton
          onClick={e => {
            e.stopPropagation()
            handleEdit(params.row)
          }}
        >
          <EditIcon />
        </IconButton>
      )
    }
  ]

  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [filterPopoverAnchor, setFilterPopoverAnchor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(null)
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)

  const handleEdit = row => {
    setSelectedArticle(row)
    setEditDialogOpen(true)
  }

  const handleSaveChanges = editedArticle => {
    // Add logic to save changes to the article
    console.log('Saving changes:', editedArticle)
  }

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

  const [selectedArticle, setSelectedArticle] = useState(null)
  const [isPopupOpen, setPopupOpen] = useState(false)

  const handleRowClick = params => {
    setSelectedArticle(params.row)
    setPopupOpen(true)
  }

  return (
    <Card>
      <CardHeader title='Article Selection' />
      {/* Top Toolbar */}
      <ToolbarComponent />
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
            onRowClick={params => handleRowClick(params)}
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
            onRowClick={params => handleRowClick(params)}
          />
        </Box>
      </Box>
      {/* Popup Window */}
      <ArticleFullScreenDialog
        open={isPopupOpen}
        handleClose={() => setPopupOpen(false)}
        article={selectedArticle}
      />{' '}
      {/* Edit Dialog */}
      <EditDialog
        open={isEditDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        article={selectedArticle}
        handleSave={handleSaveChanges}
      />
    </Card>
  )
}

export default TableSelection
