// ClientPopover.js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserData, setSelectedClient } from 'src/store/apps/user/userSlice'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

const ClientPopover = ({ anchorEl, onClose }) => {
  const open = Boolean(anchorEl)
  const dispatch = useDispatch()

  // Get user data and client list from Redux
  const userData = useSelector(selectUserData)
  const clientList = userData ? userData.clientList : []

  // Function to handle client name click
  const handleClientClick = selectedClient => {
    // Dispatch an action to store the selected client in Redux
    dispatch(setSelectedClient(selectedClient))

    // Close the popover
    onClose()
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <Box sx={{ p: 2, minWidth: '200px' }}>
        <Typography variant='h6'>Client List</Typography>
        <List>
          {clientList.map((client, index) => (
            <ListItem key={index} button onClick={() => handleClientClick(client)}>
              <ListItemText primary={client.clientName} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Popover>
  )
}

export default ClientPopover
