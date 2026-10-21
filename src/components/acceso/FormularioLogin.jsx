import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../api/amicus.js'
import useSesion from '../../hooks/useSesion.js'
import Campo from './Campo.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import { validarLogin } from './validaciones.js'

function FormularioLogin() {
  const [valores, setValores] = useState({ email: '', password: '' })
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)
  const { iniciarSesion } = useSesion()
  const navigate = useNavigate()
  const location = useLocation()

  function cambiar(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
    setErrores((actuales) => ({ ...actuales, [name]: '' }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    const erroresCliente = validarLogin(valores)
    setErrores(erroresCliente)
    setErrorGeneral('')
    if (Object.keys(erroresCliente).length > 0) return

    setEnviando(true)
    try {
      const respuesta = await login(valores.email.trim(), valores.password)
      iniciarSesion(respuesta)
      navigate(location.state?.desde || '/', { replace: true })
    } catch (error) {
      setErrores(error.errores ?? {})
      setErrorGeneral(error.message)
      setEnviando(false)
    }
  }

  return (
    <>
      <h1 className="acceso-titulo">Ingresar</h1>
      <p className="text-secundario">Entrá a tu cuenta para contratar servicios y ver tus órdenes.</p>
      <form onSubmit={enviar} noValidate className="acceso-formulario">
        <MensajeError>{errorGeneral}</MensajeError>
        <Campo
          id="email"
          etiqueta="Email"
          type="email"
          autoComplete="email"
          value={valores.email}
          onChange={cambiar}
          error={errores.email}
        />
        <Campo
          id="password"
          etiqueta="Contraseña"
          type="password"
          autoComplete="current-password"
          value={valores.password}
          onChange={cambiar}
          error={errores.password}
        />
        {/* TODO (ver docs/PENDIENTES.md): link "Olvidé mi contraseña" (recuperar contraseña) */}
        <button type="submit" className="btn-amicus w-100" disabled={enviando}>
          {enviando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
      <p className="acceso-cruce text-secundario">
        ¿No tenés cuenta? <Link to="/registro">Crear cuenta</Link>
      </p>
    </>
  )
}

export default FormularioLogin
