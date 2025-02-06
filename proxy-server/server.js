const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')

const app = express()

// Configuração do CORS para permitir requisições do frontend
app.use(
  cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
)

// Proxy para consultas no banco via /api
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://staging-gateway.socinpro.org.br',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // Remove o prefixo /api ao encaminhar
    },
    secure: false,
  }),
)

// Proxy para acesso ao chatbot via /chat
// Observe que NÃO há pathRewrite, preservando o /chat na rota de destino
app.use(
  '/chat',
  createProxyMiddleware({
    target: 'http://127.0.0.1:3333', // Backend do chatbot
    changeOrigin: true,
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
      // Configura cabeçalhos se necessário
      proxyReq.setHeader('Access-Control-Allow-Origin', '*')
      proxyReq.setHeader('Access-Control-Allow-Credentials', 'true')
    },
  }),
)

// Corrigir requisições OPTIONS (Preflight)
app.options('*', cors())

// Iniciar o servidor na porta desejada
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Servidor Proxy rodando em http://127.0.0.1:${PORT}`)
})
