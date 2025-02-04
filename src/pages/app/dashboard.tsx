import Chat from '@components/chat'
import { Helmet } from 'react-helmet-async'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div>
        <h1> Dashboard</h1>
        <Chat />
      </div>
    </>
  )
}
