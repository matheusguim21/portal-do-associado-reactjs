import { Outlet } from 'react-router-dom'

import { Header } from '@components/header'

export function Applayout() {
  return (
    <div className="flex- min-h-screen antialiased">
      <Header />

      <div className="flex flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
