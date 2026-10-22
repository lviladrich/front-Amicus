import { Link } from 'react-router-dom'
import { formatearFecha, formatearPrecio } from '../../utils/formato.js'

function TarjetaOrden({ orden }) {
  const confirmada = orden.estado === 'CONFIRMADA'
  return (
    <li className="tarjeta orden-item">
      <div className="orden-item-datos">
        <p className="fw-semibold mb-0">Orden #{orden.id}</p>
        <p className="text-secundario small mb-0">{formatearFecha(orden.fecha)}</p>
      </div>
      <span className={`etiqueta ${confirmada ? '' : 'etiqueta-cancelada'}`}>
        {confirmada ? 'Confirmada' : 'Cancelada'}
      </span>
      <span className="precio orden-item-total">{formatearPrecio(orden.total)}</span>
      <Link to={`/ordenes/${orden.id}`} className="btn-texto">Ver detalle</Link>
    </li>
  )
}

export default TarjetaOrden
