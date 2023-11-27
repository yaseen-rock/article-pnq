import React, { useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ToolbarComponent = () => {
  // State for dropdown menus
  const [competitionAnchor, setCompetitionAnchor] = useState(null)
  const [geographyAnchor, setGeographyAnchor] = useState(null)
  const [languageAnchor, setLanguageAnchor] = useState(null)
  const [mediaAnchor, setMediaAnchor] = useState(null)
  const [tagsAnchor, setTagsAnchor] = useState(null)

  // Add state for other dropdowns (geography, language, media, tags) if needed

  // Function to open dropdown menus
  const openDropdown = (event, anchorSetter) => {
    anchorSetter(event.currentTarget)
  }

  // Function to close dropdown menus
  const closeDropdown = anchorSetter => {
    anchorSetter(null)
  }

  // Dummy function for dropdown item click (replace with actual logic)
  const handleDropdownItemClick = () => {
    // Add your logic here
    console.log('Dropdown item clicked')
    closeDropdown(setCompetitionAnchor) // Close the menu after item click
  }

  return (
    <Toolbar
      sx={{
        backgroundColor: '#7367F0',
        color: 'white', // Set text color to white
        display: 'flex',
        justifyContent: 'flex-end' // Align items to the right
      }}
    >
      {/* Add your additional toolbar buttons here */}
      <Button
        endIcon={<ExpandMoreIcon />} // Add the icon to the end of the button
        onClick={e => openDropdown(e, setCompetitionAnchor)}
        color='inherit'
      >
        Competition
      </Button>
      {/* Geography Dropdown */}
      <Button
        endIcon={<ExpandMoreIcon />} // Add the icon to the end of the button
        onClick={e => openDropdown(e, setGeographyAnchor)}
        color='inherit'
      >
        Geography
      </Button>

      {/* Language Dropdown */}
      <Button
        endIcon={<ExpandMoreIcon />} // Add the icon to the end of the button
        onClick={e => openDropdown(e, setLanguageAnchor)}
        color='inherit'
      >
        Language
      </Button>

      {/* Media Dropdown */}
      <Button
        endIcon={<ExpandMoreIcon />} // Add the icon to the end of the button
        onClick={e => openDropdown(e, setMediaAnchor)}
        color='inherit'
      >
        Media
      </Button>

      {/* Tags Dropdown */}
      <Button
        endIcon={<ExpandMoreIcon />} // Add the icon to the end of the button
        onClick={e => openDropdown(e, setTagsAnchor)}
        color='inherit'
      >
        Tags
      </Button>
      {/* Dropdown Menus */}
      <Menu
        open={Boolean(competitionAnchor)}
        anchorEl={competitionAnchor}
        onClose={() => closeDropdown(setCompetitionAnchor)}
      >
        <MenuItem onClick={handleDropdownItemClick}>Item 1</MenuItem>
        <MenuItem onClick={handleDropdownItemClick}>Item 2</MenuItem>
        {/* Add more items as needed */}
      </Menu>

      {/* Geography Dropdown Menu */}
      <Menu
        open={Boolean(geographyAnchor)}
        anchorEl={geographyAnchor}
        onClose={() => closeDropdown(setGeographyAnchor)}
      >
        <MenuItem onClick={handleDropdownItemClick}>Item 1</MenuItem>
        <MenuItem onClick={handleDropdownItemClick}>Item 2</MenuItem>
        {/* Add more items as needed */}
      </Menu>

      {/* Language Dropdown Menu */}
      <Menu open={Boolean(languageAnchor)} anchorEl={languageAnchor} onClose={() => closeDropdown(setLanguageAnchor)}>
        <MenuItem onClick={handleDropdownItemClick}>Item 1</MenuItem>
        <MenuItem onClick={handleDropdownItemClick}>Item 2</MenuItem>
        {/* Add more items as needed */}
      </Menu>

      {/* Media Dropdown Menu */}
      <Menu open={Boolean(mediaAnchor)} anchorEl={mediaAnchor} onClose={() => closeDropdown(setMediaAnchor)}>
        <MenuItem onClick={handleDropdownItemClick}>Item 1</MenuItem>
        <MenuItem onClick={handleDropdownItemClick}>Item 2</MenuItem>
        {/* Add more items as needed */}
      </Menu>

      {/* Tags Dropdown Menu */}
      <Menu open={Boolean(tagsAnchor)} anchorEl={tagsAnchor} onClose={() => closeDropdown(setTagsAnchor)}>
        <MenuItem onClick={handleDropdownItemClick}>Item 1</MenuItem>
        <MenuItem onClick={handleDropdownItemClick}>Item 2</MenuItem>
        {/* Add more items as needed */}
      </Menu>

      {/* Repeat the structure for other dropdowns (geography, language, media, tags) */}
      {/* ... (similar Menu components for other dropdowns) */}
    </Toolbar>
  )
}

export default ToolbarComponent
