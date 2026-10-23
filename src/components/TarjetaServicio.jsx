import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { estiloCategoria } from '../utils/categorias.js'
import { formatearPrecio, textoCupos } from '../utils/formato.js'

// Cuantas zonas se nombran en la tarjeta; el resto se resume como "+N"
const ZONAS_VISIBLES = 2

function TarjetaServicio({ servicio }) {
  const { fondo, Icono } = estiloCategoria(servicio.categoria)
  const zonas = servicio.zonas ?? []
  const zonasOcultas = zonas.length - ZONAS_VISIBLES

  return (
    <Link to={`/servicios/${servicio.id}`} className="tarjeta tarjeta-servicio">
      <div className="tarjeta-servicio-imagen" style={{ background: fondo }}>
        {servicio.imagenPortada
          ? <img src={servicio.imagenPortada} alt="" loading="lazy" />
          : <Icono size={40} strokeWidth={1.75} aria-hidden="true" />}
      </div>
      <div className="tarjeta-servicio-cuerpo">
        <span className="etiqueta align-self-start">{servicio.categoria}</span>
        <h3 className="h6 mb-0">{servicio.titulo}</h3>
        {servicio.profesional && (
          <p className="tarjeta-servicio-profesional">{servicio.profesional}</p>
        )}
        {zonas.length > 0 && (
          <p className="tarjeta-servicio-dato">
            <MapPin size={14} aria-hidden="true" />
            <span>
              {zonas.slice(0, ZONAS_VISIBLES).join(', ')}
              {zonasOcultas > 0 && ` y ${zonasOcultas} más`}
            </span>
          </p>
        )}
        <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
          <span className="precio fs-5">{formatearPrecio(servicio.precio)}</span>
          {servicio.disponible
            ? <span className="etiqueta-cupos">{textoCupos(servicio.cuposDisponibles)}</span>
            : <span className="text-secundario small">Sin cupos</span>}
        </div>
      </div>
    </Link>
  )
}

export default TarjetaServicio
