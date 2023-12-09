import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material'
import DateRangeIcon from '@mui/icons-material/DateRange'
import LocationCityIcon from '@mui/icons-material/LocationCity'

const ChartsAppBar = ({ handleDateRangeChange }) => {
  const [dateMenuAnchorEl, setDateMenuAnchorEl] = useState(null)
  const [citiesMenuAnchorEl, setCitiesMenuAnchorEl] = useState(null)

  const handleDateMenuOpen = event => {
    setDateMenuAnchorEl(event.currentTarget)
  }

  const handleDateMenuClose = () => {
    setDateMenuAnchorEl(null)
  }

  const handleCitiesMenuOpen = event => {
    setCitiesMenuAnchorEl(event.currentTarget)
  }

  const handleCitiesMenuClose = () => {
    setCitiesMenuAnchorEl(null)
  }

  const handleMenuItemClick = range => {
    handleDateRangeChange(range)
    handleDateMenuClose()
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' color='inherit' component='div' sx={{ flexGrow: 1 }}>
          Charts
        </Typography>

        {/* Date range icon */}
        <IconButton
          size='large'
          edge='end'
          color='inherit'
          aria-label='select date range'
          aria-controls='date-range-menu'
          aria-haspopup='true'
          onClick={handleDateMenuOpen}
        >
          <DateRangeIcon />
        </IconButton>

        {/* City icon */}
        <IconButton
          size='large'
          edge='end'
          color='inherit'
          aria-label='select cities'
          aria-controls='cities-menu'
          aria-haspopup='true'
          onClick={handleCitiesMenuOpen}
        >
          <LocationCityIcon />
        </IconButton>

        {/* Date range menu */}
        <Menu
          id='date-range-menu'
          anchorEl={dateMenuAnchorEl}
          open={Boolean(dateMenuAnchorEl)}
          onClose={handleDateMenuClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('today')}>Today</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('last_week')}>Last Week</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('last_month')}>Last Month</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('last_three_months')}>Last 3 Months</MenuItem>
        </Menu>

        {/* Cities menu */}
        <Menu
          id='cities-menu'
          anchorEl={citiesMenuAnchorEl}
          open={Boolean(citiesMenuAnchorEl)}
          onClose={handleCitiesMenuClose}
        >
          <MenuItem>Delhi</MenuItem>
          <MenuItem>Mumbai</MenuItem>
          <MenuItem>Kolkata</MenuItem>
          <MenuItem>Chennai</MenuItem>
          <MenuItem>Bangalore</MenuItem>
          <MenuItem>Hyderabad</MenuItem>
          <MenuItem>Ahmedabad</MenuItem>
          <MenuItem>Pune</MenuItem>
          <MenuItem>Surat</MenuItem>
          <MenuItem>Jaipur</MenuItem>
          <MenuItem>Lucknow</MenuItem>
          <MenuItem>Kanpur</MenuItem>
          <MenuItem>Nagpur</MenuItem>
          <MenuItem>Indore</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default ChartsAppBar
