import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const Pagination = ({
  paginationModel,
  currentPage,
  recordsPerPage,
  handleLeftPagination,
  handleRightPagination,
  handleRecordsPerPageChange
}) => {
  return (
    <Box
      display='flex'
      flexDirection={{ xs: 'column', md: 'row' }} // Adjust the layout based on screen size
      alignItems='center'
      p={2}
    >
      <Box
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }} // Adjust the layout based on screen size
        alignItems='center'
        mb={{ xs: 2, md: 0 }} // Add margin-bottom for small screens
      >
        {/* Empty box to push content to the right side */}
        <Typography variant='body2' sx={{ marginLeft: { xs: 0, md: 7 } }}>
          Total Records: {paginationModel.totalRecords}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }} // Adjust the layout based on screen size
        alignItems='center'
        mb={{ xs: 2, md: 0 }} // Add margin-bottom for small screens
      >
        <Typography variant='body2' sx={{ marginRight: { xs: 0, md: 2 } }}>
          Records per Page:
        </Typography>
        <Select value={recordsPerPage} onChange={handleRecordsPerPageChange} sx={{ width: { xs: '100%', md: 'auto' } }}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          {/* Add more options as needed */}
        </Select>
      </Box>
      <Box
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }} // Adjust the layout based on screen size
        alignItems='center'
      >
        <Button
          startIcon={<NavigateBeforeIcon />}
          onClick={handleLeftPagination}
          disabled={currentPage === 1}
          sx={{ marginRight: { xs: 0, md: 1 } }} // Add margin for small screens
        >
          Previous Page
        </Button>
        <Button
          endIcon={<NavigateNextIcon />}
          onClick={handleRightPagination}
          disabled={currentPage === Math.ceil(paginationModel.totalRecords / paginationModel.pageSize)}
        >
          Next Page
        </Button>
      </Box>
    </Box>
  )
}

export default Pagination
