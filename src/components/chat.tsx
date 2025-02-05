import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { Button } from './ui/button'
type ChatMessage = {
  role: 'user' | 'assistant'
  text: string
}

function getDiffChunk(newChunk: string, storedText: string): string {
  // Se o novo chunk começa com o texto já acumulado, retorne somente o restante.
  if (newChunk.startsWith(storedText)) {
    return newChunk.slice(storedText.length)
  }
  // Caso contrário, retorne o novo chunk inteiro.
  return newChunk
}

const Chat = () => {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [threadId, setThreadId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [controller, setController] = useState<AbortController | null>(null)

  // Restaura a Thread ID do localStorage
  useEffect(() => {
    const savedThreadId = localStorage.getItem('threadId')
    if (savedThreadId) {
      setThreadId(savedThreadId)
    }
  }, [])

  // Envia a mensagem do usuário
  const sendMessage = async () => {
    if (!prompt.trim()) return
    console.log('Prompt: ', prompt)

    setIsLoading(true)
    // Adiciona a mensagem do usuário como novo item
    setMessages((prev) => [...prev, { role: 'user', text: prompt }])
    const userPrompt = prompt
    setPrompt('')

    try {
      const newController = new AbortController()
      setController(newController)

      const response = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt, threadId }),
        signal: newController.signal,
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      // Variável para controlar se é o primeiro chunk da resposta do SocBot (para este turno)
      let isFirstChunk = true
      // Variável para armazenar o texto acumulado da resposta do SocBot neste turno
      let currentAssistantText = ''

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader!.read()
          if (done) {
            setIsLoading(false)
            break
          }

          // Decodifica o chunk (usando stream: true para que não corte caracteres)
          buffer += decoder.decode(value, { stream: true })

          // Enquanto houver um delimitador de evento SSE (dupla quebra de linha)
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
                // Tenta fazer o parse do JSON (se o backend enviar JSON)
                let delta = data
                try {
                  const parsedData = JSON.parse(data)
                  delta = parsedData.text
                } catch {
                  // Se não for JSON, utiliza o texto cru
                }

                // Calcula somente a parte nova do delta (diferença entre o novo delta e o que já acumulamos)
                const diff = getDiffChunk(delta, currentAssistantText)
                currentAssistantText += diff

                if (isFirstChunk) {
                  isFirstChunk = false
                  // Cria um novo item para a resposta do SocBot
                  setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', text: currentAssistantText },
                  ])
                } else {
                  // Atualiza o último item (concatenando os novos fragments)
                  setMessages((prev) => {
                    const newArr = [...prev]
                    newArr[newArr.length - 1].text = currentAssistantText

                    return newArr
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
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: `ERRO: ${(error as Error).message}` },
        ])
      }
      setIsLoading(false)
    }
  }

  // Cancela a requisição ao desmontar
  useEffect(() => {
    return () => {
      controller?.abort()
    }
  }, [controller])

  return (
    <div className="flex w-[80%] flex-col items-center gap-5 self-center rounded border bg-neutral-800 py-2">
      <h2 className="mb-3 text-center text-2xl font-semibold text-gray-200">
        Cadastro de Obras com IA
      </h2>

      <div className="custom-scrollbar flex max-h-[50vh] min-h-80 w-[calc(100%-10rem)] resize-none flex-col overflow-auto rounded-lg bg-neutral-700 p-3 text-neutral-200 drop-shadow-lg">
        {messages.length === 0
          ? 'Aguardando sua mensagem...'
          : messages.map((msg, i) =>
              msg.role === 'user' ? (
                <p key={i} className="mb-2 whitespace-pre-wrap">
                  Você: {msg.text}
                </p>
              ) : (
                <div key={i} className="mb-2">
                  <p className="font-bold">SocBot:</p>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ),
            )}
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
          {isLoading ? 'Enviando...' : <ArrowUp size={40} color={'white'} />}
        </button>
      </div>

      <>
        <Button
          onClick={() => {
            setThreadId(null)
            setPrompt('')
            setMessages([])
          }}
        >
          Nova Conversa
        </Button>
        <div className="mt-4 text-center text-sm text-neutral-400">
          ID da Conversa: {threadId}
        </div>
      </>
    </div>
  )
}

export default Chat
