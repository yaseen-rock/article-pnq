// ** React Import
import { useState, useMemo, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'
import Checkbox from '@mui/material/Checkbox'
import ToolbarComponent from './toolbar/ToolbarComponent'
import ArticleDialog from './dialog/ArticleDialog'
import ViewDialog from './dialog/view/MoreDialog'
import ArticleListToolbar from './toolbar/ArticleListToolbar'

// ** MUI icons
import MoreVertIcon from '@mui/icons-material/MoreVert'
import useMediaQuery from '@mui/material/useMediaQuery'
import dayjs from 'dayjs'

//api call
import { fetchArticles } from '../../../api/print-headlines/articleApi'

//pagination
import Pagination from './Pagination'

import CircularProgress from '@mui/material/CircularProgress'

// ** Redux
import { useSelector } from 'react-redux' // Import useSelector from react-redux
import { selectSelectedClient } from 'src/store/apps/user/userSlice'

// ** Tooltip
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/system'
import { List, ListItem } from '@mui/material'
import { tooltipClasses } from '@mui/material/Tooltip'

// Your CustomTooltip component
const CustomTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.background.default, // Use default background color for dark theme
      color: theme.palette.text.primary, // Use primary text color for dark theme
      boxShadow: theme.shadows[1],
      fontSize: 11,
      maxWidth: '300px', // Set the maximum width for better readability
      '& .MuiTooltip-arrow': {
        color: theme.palette.background.default // Use default background color for the arrow in dark theme
      }
    }
  })
)

const renderArticle = params => {
  const { row } = params

  const formattedDate = dayjs(row.articleDate).format('DD-MM-YYYY')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CustomTooltip title={getTooltipContent(row)} arrow>
        <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
          {row.headline}
        </Typography>
      </CustomTooltip>
      <Typography noWrap variant='caption'>
        {row.publication}
        <span style={{ marginLeft: '4px' }}>({formattedDate})</span>
      </Typography>
    </Box>
  )
}

// Function to generate tooltip content using List
const getTooltipContent = row => (
  <List>
    <ListItem>
      <Typography variant='body2' sx={{ fontWeight: 600, color: 'primary.main' }}>
        Summary:
      </Typography>
    </ListItem>
    <ListItem>{row.summary}</ListItem>
    <ListItem>
      <Typography variant='body2' sx={{ fontWeight: 600, color: 'primary.main' }}>
        Companies:
      </Typography>{' '}
      {row.companies.length > 1 ? row.companies.map(company => company.name).join(', ') : row.companies[0]?.name}
    </ListItem>
    <ListItem>
      <Typography variant='body2' sx={{ fontWeight: 600, color: 'primary.main' }}>
        Edition Type:
      </Typography>{' '}
      {row.editionTypeName}
    </ListItem>
    <ListItem>
      <Typography variant='body2' sx={{ fontWeight: 600, color: 'primary.main' }}>
        Page Number:
      </Typography>{' '}
      {row.pageNumber}
    </ListItem>
  </List>
)

