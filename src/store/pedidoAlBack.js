import { createAsyncThunk } from '@reduxjs/toolkit'

// Arma un thunk que llama al back. Si falla, el error queda con el mismo formato en todos los slices:
// { mensaje, estado, errores }. ErrorApi no se puede guardar en el store (no es serializable).
export function pedidoAlBack(tipo, llamada) {
  return createAsyncThunk(tipo, async (argumento, thunkApi) => {
    try {
      return await llamada(argumento, thunkApi)
    } catch (error) {
      return thunkApi.rejectWithValue({ mensaje: error.message, estado: error.estado, errores: error.errores ?? {} })
    }
  })
}
