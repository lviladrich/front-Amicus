import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { iniciales } from '../../utils/formato.js'

function TarjetaProfesional({ profesional, promedio, cantidadResenas }) {
  return (
    <div className="d-flex align-items-center gap-3 py-3 profesional">
      <span className="avatar avatar-grande" aria-hidden="true">{iniciales(profesional)}</span>
      <div>
        <p className="fw-semibold mb-0">
          {/* El nombre viaja en el state para que el perfil lo muestre sin esperar al listado */}
          <Link
            to={`/profesionales/${profesional.id}`}
            state={{ nombre: `${profesional.nombre} ${profesional.apellido}` }}
            className="profesional-enlace"
          >
            {profesional.nombre} {profesional.apellido}
          </Link>
        </p>
        <p className="text-secundario small mb-0 d-flex align-items-center gap-1">
          {cantidadResenas > 0 ? (
            <>
              <Star size={14} fill="currentColor" className="estrellas" aria-hidden="true" />
              {promedio.toLocaleString('es-AR', { maximumFractionDigits: 1 })} · {cantidadResenas === 1 ? '1 reseña' : `${cantidadResenas} reseñas`}
            </>
          ) : 'Todavía sin reseñas'}
          {' · '}
          <Link to={`/profesionales/${profesional.id}`} state={{ nombre: `${profesional.nombre} ${profesional.apellido}` }}>
            Ver perfil
          </Link>
        </p>
      </div>
    </div>
  )
}

export default TarjetaProfesional
