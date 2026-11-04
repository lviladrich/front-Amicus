import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { limpiarAvisoSesion, login, selectAvisoSesion } from '../../store/authSlice.js'
import Campo from './Campo.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import { validarLogin } from './validaciones.js'

function FormularioLogin() {
  const [valores, setValores] = useState({ email: '', password: '' })
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)
  const dispatch = useDispatch()
  const avisoSesion = useSelector(selectAvisoSesion)
  const navigate = useNavigate()
  const location = useLocation()

  // El aviso solo tiene que verse una vez: se limpia apenas se muestra esta pantalla
  useEffect(() => {
    return () => dispatch(limpiarAvisoSesion())
  }, [dispatch])

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
      await dispatch(login({ email: valores.email.trim(), password: valores.password })).unwrap()
      navigate(location.state?.desde || '/', { replace: true })
    } catch (error) {
      setErrores(error.errores)
      setErrorGeneral(error.mensaje)
      setEnviando(false)
    }
  }

  return (
    <>
      <h1 className="acceso-titulo">Ingresar</h1>
      <p className="text-secundario">Entrá a tu cuenta para contratar servicios y ver tus órdenes.</p>
      <form onSubmit={enviar} noValidate className="acceso-formulario">
        <MensajeError>{avisoSesion || errorGeneral}</MensajeError>
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
        <Link to="/recuperar" className="acceso-olvido">Olvidé mi contraseña</Link>
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
