import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio.jsx'
import DetalleServicio from './pages/DetalleServicio.jsx'

function App() {
  return (
    <BrowserRouter>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios/:id" element={<DetalleServicio />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
