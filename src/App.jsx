import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CustomNavbar from './components/user/navbar/CustomNavbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Register from './pages/user/register/Register'
import Login from './pages/user/login/Login'
import DashboardLayout from './layouts/DashboardLayout'
import { ToastContainer } from 'react-toastify'
import UserLayout from './layouts/UserLayout'
import Home from './pages/user/home/Home'
import Categories from './pages/user/categories/Categories'
import Products from './pages/user/products/Products'
import Checkout from './pages/user/checkout/Checkout'
import Shop from './pages/user/shop/Shop'
import Contact from './pages/user/contact/Contact'


function App() {
  
  const router = createBrowserRouter([
    {
      path:"/auth",
      element:<AuthLayout/>,
      children:[
        {
          path:"register",
          element:<Register/>
        },
        {
          path:"login",
          element:<Login/>
        }
      ]
    },
    {
      path:"/",
      element:<UserLayout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/categories",
          element:<Categories/>
        },
        {
          path:"/products",
          element:<Products/>
        },
        {
          path:"/checkout",
          element:<Checkout/>
        },
        {
          path:"/shop",
          element:<Shop/>
        },
        {
          path:"/contact",
          element:<Contact/>
        }
      ]
    },
    {
      path:"dashboard",
      element:<DashboardLayout/>
    },
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}/>
      
    </>
  )
}

export default App
