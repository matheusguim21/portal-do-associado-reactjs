import { useEffect, useState } from 'react'

const Chat = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [threadId, setThreadId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [controller, setController] = useState<AbortController | null>(null)

  // Restaurar Thread ID do localStorage
  useEffect(() => {
    const savedThreadId = localStorage.getItem('threadId')
    if (savedThreadId) {
      setThreadId(savedThreadId)
    }
  }, [])

  // Função para enviar mensagem
  const sendMessage = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    setResponse((prev) => prev + `\nVocê: ${prompt}`)
    setPrompt('')

    try {
      const newController = new AbortController()
      setController(newController)

      const response = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, threadId }),
        signal: newController.signal,
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      let buffer = ''

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader!.read()

          if (done) {
            setIsLoading(false)
            break
          }

          buffer += decoder.decode(value, { stream: true })

          // Processar todos os eventos completos no buffer
          while (buffer.includes('\n\n')) {
            const eventIndex = buffer.indexOf('\n\n')
            const eventData = buffer.slice(0, eventIndex)
            buffer = buffer.slice(eventIndex + 2)

            let eventType = 'message'
            let data = ''

            eventData.split('\n').forEach((line) => {
              if (line.startsWith('event: ')) {
                eventType = line.replace('event: ', '').trim()
              } else if (line.startsWith('data: ')) {
                data += line.replace('data: ', '').trim()
              }
            })

            try {
              if (eventType === 'threadId') {
                // ✅ Se for uma Thread ID, salvar diretamente
                setThreadId(data)
                localStorage.setItem('threadId', data)
              } else if (eventType === 'message') {
                // ✅ Se for JSON válido, fazemos parse
                try {
                  const parsedData = JSON.parse(data)
                  setResponse((prev) => prev + parsedData.text)
                } catch {
                  // ✅ Se for texto puro, apenas exibir
                  setResponse((prev) => prev + '\n' + data)
                }
              } else {
                console.warn('Evento desconhecido:', eventType)
              }
            } catch (e) {
              console.error('Erro ao processar evento:', e)
            }
          }
        }
      }

      processStream()
      setIsLoading(false)
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Erro:', error)
        setResponse((prev) => prev + `\nERRO: ${(error as Error).message}`)
      }
      setIsLoading(false)
    }
  }

  // Cancelar requisição ao desmontar
  useEffect(() => {
    return () => {
      controller?.abort()
    }
  }, [controller])

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '1.5rem',
        }}
      >
        Chat com Assistente IA
      </h2>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Digite sua mensagem..."
          style={{
            flex: 1,
            padding: '0.8rem',
            borderRadius: '4px',
            border: '1px solid #ddd',
            minHeight: '100px',
            resize: 'vertical',
            fontSize: '1rem',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
        />

        <button
          onClick={sendMessage}
          disabled={isLoading}
          style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: isLoading ? '#999' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            alignSelf: 'flex-start',
            transition: 'background-color 0.2s',
          }}
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>

      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          padding: '1rem',
          minHeight: '300px',
          maxHeight: '60vh',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        {response || 'Aguardando sua mensagem...'}
      </div>

      {threadId && (
        <div
          style={{
            marginTop: '1rem',
            fontSize: '0.9rem',
            color: '#666',
            textAlign: 'center',
          }}
        >
          ID da Conversa: {threadId}
        </div>
      )}
    </div>
  )
}

export default Chat
