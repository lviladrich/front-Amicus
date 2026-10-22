import { useEffect, useState } from 'react'
import { actualizarPerfil, obtenerUsuario } from '../../api/amicus.js'
import useSesion from '../../hooks/useSesion.js'
import Campo from '../acceso/Campo.jsx'
import Cargando from '../comunes/Cargando.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import { validarPerfil } from '../acceso/validaciones.js'

// Pide los datos propios al back (no los toma de la sesion guardada) para mostrar siempre lo ultimo persistido
function FormularioPerfil() {
  const { usuario, actualizarUsuario } = useSesion()
  const [valores, setValores] = useState(null)
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [guardado, setGuardado] = useState(false)

  useEffect(() => {
    let vigente = true
    obtenerUsuario(usuario.id)
      .then((datos) => {
        if (vigente) setValores({ nombre: datos.nombre, apellido: datos.apellido, email: datos.email })
      })
      .catch((error) => {
        if (vigente) setErrorGeneral(error.message)
      })
    return () => {
      vigente = false
    }
  }, [usuario.id])

  function cambiar(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
    setErrores((actuales) => ({ ...actuales, [name]: '' }))
    setGuardado(false)
  }

  async function enviar(evento) {
    evento.preventDefault()
    const erroresCliente = validarPerfil(valores)
    setErrores(erroresCliente)
    setErrorGeneral('')
    setGuardado(false)
    if (Object.keys(erroresCliente).length > 0) return

    setEnviando(true)
    const datos = {
      nombre: valores.nombre.trim(),
      apellido: valores.apellido.trim(),
      email: valores.email.trim(),
    }
    try {
      const usuarioActualizado = await actualizarPerfil(usuario.id, datos)
      actualizarUsuario(usuarioActualizado)
      setValores({
        nombre: usuarioActualizado.nombre,
        apellido: usuarioActualizado.apellido,
        email: usuarioActualizado.email,
      })
      setGuardado(true)
    } catch (error) {
      setErrores(error.errores ?? {})
      setErrorGeneral(error.message)
    } finally {
      setEnviando(false)
    }
  }

  if (!valores) {
    return errorGeneral ? <MensajeError>{errorGeneral}</MensajeError> : <Cargando texto="Cargando tus datos..." />
  }

  return (
    <form onSubmit={enviar} noValidate className="acceso-formulario mt-3">
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
        id="email"
        etiqueta="Email"
        type="email"
        autoComplete="email"
        value={valores.email}
        onChange={cambiar}
        error={errores.email}
      />
      <div className="d-flex align-items-center gap-3">
        <button type="submit" className="btn-amicus" disabled={enviando}>
          {enviando ? 'Guardando...' : 'Guardar cambios'}
        </button>
        {guardado && <span className="text-secundario small">Listo, tus datos se actualizaron.</span>}
      </div>
    </form>
  )
}

export default FormularioPerfil
