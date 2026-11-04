import { createAsyncThunk } from '@reduxjs/toolkit'

// Arma un thunk que llama al back. Si falla, el error queda con el mismo formato en todos los slices:
// { mensaje, estado, errores }. ErrorApi no se puede guardar en el store (no es serializable).
//
// Si mientras esperaba la respuesta la sesion cambio (se cerro o entro otra persona), la respuesta
// era del usuario anterior: se descarta para no mostrarle sus datos al nuevo. Login y registro
// cambian la sesion a proposito, por eso pasan { mismaSesion: false }.
export function pedidoAlBack(tipo, llamada, { mismaSesion = true } = {}) {
  return createAsyncThunk(tipo, async (argumento, thunkApi) => {
    const usuarioAntes = thunkApi.getState().auth.usuario?.id
    try {
      const respuesta = await llamada(argumento, thunkApi)
      if (mismaSesion && thunkApi.getState().auth.usuario?.id !== usuarioAntes) {
        return thunkApi.rejectWithValue({ mensaje: 'La sesión cambió', estado: 0, errores: {}, descartado: true })
      }
      return respuesta
    } catch (error) {
      return thunkApi.rejectWithValue({ mensaje: error.message, estado: error.estado, errores: error.errores ?? {} })
    }
  })
}
