import { useContext } from 'react'
import { SesionContext } from '../context/contextos.js'

// { usuario, iniciarSesion(loginResponse), cerrarSesion(), actualizarUsuario(usuarioResponse) }
export default function useSesion() {
  return useContext(SesionContext)
}
