import { BrowserRouter, Route, Routes } from 'react-router'

import PrivateRoute from '@/layouts/PrivateRoute.jsx'
import PublicRoute from '@/layouts/PublicRoute.jsx'
import RootLayout from '@/layouts/RootLayout.jsx'
import { ROUTES } from '@/lib/routes.js'
import Login from '@/routes/auth/Login.jsx'
import Mypage from '@/routes/auth/Mypage.jsx'
import MyProfile from '@/routes/auth/MyProfile.jsx'
import Register from '@/routes/auth/Register.jsx'
import Home from '@/routes/Home.jsx'
import NotFound from '@/routes/NotFound.jsx'
import Quiz from '@/routes/quiz/Quiz.jsx'
import QuizResult from '@/routes/quiz/QuizResult.jsx'
import QuizList from '@/routes/quiz/QuizList.jsx'

const AppRouters = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route element={<PublicRoute />}>
          <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.AUTH.MYPAGE} element={<Mypage />} />
          <Route path={ROUTES.AUTH.MYPROFILE} element={<MyProfile />} />
          <Route path={ROUTES.QUIZ.LIST} element={<QuizList />} />
          <Route path={`${ROUTES.QUIZ.ROOT}/:sessionId`} element={<Quiz />} />
          <Route path={`${ROUTES.QUIZ.RESULT}/:sessionId`} element={<QuizResult />} />
        </Route>
      </Route>
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouters
