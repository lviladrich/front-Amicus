import { useContext } from 'react'
import { CarritoContext } from '../context/contextos.js'

// { carrito, setCarrito, refrescarCarrito } -> carrito es la CarritoResponse del back o null sin sesion
export default function useCarrito() {
  return useContext(CarritoContext)
}
