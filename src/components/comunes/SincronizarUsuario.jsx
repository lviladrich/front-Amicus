import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cerrarSesion, selectUsuario } from '../../store/authSlice.js'
import { fetchCart } from '../../store/cartSlice.js'

// No dibuja nada: al iniciar sesion trae del back el carrito del usuario.
// Al cerrarla no hace falta nada: el slice se vacia solo con la action sesionCerrada.
function SincronizarUsuario() {
  const usuarioId = useSelector(selectUsuario)?.id
  const dispatch = useDispatch()

  useEffect(() => {
    if (!usuarioId) return
    dispatch(fetchCart())
      .unwrap()
      .catch((error) => {
        // Token vencido o invalido: cerramos la sesion para que vuelva a ingresar
        if (error.estado === 401) dispatch(cerrarSesion('Tu sesión venció. Iniciá sesión de nuevo para continuar.'))
      })
  }, [usuarioId, dispatch])

  return null
}

export default SincronizarUsuario
