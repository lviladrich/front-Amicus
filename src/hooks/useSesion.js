import { useContext } from 'react'
import { SesionContext } from '../context/contextos.js'

// { usuario, iniciarSesion(loginResponse), cerrarSesion(aviso?), actualizarUsuario(usuarioResponse),
//   avisoSesion, limpiarAvisoSesion() }
export default function useSesion() {
  return useContext(SesionContext)
}
