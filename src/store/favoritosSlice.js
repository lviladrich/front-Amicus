import { createSlice, isFulfilled } from '@reduxjs/toolkit'
import { agregarFavorito, listarFavoritos, quitarFavorito } from '../api/amicus.js'
import { pedidoAlBack } from './pedidoAlBack.js'
import { sesionCerrada } from './authSlice.js'

// Los tres devuelven la lista completa de favoritos que responde el back
export const fetchFavoritos = pedidoAlBack('favoritos/fetch', () => listarFavoritos())
export const addFavorito = pedidoAlBack('favoritos/add', (servicioId) => agregarFavorito(servicioId))
export const removeFavorito = pedidoAlBack('favoritos/remove', (servicioId) => quitarFavorito(servicioId))

const initialState = {
  items: [],
  // Estado de la carga inicial: 'inactivo' | 'cargando' | 'listo' | 'error'
  estado: 'inactivo',
  error: null,
}

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritos.pending, (state) => {
        state.estado = 'cargando'
        state.error = null
      })
      .addCase(fetchFavoritos.fulfilled, (state) => {
        state.estado = 'listo'
      })
      .addCase(fetchFavoritos.rejected, (state, action) => {
        state.estado = 'error'
        state.error = action.payload
      })
      // Al cerrar sesion se borran: eran del usuario que salio
      .addCase(sesionCerrada, () => initialState)
      .addMatcher(isFulfilled(fetchFavoritos, addFavorito, removeFavorito), (state, action) => {
        state.items = action.payload
      })
  },
})

export const selectFavoritos = (state) => state.favoritos.items
export const selectEsFavorito = (servicioId) => (state) =>
  state.favoritos.items.some((servicio) => servicio.id === servicioId)

export default favoritosSlice.reducer
