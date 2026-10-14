import { useEffect, useState } from 'react'
import { listarServicios } from '../api/amicus.js'
import TarjetaServicio from './TarjetaServicio.jsx'

function ListaServicios({ categoriaId }) {
  const [servicios, setServicios] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    listarServicios(categoriaId)
      .then((datos) => {
        setServicios(datos)
        setError(null)
      })
      .catch(() => setError('No se pudieron cargar los servicios.'))
  }, [categoriaId])

  if (error) return <div className="alert alert-danger">{error}</div>
  if (servicios === null) return <p>Cargando servicios...</p>
  if (servicios.length === 0) return <p>No hay servicios para mostrar.</p>

  return (
    <div className="row g-3">
      {servicios.map((servicio) => (
        <div key={servicio.id} className="col-12 col-sm-6 col-lg-4">
          <TarjetaServicio servicio={servicio} />
        </div>
      ))}
    </div>
  )
}

export default ListaServicios
