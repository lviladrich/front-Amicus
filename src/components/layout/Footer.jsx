import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

function Footer() {
  return (
    <footer className="footer">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 py-4">
        <Logo claro />
        {/* TODO (ver docs/PENDIENTES.md): paginas de Ayuda y Terminos */}
        <nav className="d-flex gap-3" aria-label="Pie de pagina">
          <Link to="/">Servicios</Link>
          <span>Ayuda</span>
          <span>Términos</span>
        </nav>
        <small>© 2026 Amicus. Servicios para el hogar.</small>
      </div>
    </footer>
  )
}

export default Footer
