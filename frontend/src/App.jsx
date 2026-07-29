import React from 'react'
import HomePage from './pages/HomePage'
import ProductCardPage from './pages/ProductCardPage'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/product/:id' element={<ProductCardPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/cartdetails' element={<CartPage />} />
      <Route path='/checkout' element={<CheckoutPage />} />
    </Routes>
  )
}

export default App