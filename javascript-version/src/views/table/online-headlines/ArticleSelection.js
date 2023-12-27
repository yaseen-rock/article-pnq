// ** React Import
import { useState, useMemo, useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'
import Checkbox from '@mui/material/Checkbox'

import ToolbarComponent from './toolbar/ToolbarComponent'
import ArticleFullScreenDialog from './dialog/ArticleDialog'
import EditDialog from './dialog/EditDialog'
import ArticleListToolbar from './toolbar/ArticleListToolbar'

// ** MUI icons
import EditIcon from '@mui/icons-material/Edit'

// ** Article Database
import { articles } from './Db-Articles'

import useMediaQuery from '@mui/material/useMediaQuery'

// ** Renders social feed column
const renderSocialFeed = params => {
  const { row } = params

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
        {row.headline}
      </Typography>
      <Typography noWrap variant='caption'>
        {row.publisher}
      </Typography>
      {/* Displaying the summary */}
      <Typography noWrap variant='caption'>
        {row.summary}
      </Typography>
    </Box>
  )
}

const TableSelection = () => {
  const socialFeedColumns = [
    {
      flex: 0.1,
      minWidth: 5,
      headerName: 'Select',
      field: 'select',
      renderCell: params => (
        <Checkbox
          checked={params.row.isSelected}
          onChange={() => params.api.selectRow(params.row.socialFeedId, !params.row.isSelected, false)}
          onClick={e => e.stopPropagation()} // Stop propagation to prevent opening the dialog
        />
      )
    },
    {
      flex: 0.4,
      minWidth: 240,
      field: 'socialFeed',
      headerName: 'Social Feed',
      renderCell: renderSocialFeed
    },
    {
      flex: 0.11,
      type: 'date',
      minWidth: 30,
      headerName: 'Date',
      field: 'date',
      valueGetter: params => new Date(params.value),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {new Date(params.row.feedDate).toLocaleDateString()} {/* Format date without time */}
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
  const isNotResponsive = useMediaQuery('(min-width: 1000px )')
  const isMobileView = useMediaQuery('(max-width: 530px)')
  const isNarrowMobileView = useMediaQuery('(max-width: 405px)')

  // ** State
  const [socialFeeds, setSocialFeeds] = useState([])

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5, // Default pageSize
    totalRecords: 0 // New state for totalRecords
  })
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [filterPopoverAnchor, setFilterPopoverAnchor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(null)
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)
  const getRowId = row => row.socialFeedId
  const [selectedCompanyId, setSelectedCompanyId] = useState(null)

  const handleEdit = row => {
    setSelectedArticle(row)
    setEditDialogOpen(true)
  }

  const handleSaveChanges = editedArticle => {
    // Add logic to save changes to the article
    console.log('Saving changes:', editedArticle)
  }

  // Fetch social feeds based on the provided API
  const fetchSocialFeeds = async () => {
    try {
      const storedToken = localStorage.getItem('accessToken')
      const storedClientId = localStorage.getItem('clientId')

      if (storedToken) {
        const base_url = 'http://51.68.220.77:8001'

        const request_params = {
          clientIds: [storedClientId],
          companyIds: selectedCompanyId,
          fromDate: '2022-12-01 00:00:00',
          toDate: '2023-12-05 00:00:00',
          page: 1,
          recordsPerPage: 500
        }

        const response = await axios.get(`${base_url}/clientWiseSocialFeeds/`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          },
          params: request_params
        })

        const totalRecords = response.data.totalRecords || 0

        // Assuming the API response contains socialFeeds
        setSocialFeeds(response.data.socialFeeds)

        // Update totalRecords in the state
        setPaginationModel(prevPagination => ({
          ...prevPagination,
          totalRecords
        }))
      }
    } catch (error) {
      console.error('Error fetching social feeds:', error)
    }
  }

  useEffect(() => {
    fetchSocialFeeds()
  }, [selectedCompanyId, paginationModel.page, paginationModel.pageSize])

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

  // Divide social feeds into left and right columns
  const leftSocialFeeds = socialFeeds.filter((_, index) => index % 2 === 0)
  const rightSocialFeeds = socialFeeds.filter((_, index) => index % 2 !== 0)

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
      <ToolbarComponent selectedCompanyId={selectedCompanyId} setSelectedCompanyId={setSelectedCompanyId} />
      {/* Toolbar with Date Filter */}
      <ArticleListToolbar
        setSearchQuery={setSearchQuery}
        isSearchBarVisible={isSearchBarVisible}
        toggleSearchBarVisibility={toggleSearchBarVisibility}
        handleDelete={handleDelete}
        handleEmail={handleEmail}
        handleImage={handleImage}
        handleDownload={handleDownload}
        handleRssFeed={handleRssFeed}
        openFilterPopover={openFilterPopover}
        handleFilter1D={handleFilter1D}
        handleFilter7D={handleFilter7D}
        handleFilter1M={handleFilter1M}
        filterPopoverAnchor={filterPopoverAnchor}
        closeFilterPopover={closeFilterPopover}
        selectedStartDate={selectedStartDate}
        setSelectedStartDate={setSelectedStartDate}
        selectedEndDate={selectedEndDate}
        setSelectedEndDate={setSelectedEndDate}
      />
      {/* DataGrid */}
      <Box p={2}>
        {isNotResponsive ? (
          <Box display='flex'>
            {isMobileView ? null : (
              <Box flex='1' p={2} pr={1}>
                <DataGrid
                  autoHeight
                  rows={leftSocialFeeds}
                  columns={socialFeedColumns}
                  pageSizeOptions={[5, 10, 50]}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  onRowClick={params => handleRowClick(params)}
                  hideFooterPagination
                  getRowId={getRowId}
                  rowCount={paginationModel.totalRecords}
                />
              </Box>
            )}

            {/* Right Column */}
            <Box flex='1' p={2} pl={isMobileView ? 0 : 1}>
              <DataGrid
                autoHeight
                rows={rightSocialFeeds}
                columns={socialFeedColumns}
                pageSizeOptions={[5, 10, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowClick={params => handleRowClick(params)}
                getRowId={getRowId}
                rowCount={paginationModel.totalRecords}
              />
            </Box>
          </Box>
        ) : (
          <DataGrid
            autoHeight
            rows={socialFeeds}
            columns={socialFeedColumns.filter(column => {
              // Check if it's mobile view and exclude only the "Select" and "Edit" columns
              if (isMobileView) {
                return (
                  column.field !== 'select' &&
                  column.field !== 'edit' &&
                  !(column.field === 'date' && isNarrowMobileView)
                )
              }

              return true
            })}
            pageSizeOptions={[5, 10, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            onRowClick={params => handleRowClick(params)}
            getRowId={getRowId}
            rowCount={paginationModel.totalRecords}
          />
        )}
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
        socialFeed={selectedArticle}
        handleSave={handleSaveChanges}
      />
    </Card>
  )
}

export default TableSelection
