import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8500',
  timeout: 10000,
  withCredentials: true,
})

export default service
