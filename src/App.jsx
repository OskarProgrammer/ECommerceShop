
//import bootstrap
import 'bootstrap/dist/css/bootstrap.css'

import './App.css'

//import react router dom components
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

//importring layouts
import { HomeLayout, homeLayoutLoader } from './layouts/HomeLayout'

//importing pages
import { ErrorPage } from './pages/ErrorPage'
import { HomePage, homePageAction, homePageLoader } from './pages/HomePage'
import { LoginPage, loginPageAction } from './pages/LoginPage'
import { LogOutPage , logOutLoader} from './pages/LogOutPage'
import { Basket, basketLoader } from './pages/Basket'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout/>} errorElement={<ErrorPage/>} loader={homeLayoutLoader}> 
      <Route index element={<HomePage/>} loader={homePageLoader} action={homePageAction}/>
      <Route path="/login" element={<LoginPage />} action={loginPageAction}/>
      <Route path="/logOut" element={<LogOutPage/>} loader={logOutLoader}/>
      <Route path="/basket/:id" element={<Basket/>} loader={basketLoader}/>
    </Route>
  )
)


function App() {


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
