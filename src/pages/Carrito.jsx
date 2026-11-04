import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cerrarSesion } from '../store/authSlice.js'
import { fetchCart, selectCart } from '../store/cartSlice.js'
import Cargando from '../components/comunes/Cargando.jsx'
import MensajeError from '../components/comunes/MensajeError.jsx'
import ListaCarrito from '../components/carrito/ListaCarrito.jsx'
import ResumenCarrito from '../components/carrito/ResumenCarrito.jsx'
import CarritoVacio from '../components/carrito/CarritoVacio.jsx'
import '../styles/carrito.css'

function Carrito() {
  const dispatch = useDispatch()
  const carrito = useSelector(selectCart)
  const { estado, error } = useSelector((state) => state.cart)
  const [intento, setIntento] = useState(0)

  // Al entrar se vuelve a pedir: los cupos pueden haber cambiado desde la ultima carga
  useEffect(() => {
    dispatch(fetchCart())
      .unwrap()
      .catch((fallo) => {
        // Token vencido: cerramos la sesion con un aviso y RutaPrivada manda al login
        if (fallo.estado === 401) dispatch(cerrarSesion('Tu sesión venció. Iniciá sesión de nuevo para continuar.'))
      })
  }, [intento, dispatch])

  const items = carrito?.items ?? []

  let contenido
  if (estado === 'cargando' && !carrito) contenido = <Cargando texto="Cargando tu carrito..." />
  else if (estado === 'error') {
    contenido = <MensajeError onReintentar={() => setIntento(intento + 1)}>{error?.mensaje}</MensajeError>
  } else if (items.length === 0) contenido = <CarritoVacio />
  else {
    contenido = (
      <div className="carrito-layout">
        <ListaCarrito items={items} />
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
