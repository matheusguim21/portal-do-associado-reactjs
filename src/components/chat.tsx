import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const Chat = () => {
  const [prompt, setPrompt] = useState('')
  const [responses, setResponses] = useState<string[]>([]) // Alterado para array
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
    setResponses((prev) => [...prev, `Você: ${prompt}`]) // Adiciona mensagem do usuário
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
        let isFirstChunk = true // Controla a primeira parte da resposta do bot

        while (true) {
          const { done, value } = await reader!.read()

          if (done) {
            setIsLoading(false)
            break
          }

          buffer += decoder.decode(value, { stream: true })

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
                data += line.replace('data: ', '')
              }
            })

            try {
              if (eventType === 'threadId') {
                setThreadId(data)
                localStorage.setItem('threadId', data)
              } else if (eventType === 'message') {
                try {
                  const parsedData = JSON.parse(data)
                  const newText = parsedData.text

                  setResponses((prev) => {
                    if (isFirstChunk) {
                      isFirstChunk = false
                      return [...prev, `SocBot: ${newText}`] // Nova mensagem do bot
                    } else {
                      const newResponses = [...prev]
                      newResponses[newResponses.length - 1] += newText // Atualiza última mensagem
                      return newResponses
                    }
                  })
                } catch {
                  setResponses((prev) => {
                    if (isFirstChunk) {
                      isFirstChunk = false
                      return [...prev, `SocBot: ${data}`]
                    } else {
                      const newResponses = [...prev]
                      newResponses[newResponses.length - 1] += data
                      return newResponses
                    }
                  })
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
        setResponses((prev) => [...prev, `ERRO: ${(error as Error).message}`]) // Nova mensagem de erro
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

      <div className="flex min-h-80 w-[calc(100%-10rem)] resize-y flex-col rounded-lg bg-neutral-700 p-3 text-neutral-200 drop-shadow-lg">
        {responses.length === 0
          ? 'Aguardando sua mensagem...'
          : responses.map((text, index) => (
              <p key={index} className="mb-2 whitespace-pre-wrap">
                {text}
              </p> // Cada mensagem em um <p>
            ))}
      </div>

      <div className="mb-4 flex min-h-32 w-[90%] resize-y flex-col gap-4 rounded-3xl bg-neutral-700 p-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
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
        <div className="mt-4 text-center text-sm text-neutral-400">
          ID da Conversa: {threadId}
        </div>
      )}
    </div>
  )
}

export default Chat
