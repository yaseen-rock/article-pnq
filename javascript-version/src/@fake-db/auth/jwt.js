// @fake-db/auth/jwt.js

import axios from 'axios'
import mock from 'src/@fake-db/mock'
import defaultAuthConfig from 'src/configs/auth'

mock.onPost('/jwt/login').reply(async request => {
  const { loginName, password } = JSON.parse(request.data)

  try {
    const response = await axios.post('http://51.68.220.77:8001/authenticate', {
      loginName,
      password
    })

    const { accessToken, email, fullName, clientId, clientName, priorityCompanyId, priorityCompanyName } = response.data

    const user = {
      email,
      fullName,
      clientId,
      clientName,
      priorityCompanyId,
      priorityCompanyName,
      role: 'admin'
    }

    return [200, { accessToken, userData: user }]
  } catch (error) {
    return [400, { error: { email: ['Invalid credentials'] } }]
  }
})

// Other mock endpoints...
