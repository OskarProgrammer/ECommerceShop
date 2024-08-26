
//import bootstrap
import 'bootstrap/dist/css/bootstrap.css'

import './App.css'

//import react router dom components
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

//importring layouts
import { HomeLayout, homeLayoutLoader } from './layouts/HomeLayout'

//importing pages
import { ErrorPage } from './pages/ErrorPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout/>} errorElement={<ErrorPage/>} loader={homeLayoutLoader}> 
      <Route index element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage />} />
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
