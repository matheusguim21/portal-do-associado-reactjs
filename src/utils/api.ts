import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://staging-gateway.socinpro.org.br', // URL do proxy
})
