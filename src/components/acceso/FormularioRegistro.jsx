import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registro } from '../../store/authSlice.js'
import Campo from './Campo.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import { validarRegistro } from './validaciones.js'

const VACIO = { nombre: '', apellido: '', username: '', email: '', password: '' }

function FormularioRegistro() {
  const [valores, setValores] = useState(VACIO)
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function cambiar(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
    setErrores((actuales) => ({ ...actuales, [name]: '' }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    const erroresCliente = validarRegistro(valores)
    setErrores(erroresCliente)
    setErrorGeneral('')
    if (Object.keys(erroresCliente).length > 0) return

    setEnviando(true)
    const datos = {
      ...valores,
      nombre: valores.nombre.trim(),
      apellido: valores.apellido.trim(),
      username: valores.username.trim(),
      email: valores.email.trim(),
    }
    try {
      await dispatch(registro(datos)).unwrap()
      navigate('/', { replace: true })
    } catch (error) {
      setErrores(error.errores)
      setErrorGeneral(error.mensaje)
      setEnviando(false)
    }
  }

  return (
    <>
      <h1 className="acceso-titulo">Crear cuenta</h1>
      <p className="text-secundario">Completá tus datos. Te lleva menos de un minuto.</p>
      <form onSubmit={enviar} noValidate className="acceso-formulario">
        <MensajeError>{errorGeneral}</MensajeError>
        <div className="acceso-fila">
          <Campo
            id="nombre"
            etiqueta="Nombre"
            autoComplete="given-name"
            value={valores.nombre}
            onChange={cambiar}
            error={errores.nombre}
          />
          <Campo
            id="apellido"
            etiqueta="Apellido"
            autoComplete="family-name"
            value={valores.apellido}
            onChange={cambiar}
            error={errores.apellido}
          />
        </div>
        <Campo
          id="username"
          etiqueta="Usuario"
          autoComplete="username"
          value={valores.username}
          onChange={cambiar}
          error={errores.username}
          ayuda="Entre 3 y 50 caracteres."
        />
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
          autoComplete="new-password"
          value={valores.password}
          onChange={cambiar}
          error={errores.password}
          ayuda="Mínimo 6 caracteres."
        />
        <button type="submit" className="btn-amicus w-100" disabled={enviando}>
          {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>
      <p className="acceso-cruce text-secundario">
        ¿Ya tenés cuenta? <Link to="/login">Ingresar</Link>
      </p>
    </>
  )
}

export default FormularioRegistro
