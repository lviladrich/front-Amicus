import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CircleCheck } from 'lucide-react'
import { restablecerPassword } from '../../api/amicus.js'
import Campo from './Campo.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import { validarRestablecer } from './validaciones.js'

function FormularioRestablecer() {
  const [parametros] = useSearchParams()
  const token = parametros.get('token') ?? ''
  const [valores, setValores] = useState({ password: '', confirmacion: '' })
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [listo, setListo] = useState(false)

  function cambiar(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
    setErrores((actuales) => ({ ...actuales, [name]: '' }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    const erroresCliente = validarRestablecer(valores)
    setErrores(erroresCliente)
    setErrorGeneral('')
    if (Object.keys(erroresCliente).length > 0) return

    setEnviando(true)
    try {
      await restablecerPassword(token, valores.password)
      setListo(true)
    } catch (error) {
      setErrores(error.errores ?? {})
      setErrorGeneral(error.message)
    } finally {
      setEnviando(false)
    }
  }

  if (!token) {
    return (
      <>
        <h1 className="acceso-titulo">Link incompleto</h1>
        <p className="text-secundario">
          Este link no sirve para cambiar la contraseña. Abrí el link completo que te mandamos por mail o pedí uno nuevo.
        </p>
        <Link to="/recuperar" className="btn-amicus w-100 mt-3">Pedir un link nuevo</Link>
      </>
    )
  }

  if (listo) {
    return (
      <>
        <h1 className="acceso-titulo">Contraseña actualizada</h1>
        <div className="acceso-exito" role="status">
          <CircleCheck size={18} aria-hidden="true" />
          <span>Ya podés ingresar con tu contraseña nueva.</span>
        </div>
        <Link to="/login" className="btn-amicus w-100 mt-3">Ir a ingresar</Link>
      </>
    )
  }

  return (
    <>
      <h1 className="acceso-titulo">Crear contraseña nueva</h1>
      <p className="text-secundario">Elegí una contraseña de al menos 6 caracteres.</p>
      <form onSubmit={enviar} noValidate className="acceso-formulario">
        <MensajeError>{errorGeneral}</MensajeError>
        <Campo
          id="password"
          etiqueta="Contraseña nueva"
          type="password"
          autoComplete="new-password"
          value={valores.password}
          onChange={cambiar}
          error={errores.password}
        />
        <Campo
          id="confirmacion"
          etiqueta="Repetir contraseña"
          type="password"
          autoComplete="new-password"
          value={valores.confirmacion}
          onChange={cambiar}
          error={errores.confirmacion}
        />
        <button type="submit" className="btn-amicus w-100" disabled={enviando}>
          {enviando ? 'Guardando...' : 'Guardar contraseña'}
        </button>
      </form>
      <p className="acceso-cruce text-secundario">
        ¿El link venció? <Link to="/recuperar">Pedir uno nuevo</Link>
      </p>
    </>
  )
}

export default FormularioRestablecer
