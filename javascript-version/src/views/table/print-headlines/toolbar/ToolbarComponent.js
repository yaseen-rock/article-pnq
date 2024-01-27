import React, { useState, useEffect } from 'react'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import axios from 'axios'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'

const ToolbarComponent = ({ selectedCompanyIds, setSelectedCompanyIds }) => {
  const [competitionAnchor, setCompetitionAnchor] = useState(null)
  const [geographyAnchor, setGeographyAnchor] = useState(null)
  const [languageAnchor, setLanguageAnchor] = useState(null)
  const [mediaAnchor, setMediaAnchor] = useState(null)
  const [tagsAnchor, setTagsAnchor] = useState(null)
  const [companies, setCompanies] = useState([])
  const [languages, setLanguages] = useState({})
  const [cities, setCities] = useState([])

  const [selectAllCompetitions, setSelectAllCompetitions] = useState(false)

  const handleSelectAllCompetitions = () => {
    const allCompanyIds = companies.map(company => company.companyId)
    setSelectedCompanyIds(allCompanyIds)
  }

  const handleDeselectAllCompetitions = () => {
    setSelectedCompanyIds([])
  }

  const handleCheckboxChange = companyId => {
    setSelectedCompanyIds(prevSelected => {
      const isAlreadySelected = prevSelected.includes(companyId)

      if (isAlreadySelected) {
        // If already selected, remove from the list
        return prevSelected.filter(id => id !== companyId)
      } else {
        // If not selected, add to the list
        return [...prevSelected, companyId]
      }
    })
  }

  const [userData, setUserData] = useState({
    email: '',
    fullName: '',
    clientId: '',
    clientName: '',
    role: ''
  })

  const openDropdown = (event, anchorSetter) => {
    anchorSetter(event.currentTarget)
  }

  const closeDropdown = anchorSetter => {
    anchorSetter(null)
  }

  const handleDropdownItemClick = () => {}

  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  useEffect(() => {
    const fetchUserDataAndCompanies = async () => {
      try {
        const storedUserData = localStorage.getItem('userData')
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData))
        }

        const storedToken = localStorage.getItem('accessToken')
        if (storedToken && userData.clientId) {
          const response = await axios.get('http://51.68.220.77:8001/companyListByClient/', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            },
            params: {
              clientId: userData.clientId
            }
          })
          setCompanies(response.data.companies)
        }

        // Fetch languages
        const languageResponse = await axios.get('http://51.68.220.77:8001/languagelist/', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        })
        setLanguages(languageResponse.data.languages)

        // Fetch cities
        const citiesResponse = await axios.get('http://51.68.220.77:8001/citieslist/', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        })
        setCities(citiesResponse.data.cities)
      } catch (error) {
        console.error('Error fetching user data and companies:', error)
      }
    }

    fetchUserDataAndCompanies()
  }, [userData.clientId])

  return (
    <AppBar sx={{ position: 'static' }}>
      <Toolbar>
        {isMobile ? (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                endIcon={<ExpandMoreIcon />}
                onClick={e => openDropdown(e, setCompetitionAnchor)}
                color='inherit'
                fullWidth
              >
                Competition
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                endIcon={<ExpandMoreIcon />}
                onClick={e => openDropdown(e, setGeographyAnchor)}
                color='inherit'
                fullWidth
              >
                Geography
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                endIcon={<ExpandMoreIcon />}
                onClick={e => openDropdown(e, setLanguageAnchor)}
                color='inherit'
                fullWidth
              >
                Language
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                endIcon={<ExpandMoreIcon />}
                onClick={e => openDropdown(e, setMediaAnchor)}
                color='inherit'
                fullWidth
              >
                Media
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                endIcon={<ExpandMoreIcon />}
                onClick={e => openDropdown(e, setTagsAnchor)}
                color='inherit'
                fullWidth
              >
                Tags
              </Button>
            </Grid>
          </Grid>
        ) : (
          <>
            <Button endIcon={<ExpandMoreIcon />} onClick={e => openDropdown(e, setCompetitionAnchor)} color='inherit'>
              Competition
            </Button>

            <Button endIcon={<ExpandMoreIcon />} onClick={e => openDropdown(e, setGeographyAnchor)} color='inherit'>
              Geography
            </Button>

            <Button endIcon={<ExpandMoreIcon />} onClick={e => openDropdown(e, setLanguageAnchor)} color='inherit'>
              Language
            </Button>

            <Button endIcon={<ExpandMoreIcon />} onClick={e => openDropdown(e, setMediaAnchor)} color='inherit'>
              Media
            </Button>

            <Button endIcon={<ExpandMoreIcon />} onClick={e => openDropdown(e, setTagsAnchor)} color='inherit'>
              Tags
            </Button>
          </>
        )}

        {/* Competition Dropdown Menu */}
        <Menu
          open={Boolean(competitionAnchor)}
          anchorEl={competitionAnchor}
          onClose={() => closeDropdown(setCompetitionAnchor)}
        >
          <ListItem sx={{ justifyContent: 'space-between' }}>
            <Button onClick={handleSelectAllCompetitions}>Select All</Button>
            <Button onClick={handleDeselectAllCompetitions}>Deselect All</Button>
          </ListItem>
          {companies.map(company => (
            <MenuItem
              key={company.companyId}
              onClick={() => handleCheckboxChange(company.companyId)}
              selected={selectedCompanyIds.includes(company.companyId)}
            >
              {company.companyName}
            </MenuItem>
          ))}
        </Menu>
        {/* Geography Dropdown Menu */}
        <Menu
          open={Boolean(geographyAnchor)}
          anchorEl={geographyAnchor}
          onClose={() => closeDropdown(setGeographyAnchor)}
        >
          {cities.map(city => (
            <MenuItem key={city.cityId} onClick={handleDropdownItemClick}>
              {city.cityName}
            </MenuItem>
          ))}
        </Menu>

        {/* Language Dropdown Menu */}
        <Menu open={Boolean(languageAnchor)} anchorEl={languageAnchor} onClose={() => closeDropdown(setLanguageAnchor)}>
          {Object.entries(languages).map(([languageName, languageCode]) => (
            <MenuItem key={languageCode} onClick={handleDropdownItemClick}>
              {languageName}
            </MenuItem>
          ))}
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

        {/* Repeat similar patterns for other dropdown menus */}
      </Toolbar>
    </AppBar>
  )
}

export default ToolbarComponent
