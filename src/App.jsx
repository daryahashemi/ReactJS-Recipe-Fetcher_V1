import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import RootLayout from './Layouts/RootLayout'
import HomePage from './Pages/HomePage'
import { AnimatePresence } from 'framer-motion'
import Recipe from './Pages/Recipe'

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <AnimatePresence mode='wait'>
            <Routes>
              <Route path='/' element={<RootLayout />}>
                  <Route path='recipe/:id' element={<Recipe />} />
                  <Route path='/' element={<HomePage />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </div>
  )
}

export default App
