import React, { useEffect, useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import EmailIcon from '@mui/icons-material/Email'
import ImageIcon from '@mui/icons-material/Image'
import DownloadIcon from '@mui/icons-material/Download'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import DateRangeIcon from '@mui/icons-material/DateRange'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import ClearIcon from '@mui/icons-material/Clear'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import useMediaQuery from '@mui/material/useMediaQuery'
import dayjs from 'dayjs'
import AdvancedSearchForm from '../dialog/AdvancedSearchForm'
import Tooltip from '@mui/material/Tooltip'

// Advanced Search Icon
const AdvancedSearchIcon = () => (
  <SvgIcon>
    <svg xmlns='http://www.w3.org/2000/svg' width='27' height='25' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='m15.5 14l5 5l-1.5 1.5l-5-5v-.79l-.27-.28A6.471 6.471 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.57 4.23l.28.27zm-6 0C12 14 14 12 14 9.5S12 5 9.5 5S5 7 5 9.5S7 14 9.5 14m2.5-4h-2v2H9v-2H7V9h2V7h1v2h2z'
      />
    </svg>
  </SvgIcon>
)

// Excel Dump Icon
const ExcelDumpIcon = () => (
  <SvgIcon>
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='m2.859 2.877l12.57-1.795a.5.5 0 0 1 .571.494v20.848a.5.5 0 0 1-.57.494L2.858 21.123a1 1 0 0 1-.859-.99V3.867a1 1 0 0 1 .859-.99M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4zm-6.8 9L13 8h-2.4L9 10.286L7.4 8H5l2.8 4L5 16h2.4L9 13.714L10.6 16H13z'
      />
    </svg>
  </SvgIcon>
)

// Tagging Icon
const TaggingIcon = () => (
  <SvgIcon>
    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59c.55 0 1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42'
      />
    </svg>
  </SvgIcon>
)

// Sort By Icon
const SortByIcon = () => (
  <SvgIcon>
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='27' viewBox='0 0 36 36'>
      <path
        fill='currentColor'
        d='M28.54 13H7.46a1 1 0 0 1 0-2h21.08a1 1 0 0 1 0 2'
        class='clr-i-outline clr-i-outline-path-1'
      />
      <path
        fill='currentColor'
        d='M21.17 19H7.46a1 1 0 0 1 0-2h13.71a1 1 0 0 1 0 2'
        class='clr-i-outline clr-i-outline-path-2'
      />
      <path
        fill='currentColor'
        d='M13.74 25H7.46a1 1 0 0 1 0-2h6.28a1 1 0 0 1 0 2'
        class='clr-i-outline clr-i-outline-path-3'
      />
      <path fill='none' d='M0 0h36v36H0z' />
    </svg>
  </SvgIcon>
)

// Publication Type Icon
const PublicationTypeIcon = () => (
  <SvgIcon>
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        fill-rule='evenodd'
        d='M5 2a1 1 0 0 0-1 1v16a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-.293-.707l-5-5A1 1 0 0 0 14 2zm9 2.414L17.586 8H14zM8 10.5A1.5 1.5 0 0 1 9.5 9h.01a1.5 1.5 0 0 1 1.5 1.5v.01a1.5 1.5 0 0 1-1.5 1.5H9.5a1.5 1.5 0 0 1-1.5-1.5zm4.707 2.793a1 1 0 0 0-1.414 0l-4 4a1 1 0 1 0 1.414 1.414L12 15.414l3.293 3.293a1 1 0 0 0 1.414-1.414z'
        clip-rule='evenodd'
      />
    </svg>
  </SvgIcon>
)

// Edition Type Icon
const EditionTypeIcon = () => (
  <SvgIcon>
    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='m15.66 14.694l-2.084-2.046l-.129-.117a2.25 2.25 0 0 0-2.888-.006l-.136.123l-6.233 6.124A.7.7 0 0 1 3 18.273V6.25A3.25 3.25 0 0 1 6.25 3h11.5A3.25 3.25 0 0 1 21 6.25v4.762a3.278 3.278 0 0 0-2.608.95zM13.5 8.252a2.252 2.252 0 1 0 4.504 0a2.252 2.252 0 0 0-4.505 0m2.252-.752a.752.752 0 1 1 0 1.504a.752.752 0 0 1 0-1.504m-4.278 6.218l.084-.071a.75.75 0 0 1 .873-.007l.094.078l2.075 2.037l-2.11 2.11a3.686 3.686 0 0 0-.931 1.57c-.345-.536-.87-.915-1.412-1.133c-.691-.278-1.386-.16-1.936.035l-.112.04c-.48.168-.864-.408-.53-.791l.21-.241zm7.625-1.049l-5.902 5.903a2.684 2.684 0 0 0-.706 1.247l-.428 1.712c-.355.17-.71.202-1.133.105c-.126-.03-.18-.175-.127-.293c.43-.962-.19-1.776-1.03-2.113c-.955-.385-2.226.515-3.292 1.268c-.592.42-1.12.793-1.496.876c-.525.117-1.162-.123-1.631-.38c-.209-.113-.487.072-.388.288c.242.529.731 1.133 1.71 1.255c.98.121 1.766-.347 2.55-.815c.583-.348 1.165-.696 1.826-.799c.086-.013.144.088.105.166c-.242.484-.356 1.37.218 1.818c.848.662 3.237.292 3.828.088a.982.982 0 0 0 .148-.027l1.83-.457a2.684 2.684 0 0 0 1.248-.707l5.903-5.902a2.286 2.286 0 0 0-3.233-3.232'
      />
    </svg>
  </SvgIcon>
)

// 1D Icon
const OneDIcon = props => (
  <SvgIcon {...props}>
    <text x='50%' y='50%' fontSize='14px' text-anchor='middle' alignment-baseline='middle'>
      1D
    </text>
  </SvgIcon>
)

// 7D Icon
const SevenDIcon = props => (
  <SvgIcon {...props}>
    <text x='50%' y='50%' fontSize='14px' text-anchor='middle' alignment-baseline='middle'>
      7D
    </text>
  </SvgIcon>
)

// 1M Icon
const OneMIcon = props => (
  <SvgIcon {...props}>
    <text x='50%' y='50%' fontSize='14px' text-anchor='middle' alignment-baseline='middle'>
      1M
    </text>
  </SvgIcon>
)

const ArticleListToolbar = ({
  setSearchQuery,
  isSearchBarVisible,
  toggleSearchBarVisibility,
  handleDelete,
  handleEmail,
  handleImage,
  handleDownload,
  handleRssFeed,
  openFilterPopover,
  filterPopoverAnchor,
  closeFilterPopover,
  selectedStartDate,
  setSelectedStartDate,
  selectedEndDate,
  setSelectedEndDate,
  primaryColor
}) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const [selectedFilter, setSelectedFilter] = useState('1D')

  // Helper function to calculate date by subtracting days from the current date
  const calculateDate = days => dayjs().subtract(days, 'day')

  // Function to handle 1D filter
  const handleFilter1D = () => {
    const startDate = calculateDate(1)
    setSelectedStartDate(startDate)
    setSelectedEndDate(startDate)
    setSelectedFilter('1D')
  }

  // Function to handle 7D filter
  const handleFilter7D = () => {
    const startDate = calculateDate(7)
    setSelectedStartDate(startDate)
    setSelectedEndDate(dayjs()) // Set end date to today
    setSelectedFilter('7D')
  }

  // Function to handle 1M filter
  const handleFilter1M = () => {
    const startDate = calculateDate(30)
    setSelectedStartDate(startDate)
    setSelectedEndDate(dayjs()) // Set end date to today
    setSelectedFilter('1M')
  }

  // useEffect to set default date for 1D filter and highlight the icon when component mounts
  useEffect(() => {
    handleFilter1D()
  }, []) // Empty dependency array to run the effect only once

  const [isAdvancedSearchOpen, setAdvancedSearchOpen] = useState(false)

  const handleAdvancedSearchOpen = () => {
    setAdvancedSearchOpen(true)
  }

  const handleAdvancedSearchClose = () => {
    setAdvancedSearchOpen(false)
  }

  return (
    <Toolbar
      sx={{
        display: 'flex',
        flexWrap: 'wrap'
      }}
    >
      {!isMobile && (
        <Typography variant='h6' sx={{ flex: '1' }}>
          Feed List
        </Typography>
      )}
      {/* {isSearchBarVisible && (
        <TextField
          label='Search Articles'
          variant='outlined'
          size='small'
          onChange={e => setSearchQuery(e.target.value)}
        />
      )}
      <Button onClick={toggleSearchBarVisibility} sx={{ color: primaryColor, mr: 0 }}>
        <SearchIcon />
      </Button> */}
      <Button sx={{ color: primaryColor, mr: 0 }} onClick={handleAdvancedSearchOpen}>
        <AdvancedSearchIcon />
      </Button>
      <AdvancedSearchForm open={isAdvancedSearchOpen} onClose={handleAdvancedSearchClose} />
      <Button onClick={handleDelete} sx={{ color: primaryColor, mr: 0 }}>
        <DeleteIcon />
      </Button>
      <Tooltip title='Email' style={{ color: primaryColor }}>
        <Button onClick={handleEmail} sx={{ color: primaryColor, mr: 0 }}>
          <EmailIcon />
        </Button>
      </Tooltip>
      <Button onClick={handleImage} sx={{ color: primaryColor, mr: 0 }}>
        <ImageIcon />
      </Button>
      <Button onClick={handleDownload} sx={{ color: primaryColor, mr: 0 }}>
        <DownloadIcon />
      </Button>
      <Button sx={{ color: primaryColor, mr: 0 }}>
        <ExcelDumpIcon />
      </Button>
      <Button onClick={handleRssFeed} sx={{ color: primaryColor, mr: 0 }}>
        <RssFeedIcon />
      </Button>
      <Button sx={{ color: primaryColor, mr: 0 }}>
        <TaggingIcon />
      </Button>
      <Button sx={{ color: primaryColor, mr: 0 }}>
        <SortByIcon />
      </Button>
      <Button sx={{ color: primaryColor, mr: 0 }}>
        <PublicationTypeIcon />
      </Button>
      <Button sx={{ color: primaryColor, mr: 0 }}>
        <EditionTypeIcon />
      </Button>
      <Button onClick={openFilterPopover} sx={{ color: primaryColor, mr: 0 }}>
        <DateRangeIcon />
      </Button>
      <Button
        onClick={handleFilter1D}
        sx={{ color: primaryColor, mr: 0 }}
        variant={selectedFilter === '1D' ? 'contained' : 'text'}
      >
        <OneDIcon />
      </Button>
      <Button
        onClick={handleFilter7D}
        sx={{ color: primaryColor, mr: 0 }}
        variant={selectedFilter === '7D' ? 'contained' : 'text'}
      >
        <SevenDIcon />
      </Button>
      <Button
        onClick={handleFilter1M}
        sx={{ color: primaryColor, mr: 0 }}
        variant={selectedFilter === '1M' ? 'contained' : 'text'}
      >
        <OneMIcon />
      </Button>
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
    </Toolbar>
  )
}

export default ArticleListToolbar
