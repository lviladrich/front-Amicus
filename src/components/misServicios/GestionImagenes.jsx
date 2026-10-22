import { useState } from 'react'
import { X } from 'lucide-react'
import { agregarImagenServicio, quitarImagenServicio } from '../../api/amicus.js'
import { validarImagen } from '../acceso/validaciones.js'
import ErrorCampo from '../acceso/ErrorCampo.jsx'
import MensajeError from '../comunes/MensajeError.jsx'

// servicio es el ServicioDetalleResponse actual; onCambio recibe el servicio ya actualizado del back
function GestionImagenes({ servicio, onCambio }) {
  const [url, setUrl] = useState('')
  const [errorCampo, setErrorCampo] = useState('')
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [quitando, setQuitando] = useState(null)

  async function agregar(evento) {
    evento.preventDefault()
    const erroresCliente = validarImagen({ url })
    setErrorCampo(erroresCliente.url ?? '')
    setErrorGeneral('')
    if (erroresCliente.url) return

    setEnviando(true)
    try {
      const actualizado = await agregarImagenServicio(servicio.id, {
        url: url.trim(),
        ordenVisualizacion: servicio.imagenes.length,
      })
      onCambio(actualizado)
      setUrl('')
    } catch (fallo) {
      setErrorGeneral(fallo.message)
    } finally {
      setEnviando(false)
    }
  }

  async function quitar(imagenId) {
    setQuitando(imagenId)
    setErrorGeneral('')
    try {
      await quitarImagenServicio(servicio.id, imagenId)
      onCambio({ ...servicio, imagenes: servicio.imagenes.filter((imagen) => imagen.id !== imagenId) })
    } catch (fallo) {
      setErrorGeneral(fallo.message)
    } finally {
      setQuitando(null)
    }
  }

  return (
    <div className="gestion-imagenes">
      <h3 className="h6 mb-2">Fotos</h3>
      <MensajeError>{errorGeneral}</MensajeError>
      {servicio.imagenes.length === 0 && <p className="text-secundario small">Todavía no agregaste ninguna foto.</p>}
      {servicio.imagenes.length > 0 && (
        <div className="galeria-miniaturas gestion-imagenes-lista">
          {servicio.imagenes.map((imagen) => (
            <div key={imagen.id} className="miniatura gestion-imagen-item">
              <img src={imagen.url} alt="" loading="lazy" />
              <button
                type="button"
                className="gestion-imagen-quitar"
                onClick={() => quitar(imagen.id)}
                disabled={quitando === imagen.id}
                aria-label="Quitar esta foto"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={agregar} className="d-flex gap-2 align-items-start mt-2">
        <div className="flex-grow-1">
          <label htmlFor="url-imagen" className="visually-hidden">URL de la foto</label>
          <input
            id="url-imagen"
            type="url"
            className={`campo-input ${errorCampo ? 'campo-input-error' : ''}`}
            placeholder="https://..."
            value={url}
            onChange={(evento) => { setUrl(evento.target.value); setErrorCampo('') }}
            disabled={enviando}
          />
          <ErrorCampo id="url-imagen-error">{errorCampo}</ErrorCampo>
        </div>
        <button type="submit" className="btn-amicus btn-amicus-borde" disabled={enviando}>
          {enviando ? 'Agregando...' : 'Agregar'}
        </button>
      </form>
    </div>
  )
}

export default GestionImagenes
