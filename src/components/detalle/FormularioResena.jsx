import { useState } from 'react'
import { crearResena } from '../../api/amicus.js'
import ErrorCampo from '../acceso/ErrorCampo.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import { validarResena } from '../acceso/validaciones.js'
import SelectorPuntaje from './SelectorPuntaje.jsx'

function FormularioResena({ servicioId, onCreada }) {
  const [puntaje, setPuntaje] = useState(0)
  const [comentario, setComentario] = useState('')
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)

  function cambiarPuntaje(valor) {
    setPuntaje(valor)
    setErrores((actuales) => ({ ...actuales, puntaje: '' }))
  }

  function cambiarComentario(evento) {
    setComentario(evento.target.value)
    setErrores((actuales) => ({ ...actuales, comentario: '' }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    const erroresCliente = validarResena({ puntaje, comentario })
    setErrores(erroresCliente)
    setErrorGeneral('')
    if (Object.keys(erroresCliente).length > 0) return

    setEnviando(true)
    try {
      await crearResena(servicioId, { puntaje, comentario: comentario.trim() || null })
      setPuntaje(0)
      setComentario('')
      onCreada()
    } catch (error) {
      setErrores(error.errores ?? {})
      setErrorGeneral(error.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="formulario-resena">
      <h3 className="h6 mb-2">Dejá tu reseña</h3>
      <MensajeError>{errorGeneral}</MensajeError>
      <div className="mb-2">
        <span id="puntaje-etiqueta" className="campo-etiqueta d-block mb-1">Tu puntaje</span>
        <SelectorPuntaje
          valor={puntaje}
          onChange={cambiarPuntaje}
          deshabilitado={enviando}
          etiquetadoPor="puntaje-etiqueta"
          describidoPor={errores.puntaje ? 'puntaje-error' : undefined}
        />
        <ErrorCampo id="puntaje-error">{errores.puntaje}</ErrorCampo>
      </div>
      <div className="campo">
        <label htmlFor="comentario" className="campo-etiqueta">Comentario (opcional)</label>
        <textarea
          id="comentario"
          name="comentario"
          className={`campo-input ${errores.comentario ? 'campo-input-error' : ''}`}
          rows={3}
          value={comentario}
          onChange={cambiarComentario}
          aria-invalid={errores.comentario ? 'true' : 'false'}
          aria-describedby={errores.comentario ? 'comentario-error' : undefined}
          disabled={enviando}
        />
        <ErrorCampo id="comentario-error">{errores.comentario}</ErrorCampo>
      </div>
      <button type="submit" className="btn-amicus" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Dejar reseña'}
      </button>
    </form>
  )
}

export default FormularioResena
