import { Star } from 'lucide-react'
import { iniciales } from '../../utils/formato.js'

function TarjetaProfesional({ profesional, promedio, cantidadResenas }) {
  return (
    <div className="d-flex align-items-center gap-3 py-3 profesional">
      <span className="avatar avatar-grande" aria-hidden="true">{iniciales(profesional)}</span>
      <div>
        <p className="fw-semibold mb-0">{profesional.nombre} {profesional.apellido}</p>
        <p className="text-secundario small mb-0 d-flex align-items-center gap-1">
          {cantidadResenas > 0 ? (
            <>
              <Star size={14} fill="currentColor" className="estrellas" aria-hidden="true" />
              {promedio.toLocaleString('es-AR', { maximumFractionDigits: 1 })} · {cantidadResenas === 1 ? '1 reseña' : `${cantidadResenas} reseñas`}
            </>
          ) : 'Todavía sin reseñas'}
        </p>
      </div>
    </div>
  )
}

export default TarjetaProfesional
