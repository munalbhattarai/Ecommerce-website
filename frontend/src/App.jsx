import React from 'react'
import HomePage from './pages/HomePage'
import ProductCardPage from './pages/ProductCardPage'
import { Routes , Route } from 'react-router-dom'


const App = () => {
  return (
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/product/:id' element={<ProductCardPage/>}/>
    </Routes>
  )
}

export default App