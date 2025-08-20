import { BrowserRouter, Route, Routes } from 'react-router'

import RootLayout from '@/layouts/RootLayout.jsx'
import { ROUTES } from '@/lib/routes.js'
import Home from '@/routes/Home.jsx'
import Mypage from '@/routes/Mypage.jsx'
import NotFound from '@/routes/NotFound.jsx'

const AppRouters = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.MYPAGE.ROOT} element={<Mypage />} />
      </Route>
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />}></Route>
    </Routes>
  </BrowserRouter>
)

export default AppRouters
