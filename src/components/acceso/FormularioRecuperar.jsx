import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MailCheck } from 'lucide-react'
import { solicitarRecuperacion } from '../../api/amicus.js'
import Campo from './Campo.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import { validarRecuperacion } from './validaciones.js'

function FormularioRecuperar() {
  const [email, setEmail] = useState('')
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  function cambiar(evento) {
    setEmail(evento.target.value)
    setErrores({})
  }

  async function enviar(evento) {
    evento.preventDefault()
    const erroresCliente = validarRecuperacion({ email })
    setErrores(erroresCliente)
    setErrorGeneral('')
    if (Object.keys(erroresCliente).length > 0) return

    setEnviando(true)
    try {
      await solicitarRecuperacion(email.trim())
      setEnviado(true)
    } catch (error) {
      setErrores(error.errores ?? {})
      setErrorGeneral(error.message)
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <>
        <h1 className="acceso-titulo">Revisá tu correo</h1>
        <div className="acceso-exito" role="status">
          <MailCheck size={18} aria-hidden="true" />
          <span>
            Si <strong>{email.trim()}</strong> tiene una cuenta en Amicus, te mandamos un link para crear una
            contraseña nueva. Puede tardar unos minutos; fijate también en la carpeta de spam.
          </span>
        </div>
        <p className="acceso-cruce text-secundario">
          ¿No te llegó?{' '}
          <button type="button" className="btn-texto" onClick={() => setEnviado(false)}>Probar de nuevo</button>
        </p>
        <p className="acceso-cruce text-secundario">
          <Link to="/login">Volver a ingresar</Link>
        </p>
      </>
    )
  }

  return (
    <>
      <h1 className="acceso-titulo">Recuperar contraseña</h1>
      <p className="text-secundario">Ingresá el email de tu cuenta y te mandamos un link para crear una contraseña nueva.</p>
      <form onSubmit={enviar} noValidate className="acceso-formulario">
        <MensajeError>{errorGeneral}</MensajeError>
        <Campo
          id="email"
          etiqueta="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={cambiar}
          error={errores.email}
        />
        <button type="submit" className="btn-amicus w-100" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar link'}
        </button>
      </form>
      <p className="acceso-cruce text-secundario">
        ¿Te acordaste? <Link to="/login">Volver a ingresar</Link>
      </p>
    </>
  )
}

export default FormularioRecuperar
