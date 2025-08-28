import { BrowserRouter, Route, Routes } from 'react-router'

import RootLayout from '@/layouts/RootLayout.jsx'
import { ROUTES } from '@/lib/routes.js'
import AuthLayout from '@/routes/auth/AuthLayout.jsx'
import Login from '@/routes/auth/Login.jsx'
import Mypage from '@/routes/auth/Mypage.jsx'
import Register from '@/routes/auth/Register.jsx'
import Home from '@/routes/Home.jsx'
import NotFound from '@/routes/NotFound.jsx'
import Quiz from '@/routes/quiz/Quiz.jsx'
import QuizResult from '@/routes/quiz/QuizResult.jsx'

const AppRouters = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
          <Route path={ROUTES.AUTH.MYPAGE} element={<Mypage />} />
        </Route>
        <Route index element={<Home />} />
        <Route path={`${ROUTES.QUIZ.ROOT}/:sessionId`} element={<Quiz />} />
        <Route path={`${ROUTES.QUIZ.RESULT}/:sessionId`} element={<QuizResult />} />
      </Route>
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouters
