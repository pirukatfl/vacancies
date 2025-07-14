import axios from "axios";

const PUBLIC_URLS = ['/login']


console.log('env', import.meta.env)
const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  }
})

axiosConfig.interceptors.request.use((config) => {
  const isAbsoluteUrl = config.url?.startsWith('http://') || config.url?.startsWith('https://')
  const isPublic = isAbsoluteUrl ? false : PUBLIC_URLS.includes(config.url || '')

  if (!isPublic) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, (error) => {
  return Promise.reject(error)
})


export default axiosConfig