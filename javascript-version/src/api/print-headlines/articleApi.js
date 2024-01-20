// src/api/articleApi.js
import axios from 'axios'

const base_url = process.env.NEXT_PUBLIC_BASE_URL

export const fetchArticles = async ({ clientIds, companyIds, fromDate, toDate, page, recordsPerPage }) => {
  try {
    const storedToken = localStorage.getItem('accessToken')

    const request_params = {
      clientIds,
      companyIds,
      fromDate: fromDate?.toISOString(),
      toDate: toDate?.toISOString(),
      page,
      recordsPerPage
    }
    console.log(fromDate?.toISOString())
    console.log(toDate?.toISOString())
    console.log(page)

    const response = await axios.get(`${base_url}/clientWisePrintArticles/`, {
      headers: {
        Authorization: `Bearer ${storedToken}`
      },
      params: request_params
    })

    return response.data
  } catch (error) {
    console.error('Error fetching articles:', error)
    throw error // Re-throw the error for the caller to handle if needed
  }
}

// Add more API functions as needed
