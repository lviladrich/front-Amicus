import { Link } from 'react-router-dom'
import { House } from 'lucide-react'

function Logo({ claro = false }) {
  return (
    <Link to="/" className={`logo ${claro ? 'logo-claro' : ''}`} aria-label="Amicus, ir al inicio">
      <span className="logo-icono"><House size={16} aria-hidden="true" /></span>
      Amicus
    </Link>
  )
}

export default Logo
