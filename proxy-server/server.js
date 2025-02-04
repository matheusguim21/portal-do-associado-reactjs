const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')

const app = express()

app.use(
  cors({
    origin: 'http://127.0.0.1:3000', // Permite requisições do frontend
    credentials: true, // Permite envio de cookies e autenticação
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  }),
)
// Configurar o proxy
// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'https://staging-gateway.socinpro.org.br', // URL do seu backend
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api': '', // Remove o prefixo /api ao redirecionar
//     },
//     secure: false, // Para aceitar certificados SSL autoassinados (se aplicável)
//   }),
// )

// ✅ Corrigir requisições OPTIONS (Preflight)
app.options('*', cors())

// ✅ Configurar o proxy corretamente
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://127.0.0.1:3333', // URL do backend
    changeOrigin: true,
    pathRewrite: { '^/api': '' }, // Remove /api ao encaminhar
    secure: false, // Para aceitar certificados SSL autoassinados
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Access-Control-Allow-Origin', '*')
      proxyReq.setHeader('Access-Control-Allow-Credentials', 'true')
    },
  }),
)

// Iniciar o servidor
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Servidor Proxy rodando em http://127.0.0.1:${PORT}`)
})
