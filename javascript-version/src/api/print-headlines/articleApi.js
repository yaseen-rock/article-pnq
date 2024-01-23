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

    const response = await axios.get(`${base_url}/clientWisePrintArticles/`, {
      headers: {
        Authorization: `Bearer ${storedToken}`
      },
      params: request_params,
      paramsSerializer: params => {
        // Custom serializer to handle duplicate parameter names
        return Object.entries(params)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              // If the value is an array, create multiple parameters with the same name
              return value.map(v => `${key}=${encodeURIComponent(v)}`).join('&')
            } else {
              return `${key}=${encodeURIComponent(value)}`
            }
          })
          .join('&')
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching articles:', error)
    throw error // Re-throw the error for the caller to handle if needed
  }
}
