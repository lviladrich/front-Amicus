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

  // Recibe la LoginResponse del back: { token, usuario }
  const iniciarSesion = useCallback(({ token, usuario: datosUsuario }) => {
    guardarToken(token)
    localStorage.setItem(CLAVE_USUARIO, JSON.stringify(datosUsuario))
    setUsuario(datosUsuario)
  }, [])

  const cerrarSesion = useCallback(() => {
    guardarToken(null)
    localStorage.removeItem(CLAVE_USUARIO)
    setUsuario(null)
  }, [])

  // Recibe el UsuarioResponse ya actualizado que devuelve PUT /auth/usuarios/{id}
  const actualizarUsuario = useCallback((datosUsuario) => {
    localStorage.setItem(CLAVE_USUARIO, JSON.stringify(datosUsuario))
    setUsuario(datosUsuario)
  }, [])

  const valor = useMemo(
    () => ({ usuario, iniciarSesion, cerrarSesion, actualizarUsuario }),
    [usuario, iniciarSesion, cerrarSesion, actualizarUsuario],
  )

  return (
    <SesionContext.Provider value={valor}>
      {children}
    </SesionContext.Provider>
  )
}

export default SesionProvider
