import { useCallback, useEffect, useMemo, useState } from 'react'
import { CarritoContext } from './contextos.js'
import { verCarrito } from '../api/amicus.js'
import useSesion from '../hooks/useSesion.js'

function CarritoProvider({ children }) {
  const { usuario, cerrarSesion } = useSesion()
  const [carrito, setCarrito] = useState(null)

  const refrescarCarrito = useCallback(() => {
    if (!usuario) return Promise.resolve(null)
    return verCarrito()
      .then((datos) => {
        setCarrito(datos)
        return datos
      })
      .catch((error) => {
        // Token vencido o invalido: cerramos la sesion para que vuelva a ingresar
        if (error.estado === 401) cerrarSesion()
        setCarrito(null)
        return null
      })
  }, [usuario, cerrarSesion])

  // Al entrar con sesion carga el carrito (para el contador del header)
  useEffect(() => {
    if (!usuario) return
    let vigente = true
    verCarrito()
      .then((datos) => {
        if (vigente) setCarrito(datos)
      })
      .catch((error) => {
        if (vigente && error.estado === 401) cerrarSesion()
      })
    return () => {
      vigente = false
    }
  }, [usuario, cerrarSesion])

  // Sin sesion no hay carrito, y el que quedo cargado de otro usuario tampoco cuenta (CarritoResponse trae usuarioId)
  const carritoVigente = usuario && carrito?.usuarioId === usuario.id ? carrito : null
  const valor = useMemo(
    () => ({ carrito: carritoVigente, setCarrito, refrescarCarrito }),
    [carritoVigente, refrescarCarrito],
  )

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  )
}

export default CarritoProvider
