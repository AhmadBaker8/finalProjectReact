
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Register from './pages/user/login/Register'
import Login from './pages/user/login/Login'
import DashboardLayout from './layouts/DashboardLayout'
import { ToastContainer } from 'react-toastify'
import UserLayout from './layouts/UserLayout'
import Home from './pages/user/home/Home'
import Checkout from './pages/user/checkout/Checkout'
import Shop from './pages/user/shop/Shop'
import Contact from './pages/user/contact/Contact'
import Categories from './hooks/Categories'
import Products from './hooks/Products'
import Cart from './pages/user/cart/Cart'
import ProductsDetails from './pages/user/productDetails/ProductsDetails'
import Wishlist from './pages/user/wishlist/Wishlist'
import CartContextProvider from './components/user/context/CartContext'
import Profile from './pages/profile/Profile'
import UserContextProvider from './components/user/context/UserContext'
import GoToTop from './components/user/custom/GoToTop'
import ScrollToTop from './components/user/custom/ScrollToTop'


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
      element:
      <UserContextProvider>
      <CartContextProvider>
      <UserLayout/>
      <ScrollToTop/>
      </CartContextProvider>
      </UserContextProvider>,
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
        },
        {
          path:"/cart",
          element:<Cart/>
        },
        {
          path:"/products-details/:id",
          element:<ProductsDetails/>
        },
        {
          path:"/wishlist",
          element:<Wishlist/>
        },
        {
          path:"/profile",
          element:<Profile/>
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
      <GoToTop/>
      
    </>
  )
}

export default App
