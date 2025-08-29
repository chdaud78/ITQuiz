import { Navigate, Outlet } from 'react-router-dom'

import { token } from '@/api/token.js'

export default function PublicRoute() {
  const isAuth = Boolean(token.get())

  return isAuth ? <Navigate to="/" replace /> : <Outlet />
}
