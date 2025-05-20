import axios from 'axios'

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000
})

export function useApi() {
  return apiInstance
}