import { createSlice, isFulfilled } from '@reduxjs/toolkit'
import {
  actualizarItemCarrito,
  agregarAlCarrito,
  quitarItemCarrito,
  vaciarCarrito,
  verCarrito,
} from '../api/amicus.js'
import { pedidoAlBack } from './pedidoAlBack.js'
import { sesionCerrada } from './authSlice.js'

// Todos devuelven el CarritoResponse completo que responde el back
export const fetchCart = pedidoAlBack('cart/fetch', () => verCarrito())
export const addToCart = pedidoAlBack('cart/add', ({ servicioId, cantidad, frecuencia }) =>
  agregarAlCarrito(servicioId, cantidad, frecuencia))
export const removeFromCart = pedidoAlBack('cart/remove', (itemId) => quitarItemCarrito(itemId))
export const incItem = pedidoAlBack('cart/inc', (item) =>
  actualizarItemCarrito(item.id, item.cantidad + 1, item.frecuencia))
export const decItem = pedidoAlBack('cart/dec', (item) =>
  actualizarItemCarrito(item.id, item.cantidad - 1, item.frecuencia))
export const changeItemFrequency = pedidoAlBack('cart/changeFrequency', ({ item, frecuencia }) =>
  actualizarItemCarrito(item.id, item.cantidad, frecuencia))
export const clearCart = pedidoAlBack('cart/clear', () => vaciarCarrito())

const initialState = {
  datos: null,
  // Estado de la carga inicial: 'inactivo' | 'cargando' | 'listo' | 'error'
  estado: 'inactivo',
  error: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.estado = 'cargando'
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state) => {
        state.estado = 'listo'
      })
      .addCase(fetchCart.rejected, (state, action) => {
        // Una respuesta descartada por cambio de sesion no es un error para mostrar
        if (action.payload?.descartado) return
        state.estado = 'error'
        state.error = action.payload
      })
      // Al cerrar sesion se borra: el carrito que quedo en memoria era del usuario que salio
      .addCase(sesionCerrada, () => initialState)
      // Cualquier pedido que salio bien trae el carrito actualizado: se guarda igual en todos los casos
      .addMatcher(
        isFulfilled(fetchCart, addToCart, removeFromCart, incItem, decItem, changeItemFrequency, clearCart),
        (state, action) => {
          state.datos = action.payload
        },
      )
  },
})

export const selectCart = (state) => state.cart.datos
export const selectCartCount = (state) => state.cart.datos?.cantidadDeItems ?? 0

export default cartSlice.reducer
