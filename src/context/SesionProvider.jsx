import { useCallback, useMemo, useState } from 'react'
import { SesionContext } from './contextos.js'
import { guardarToken } from '../api/amicus.js'

const CLAVE_USUARIO = 'amicus.usuario'

function leerUsuarioGuardado() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIO))
  } catch {
    return null
  }
}

function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuarioGuardado)
  // Mensaje a mostrar en el proximo login (por ejemplo, "tu sesion vencio"). Vive en memoria,
  // no en localStorage: solo tiene sentido una vez, justo despues de que la sesion se cerro sola.
  const [avisoSesion, setAvisoSesion] = useState('')

  // Recibe la LoginResponse del back: { token, usuario }
  const iniciarSesion = useCallback(({ token, usuario: datosUsuario }) => {
    guardarToken(token)
    localStorage.setItem(CLAVE_USUARIO, JSON.stringify(datosUsuario))
    setUsuario(datosUsuario)
  }, [])

  // aviso es opcional: se completa cuando quien cierra la sesion no es el propio usuario
  // (por ejemplo, un token vencido), para poder explicarselo en la pantalla de login.
  const cerrarSesion = useCallback((aviso = '') => {
    guardarToken(null)
    localStorage.removeItem(CLAVE_USUARIO)
    setUsuario(null)
    setAvisoSesion(aviso)
  }, [])

  const limpiarAvisoSesion = useCallback(() => setAvisoSesion(''), [])

  // Recibe el UsuarioResponse ya actualizado que devuelve PUT /auth/usuarios/{id}
  const actualizarUsuario = useCallback((datosUsuario) => {
    localStorage.setItem(CLAVE_USUARIO, JSON.stringify(datosUsuario))
    setUsuario(datosUsuario)
  }, [])

  const valor = useMemo(
    () => ({ usuario, iniciarSesion, cerrarSesion, actualizarUsuario, avisoSesion, limpiarAvisoSesion }),
    [usuario, iniciarSesion, cerrarSesion, actualizarUsuario, avisoSesion, limpiarAvisoSesion],
  )

  return (
    <SesionContext.Provider value={valor}>
      {children}
    </SesionContext.Provider>
  )
}

export default SesionProvider
