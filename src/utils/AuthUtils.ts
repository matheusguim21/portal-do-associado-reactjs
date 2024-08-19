// Função para gerar uma string aleatória segura
function generateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// Função para gerar codeVerifier e codeChallenge
export async function generateCodeChallenge(): Promise<{
  codeVerifier: string
  codeChallenge: string
}> {
  const codeVerifier = generateRandomString(128) // Gera um codeVerifier

  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashBase64 = btoa(
    String.fromCharCode.apply(null, hashArray as unknown as number[]),
  )

  const codeChallenge = hashBase64
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
  return { codeVerifier, codeChallenge }
}

// Função para gerar o state
export function generateState(): string {
  return generateRandomString(64) // Gera um state com 64 caracteres
}
