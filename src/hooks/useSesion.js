import { useContext } from 'react'
import { SesionContext } from '../context/contextos.js'

// { usuario, iniciarSesion(loginResponse), cerrarSesion() }
export default function useSesion() {
  return useContext(SesionContext)
}
