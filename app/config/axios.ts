import axios from 'axios'

export function useApi() {
  const config = useRuntimeConfig()

  return axios.create({
    baseURL: config.public.apiBaseUrl as string,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
