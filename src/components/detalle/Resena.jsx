import Estrellas from './Estrellas.jsx'
import { formatearFecha } from '../../utils/formato.js'

function Resena({ resena }) {
  return (
    <article className="tarjeta p-3">
      <div className="d-flex justify-content-between align-items-center gap-2">
        <p className="fw-semibold mb-0">{resena.autor}</p>
        <Estrellas puntaje={resena.puntaje} />
      </div>
      {resena.comentario && <p className="mt-2 mb-1">{resena.comentario}</p>}
      <p className="text-secundario small mb-0">{formatearFecha(resena.fecha)}</p>
    </article>
  )
}

export default Resena
