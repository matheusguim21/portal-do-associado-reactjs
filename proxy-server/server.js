const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')

const app = express()

// Ativar CORS para o front-end
app.use(cors({ origin: 'http://127.0.0.1:3000', credentials: true }))

// Configurar o proxy
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://staging-gateway.socinpro.org.br', // URL do seu backend
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // Remove o prefixo /api ao redirecionar
    },
    secure: false, // Para aceitar certificados SSL autoassinados (se aplicável)
  }),
)

// Iniciar o servidor
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Servidor Proxy rodando em http://127.0.0.1:${PORT}`)
})