const TableSelection = () => {
  const articleColumns = [
    {
      flex: 0.1,
      minWidth: 5,
      headerName: 'Select',
      field: 'select',
      renderCell: params => (
        <Checkbox
          onClick={e => {
            e.stopPropagation()
            handleSelect(params.row)
          }}
        />
      )
    },
    {
      flex: 0.6,
      minWidth: 240,
      field: 'article',
      headerName: 'Article',
      renderCell: renderArticle
    },

    {
      flex: 0.1,
      minWidth: 5,
      field: 'more',
      headerName: 'More',
      renderCell: params => (
        <IconButton
          onClick={e => {
            e.stopPropagation()
            handleEdit(params.row)
          }}
        >
          <MoreVertIcon />
        </IconButton>
      )
    }
  ]

  const isNotResponsive = useMediaQuery('(min-width: 1000px )')
  const isMobileView = useMediaQuery('(max-width: 530px)')
  const isNarrowMobileView = useMediaQuery('(max-width: 405px)')

  // ** State
  const [articles, setArticles] = useState([])

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 0, // Default pageSize
    totalRecords: 0 // New state for totalRecords
  })
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [filterPopoverAnchor, setFilterPopoverAnchor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(null)
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)
  const getRowId = row => row.articleId
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [selectedCompanyIds, setSelectedCompanyIds] = useState([])
  const selectedClient = useSelector(selectSelectedClient)
  const clientId = selectedClient ? selectedClient.clientId : null

  // Access priorityCompanyName from selectedClient
  const priorityCompanyName = selectedClient ? selectedClient.priorityCompanyName : ''

  const handleEdit = row => {
    setSelectedArticle(row)
    setEditDialogOpen(true)
  }

  const handleSaveChanges = editedArticle => {
    // Add logic to save changes to the article
    console.log('Saving changes:', editedArticle)
  }

  const [loading, setLoading] = useState(true)

  // Fetch social feeds based on the provided API
  const fetchArticlesApi = async () => {
    try {
      setLoading(true)
      const storedToken = localStorage.getItem('accessToken')

      if (storedToken) {
        const response = await fetchArticles({
          clientIds: clientId,
          companyIds: selectedCompanyIds,
          fromDate: selectedStartDate,
          toDate: selectedEndDate,
          page: currentPage,
          recordsPerPage: recordsPerPage
        })

        const totalRecords = response.totalRecords
        setArticles(response.articles)

        setPaginationModel(prevPagination => ({
          ...prevPagination,
          totalRecords
        }))
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false) // Set loading to false after API call is complete
    }
  }

  useEffect(() => {
    fetchArticlesApi()
  }, [selectedEndDate, selectedStartDate, currentPage, recordsPerPage, selectedCompanyIds, clientId])

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

    return result
  }, [searchQuery])

  // Divide social feeds into left and right columns
  const leftArticles = articles.filter((_, index) => index % 2 === 0)
  const rightArticles = articles.filter((_, index) => index % 2 !== 0)

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

  const [selectedArticles, setSelectedArticles] = useState([])

  const handleSelect = article => {
    // Check if the article is already selected
    const isSelected = selectedArticles.some(selectedArticle => selectedArticle.articleId === article.articleId)

    // Update selectedArticles based on whether the article is already selected or not
    setSelectedArticles(prevSelectedArticles => {
      if (isSelected) {
        // If article is already selected, remove it from the selection
        return prevSelectedArticles.filter(selectedArticle => selectedArticle.articleId !== article.articleId)
      } else {
        // If article is not selected, add it to the selection
        return [...prevSelectedArticles, article]
      }
    })
  }

  const handleLeftPagination = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }

  // Function to handle right pagination
  const handleRightPagination = () => {
    if (currentPage < Math.ceil(paginationModel.totalRecords / paginationModel.pageSize)) {
      setCurrentPage(prevPage => prevPage + 1)
    }
  }

  const handleRecordsPerPageChange = value => {
    const newRecordsPerPage = parseInt(value, 10)

    if (!isNaN(newRecordsPerPage) && newRecordsPerPage > 0) {
      setRecordsPerPage(newRecordsPerPage)
      setCurrentPage(1) // Reset current page when changing records per page
    }
  }

  return (
    <Card>
      <CardHeader title={<Typography variant='title-lg'>{priorityCompanyName}</Typography>} />{' '}
      {/* Use priorityCompanyName in the title */}
      {/* Top Toolbar */}
      <ToolbarComponent selectedCompanyIds={selectedCompanyIds} setSelectedCompanyIds={setSelectedCompanyIds} />{' '}
      {/* Toolbar with Date Filter */}
      <ArticleListToolbar
        setSearchQuery={setSearchQuery}
        isSearchBarVisible={isSearchBarVisible}
        toggleSearchBarVisibility={toggleSearchBarVisibility}
        handleDelete={handleDelete}
        handleEmail={handleEmail}
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
        selectedArticles={selectedArticles}
      />
      {/* DataGrid */}
      <Box p={2}>
        {loading ? (
          <Box display='flex' justifyContent='center' alignItems='center' height='200px'>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {isNotResponsive ? (
              <Box display='flex'>
                {isMobileView ? null : (
                  <Box flex='1' p={2} pr={1}>
                    <DataGrid
                      autoHeight
                      rows={leftArticles}
                      columns={articleColumns}
                      pagination={false} // Remove pagination
                      onRowClick={params => handleRowClick(params)}
                      getRowId={getRowId}
                      hideFooter
                    />
                  </Box>
                )}

                {/* Right Column */}
                <Box flex='1' p={2} pl={isMobileView ? 0 : 1}>
                  <DataGrid
                    autoHeight
                    rows={rightArticles}
                    columns={articleColumns}
                    pagination={false} // Remove pagination
                    onRowClick={params => handleRowClick(params)}
                    getRowId={getRowId}
                    hideFooter
                  />
                </Box>
              </Box>
            ) : (
              <DataGrid
                autoHeight
                rows={articles}
                columns={articleColumns.filter(column => {
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
                pagination={false} // Remove pagination
                onRowClick={params => handleRowClick(params)}
                getRowId={getRowId}
                hideFooter
              />
            )}

            {articles.length > 0 && ( // Only render pagination if there are articles
              <Pagination
                paginationModel={paginationModel}
                currentPage={currentPage}
                recordsPerPage={recordsPerPage}
                handleLeftPagination={handleLeftPagination}
                handleRightPagination={handleRightPagination}
                handleRecordsPerPageUpdate={handleRecordsPerPageChange}
              />
            )}
          </>
        )}
      </Box>
      {/* Popup Window */}
      <ArticleDialog open={isPopupOpen} handleClose={() => setPopupOpen(false)} article={selectedArticle} />{' '}
      {/* Edit Dialog */}
      <ViewDialog
        open={isEditDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        articles={selectedArticle}
        handleSave={handleSaveChanges}
      />
    </Card>
  )
}

export default TableSelection
