import Chat from '@components/chat'
import { Helmet } from 'react-helmet-async'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col items-center">
        <h1 className="self-start text-xl"> Dashboard</h1>
        <Chat />
      </div>
    </>
  )
}
