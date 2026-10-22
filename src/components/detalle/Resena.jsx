import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import Estrellas from './Estrellas.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import { formatearFecha } from '../../utils/formato.js'

// onBorrar es opcional: solo lo manda ListaResenas cuando la reseña es del usuario logueado
function Resena({ resena, onBorrar }) {
  const [borrando, setBorrando] = useState(false)
  const [error, setError] = useState('')

  function borrar() {
    setBorrando(true)
    setError('')
    onBorrar().catch((fallo) => {
      setError(fallo.message)
      setBorrando(false)
    })
  }

  return (
    <article className="tarjeta p-3" aria-busy={borrando}>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <p className="fw-semibold mb-0">{resena.autor}</p>
        <div className="d-flex align-items-center gap-2">
          <Estrellas puntaje={resena.puntaje} />
          {onBorrar && (
            <button
              type="button"
              className="btn-texto resena-borrar"
              onClick={borrar}
              disabled={borrando}
              aria-label="Borrar tu reseña"
            >
              <Trash2 size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      {resena.comentario && <p className="mt-2 mb-1">{resena.comentario}</p>}
      <p className="text-secundario small mb-0">{formatearFecha(resena.fecha)}</p>
      <MensajeError>{error}</MensajeError>
    </article>
  )
}

export default Resena
