// context/authcontext.js

import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import authConfig from 'src/configs/auth'

const users = []

const AuthContext = createContext({
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      if (storedToken) {
        setLoading(true)
        try {
          const response = await axios.get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })

          setLoading(false)
          setUser({ ...response.data.userData })
        } catch (error) {
          localStorage.removeItem(authConfig.storageTokenKeyName)
          setUser(null)
          setLoading(false)

          if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
            router.replace('/login')
          }
        }
      } else {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const handleLogin = async (params, errorCallback) => {
    try {
      const response = await axios.post(authConfig.loginEndpoint, params)
      const returnUrl = router.query.returnUrl

      setUser({ ...response.data.userData })
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      router.replace(redirectURL)
    } catch (error) {
      if (errorCallback) errorCallback(error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
