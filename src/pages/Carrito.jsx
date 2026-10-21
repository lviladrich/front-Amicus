import { useEffect, useState } from 'react'
import { verCarrito } from '../api/amicus.js'
import useCarrito from '../hooks/useCarrito.js'
import useSesion from '../hooks/useSesion.js'
import Cargando from '../components/comunes/Cargando.jsx'
import MensajeError from '../components/comunes/MensajeError.jsx'
import ListaCarrito from '../components/carrito/ListaCarrito.jsx'
import ResumenCarrito from '../components/carrito/ResumenCarrito.jsx'
import CarritoVacio from '../components/carrito/CarritoVacio.jsx'
import '../styles/carrito.css'

function Carrito() {
  const { carrito, setCarrito } = useCarrito()
  const { cerrarSesion } = useSesion()
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let activo = true
    verCarrito()
      .then((datos) => {
        if (!activo) return
        setCarrito(datos)
        setError('')
      })
      .catch((fallo) => {
        if (!activo) return
        // Token vencido: cerramos la sesion y RutaPrivada manda al login
        // TODO (ver docs/PENDIENTES.md): avisar que la sesion vencio en vez de cerrarla en silencio
        if (fallo.estado === 401) cerrarSesion()
        else setError(fallo.message)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })
    return () => {
      activo = false
    }
  }, [intento, setCarrito, cerrarSesion])

  function reintentar() {
    setCargando(true)
    setError('')
    setIntento((actual) => actual + 1)
  }

  const items = carrito?.items ?? []

  let contenido
  if (cargando) contenido = <Cargando texto="Cargando tu carrito..." />
  else if (error) contenido = <MensajeError onReintentar={reintentar}>{error}</MensajeError>
  else if (items.length === 0) contenido = <CarritoVacio />
  else {
    contenido = (
      <div className="carrito-layout">
        <ListaCarrito items={items} onActualizado={setCarrito} />
        <ResumenCarrito carrito={carrito} />
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="carrito-titulo">Tu carrito</h1>
      {contenido}
    </div>
  )
}

export default Carrito
