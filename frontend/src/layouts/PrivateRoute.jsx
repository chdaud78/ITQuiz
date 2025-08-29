import { Navigate, Outlet } from 'react-router-dom'

import { token } from '@/api/token.js'

export default function PrivateRoute() {
  const isAuth = Boolean(token.get())
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}
