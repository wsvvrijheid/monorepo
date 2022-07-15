import axios from 'axios'

export const fetcher = (token = process.env["NX_API_TOKEN"]) => {
  // Create instance
  const instance = axios.create({
    baseURL: process.env["NX_API_URL"],
  })

  // Set the AUTH token for any request
  instance.interceptors.request.use((config) => ({
    headers: {
        ...config?.headers,
        Authorization: token ? `Bearer ${token}` : '',
    },
    ...config
  }))

  return instance
}
