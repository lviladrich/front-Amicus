import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import cartReducer from './cartSlice.js'

// Estado global de Amicus. Cada clave de "reducer" es un slice.
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
})
