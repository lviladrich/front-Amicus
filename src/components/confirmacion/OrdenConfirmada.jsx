import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerOrden } from '../../api/amicus.js'
import Cargando from '../comunes/Cargando.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import SelloConfirmacion from './SelloConfirmacion.jsx'
import DetalleOrden from './DetalleOrden.jsx'

// Se monta con key={id}: al cambiar de orden arranca con el estado de carga de nuevo
function OrdenConfirmada({ id }) {
  const [orden, setOrden] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let activo = true
    obtenerOrden(id)
      .then((datos) => {
        if (!activo) return
        setOrden(datos)
        setError('')
      })
      .catch((fallo) => {
        if (activo) setError(fallo.message)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })
    return () => {
      activo = false
    }
  }, [id, intento])

  function reintentar() {
    setCargando(true)
    setError('')
    setIntento((actual) => actual + 1)
  }

  if (cargando) return <Cargando texto="Cargando tu orden..." />
  if (error) return <MensajeError onReintentar={reintentar}>{error}</MensajeError>
  if (!orden) return null

  return (
    <>
      <SelloConfirmacion orden={orden} />
      <DetalleOrden orden={orden} onOrdenActualizada={setOrden} />
      <Link to="/" className="btn-amicus confirmacion-boton">Seguir buscando servicios</Link>
    </>
  )
}

export default OrdenConfirmada
