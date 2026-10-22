import { useState } from 'react'
import { Link } from 'react-router-dom'
import { actualizarCupos, darDeBajaServicio } from '../../api/amicus.js'
import { formatearPrecio } from '../../utils/formato.js'
import ModalConfirmacion from '../comunes/ModalConfirmacion.jsx'
import MensajeError from '../comunes/MensajeError.jsx'

function TarjetaMiServicio({ servicio, onCambioCupos, onBaja }) {
  const [cupos, setCupos] = useState(servicio.cuposDisponibles)
  const [guardandoCupos, setGuardandoCupos] = useState(false)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [dandoBaja, setDandoBaja] = useState(false)
  const [error, setError] = useState('')

  const cambiaronLosCupos = cupos !== servicio.cuposDisponibles

  async function guardarCupos() {
    setGuardandoCupos(true)
    setError('')
    try {
      const actualizado = await actualizarCupos(servicio.id, cupos)
      onCambioCupos(actualizado)
    } catch (fallo) {
      setError(fallo.message)
      setCupos(servicio.cuposDisponibles)
    } finally {
      setGuardandoCupos(false)
    }
  }

  async function confirmarBaja() {
    setDandoBaja(true)
    setError('')
    try {
      await darDeBajaServicio(servicio.id)
      onBaja(servicio.id)
    } catch (fallo) {
      setError(fallo.message)
      setDandoBaja(false)
    }
  }

  return (
    <li className="tarjeta mi-servicio-item">
      <div className="mi-servicio-datos">
        <span className="etiqueta align-self-start">{servicio.categoria}</span>
        <p className="fw-semibold mb-0">{servicio.titulo}</p>
        <p className="precio mb-0">{formatearPrecio(servicio.precio)}</p>
      </div>

      <div className="mi-servicio-cupos">
        <label htmlFor={`cupos-${servicio.id}`} className="text-secundario small d-block mb-1">Cupos</label>
        <div className="d-flex align-items-center gap-2">
          <div className="stepper">
            <button
              type="button"
              aria-label="Quitar un cupo"
              onClick={() => setCupos((actual) => Math.max(0, actual - 1))}
              disabled={guardandoCupos || cupos <= 0}
            >
              −
            </button>
            <output id={`cupos-${servicio.id}`}>{cupos}</output>
            <button
              type="button"
              aria-label="Agregar un cupo"
              onClick={() => setCupos((actual) => actual + 1)}
              disabled={guardandoCupos}
            >
              +
            </button>
          </div>
          {cambiaronLosCupos && (
            <button type="button" className="btn-texto" onClick={guardarCupos} disabled={guardandoCupos}>
              {guardandoCupos ? 'Guardando...' : 'Guardar'}
            </button>
          )}
        </div>
      </div>

      <div className="mi-servicio-acciones">
        <Link to={`/mis-servicios/${servicio.id}/editar`} className="btn-texto">Editar</Link>
        <button type="button" className="btn-texto mi-servicio-baja" onClick={() => setModalAbierto(true)}>
          Dar de baja
        </button>
      </div>

      <MensajeError>{error}</MensajeError>

      {modalAbierto && (
        <ModalConfirmacion
          titulo="¿Dar de baja este servicio?"
          textoConfirmar="Sí, dar de baja"
          confirmando={dandoBaja}
          onConfirmar={confirmarBaja}
          onCancelar={() => setModalAbierto(false)}
        >
          <p className="mb-0">Ya no va a aparecer en el catálogo. Las órdenes que ya lo incluyen no se ven afectadas.</p>
        </ModalConfirmacion>
      )}
    </li>
  )
}

export default TarjetaMiServicio
