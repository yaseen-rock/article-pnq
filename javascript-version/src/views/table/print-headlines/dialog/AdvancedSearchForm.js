import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const AdvancedSearchForm = ({ open, onClose }) => {
  const [searchHeadline, setSearchHeadline] = useState('')
  const [searchBody, setSearchBody] = useState('')
  const [combinationOfWords, setCombinationOfWords] = useState('')
  const [anyOfWords, setAnyOfWords] = useState('')
  const [exactPhrase, setExactPhrase] = useState('')
  const [ignoreThis, setIgnoreThis] = useState('')
  const [journalist, setJournalist] = useState('')

  const handleSearch = () => {
    // Implement your search logic here with the provided values
    console.log('Search Headline:', searchHeadline)
    console.log('Search Body:', searchBody)
    console.log('Combination of Words:', combinationOfWords)
    console.log('Any of Words:', anyOfWords)
    console.log('Exact Phrase:', exactPhrase)
    console.log('Ignore This:', ignoreThis)
    console.log('Journalist:', journalist)

    // Close the dialog
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Advanced Search</DialogTitle>
      <DialogContent>
        <TextField
          label='Search Headline'
          fullWidth
          value={searchHeadline}
          onChange={e => setSearchHeadline(e.target.value)}
          margin='normal'
        />
        <TextField
          label='Search Body'
          fullWidth
          value={searchBody}
          onChange={e => setSearchBody(e.target.value)}
          margin='normal'
        />
        <TextField
          label="Combination of These Words  (Use '+' sign eg. abc=xyz)"
          fullWidth
          value={combinationOfWords}
          onChange={e => setCombinationOfWords(e.target.value)}
          margin='normal'
        />
        <TextField
          label="Any of These Words  (Use '+' sign eg. abc=xyz)"
          fullWidth
          value={anyOfWords}
          onChange={e => setAnyOfWords(e.target.value)}
          margin='normal'
        />
        <TextField
          label='Exact Phrase'
          fullWidth
          value={exactPhrase}
          onChange={e => setExactPhrase(e.target.value)}
          margin='normal'
        />
        <TextField
          label='Ignore This'
          fullWidth
          value={ignoreThis}
          onChange={e => setIgnoreThis(e.target.value)}
          margin='normal'
        />
        <TextField
          label='Journalist'
          fullWidth
          value={journalist}
          onChange={e => setJournalist(e.target.value)}
          margin='normal'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSearch} color='primary'>
          Search
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdvancedSearchForm
