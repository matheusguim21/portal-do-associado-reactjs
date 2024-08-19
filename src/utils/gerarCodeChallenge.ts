import { Buffer } from 'buffer'
import { randomBytes, subtle } from 'crypto'

// Função para converter um ArrayBuffer para base64 URL-safe
const encodeToBase64UrlSafe = (buffer: Uint8Array): string => {
  const base64 = Buffer.from(buffer).toString('base64')
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

// Função para gerar um code_verifier
const generateCodeVerifier = async (): Promise<string> => {
  const randomBytesArray = randomBytes(32)
  return encodeToBase64UrlSafe(randomBytesArray)
}

// Função para gerar um code_challenge a partir do code_verifier
const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const hashBuffer = await subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashBase64 = btoa(
    String.fromCharCode.apply(null, hashArray as unknown as number[]),
  )
  return hashBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

// Exemplo de uso
export const generatePKCECodes = async (): Promise<{
  codeVerifier: string
  codeChallenge: string
}> => {
  const codeVerifier = await generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)
  console.log('Code Verifier:', codeVerifier)
  console.log('Code Challenge:', codeChallenge)
  return { codeVerifier, codeChallenge }
}

generatePKCECodes()
