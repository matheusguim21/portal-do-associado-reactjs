import { ArrowUp } from 'lucide-react'
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
                  setResponse((prev) => prev + ' ' + data)
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
    <div className="flex w-[80%] flex-col items-center gap-5 self-center rounded border bg-neutral-800 py-6">
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-200">
        Cadastro de Obras com IA
      </h2>

      <div className="flex min-h-80 w-[calc(100%-10rem)] resize-y rounded-lg bg-neutral-700 p-3 text-neutral-200 drop-shadow-lg">
        {response || 'Aguardando sua mensagem...'}
      </div>

      <div className="mb-4 flex min-h-32 w-[90%] resize-y flex-col gap-4 rounded-3xl bg-neutral-700 p-4">
        <textarea
          value={prompt}
          onChange={(e) => {
            console.log(e.target.value)

            setPrompt(e.target.value)
          }}
          placeholder="Digite sua mensagem..."
          className="resize-none text-neutral-100 outline-none dark:bg-transparent dark:focus:border-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
        />

        <button
          onClick={sendMessage}
          disabled={isLoading || prompt === ''}
          className="self-end rounded-full bg-neutral-600 shadow-lg transition-shadow hover:shadow-2xl disabled:bg-neutral-600"
        >
          {isLoading ? (
            'Enviando...'
          ) : (
            <ArrowUp size={40} color={prompt === '' ? 'gray' : 'white'} />
          )}
        </button>
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
