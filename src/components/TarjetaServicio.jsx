import { Link } from 'react-router-dom'

function TarjetaServicio({ servicio }) {
  const precio = servicio.precio.toLocaleString('es-AR')

  return (
    <Link to={`/servicios/${servicio.id}`} className="card h-100 text-decoration-none text-dark">
      <div className="card-body">
        <span className="badge bg-secondary mb-2">{servicio.categoria}</span>
        <h5 className="card-title">{servicio.titulo}</h5>
        <p className="card-text fw-bold">${precio}</p>
        {servicio.disponible
          ? <span className="text-success">{servicio.cuposDisponibles} cupos</span>
          : <span className="text-danger">Agotado</span>}
      </div>
    </Link>
  )
}

export default TarjetaServicio
