import { createSlice } from '@reduxjs/toolkit'
import { guardarToken, login as pedirLogin, registrar } from '../api/amicus.js'
import { pedidoAlBack } from './pedidoAlBack.js'

const CLAVE_USUARIO = 'amicus.usuario'

function leerUsuarioGuardado() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIO))
  } catch {
    return null
  }
}

const authSlice = createSlice({
  name: 'auth',
  // El usuario arranca con lo guardado en localStorage: asi la sesion sobrevive a un F5
  initialState: { usuario: leerUsuarioGuardado(), avisoSesion: '' },
  reducers: {
    sesionIniciada(state, action) {
      state.usuario = action.payload
      state.avisoSesion = ''
    },
    // El aviso se completa cuando la sesion la cierra el sistema (token vencido), para explicarlo en el login
    sesionCerrada(state, action) {
      state.usuario = null
      state.avisoSesion = action.payload ?? ''
    },
    usuarioActualizado(state, action) {
      state.usuario = action.payload
    },
    limpiarAvisoSesion(state) {
      state.avisoSesion = ''
    },
  },
})

export const { sesionIniciada, sesionCerrada, usuarioActualizado, limpiarAvisoSesion } = authSlice.actions

// Los reducers no pueden tocar localStorage (tienen que ser puros): esos efectos van en estos thunks

// Recibe la LoginResponse del back: { token, usuario }
export const iniciarSesion = ({ token, usuario }) => (dispatch) => {
  guardarToken(token)
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario))
  dispatch(sesionIniciada(usuario))
}

export const cerrarSesion = (aviso = '') => (dispatch) => {
  guardarToken(null)
  localStorage.removeItem(CLAVE_USUARIO)
  dispatch(sesionCerrada(aviso))
}

// Recibe el UsuarioResponse ya actualizado que devuelve PUT /auth/usuarios/{id}
export const actualizarUsuario = (usuario) => (dispatch) => {
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario))
  dispatch(usuarioActualizado(usuario))
}

export const login = pedidoAlBack('auth/login', async ({ email, password }, { dispatch }) => {
  const respuesta = await pedirLogin(email, password)
  dispatch(iniciarSesion(respuesta))
  return respuesta.usuario
}, { mismaSesion: false })

// Despues de crear la cuenta entra directo, sin pedirle que vuelva a escribir los datos
export const registro = pedidoAlBack('auth/registro', async (datos, { dispatch }) => {
  await registrar(datos)
  const respuesta = await pedirLogin(datos.email, datos.password)
  dispatch(iniciarSesion(respuesta))
  return respuesta.usuario
}, { mismaSesion: false })

export const selectUsuario = (state) => state.auth.usuario
export const selectAvisoSesion = (state) => state.auth.avisoSesion

export default authSlice.reducer
