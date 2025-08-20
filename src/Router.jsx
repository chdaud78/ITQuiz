import { BrowserRouter, Route, Routes } from 'react-router'

import RootLayout from '@/layouts/RootLayout.jsx'
import { ROUTES } from '@/lib/routes.js'
import Home from '@/routes/Home.jsx'

const AppRouters = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default AppRouters
