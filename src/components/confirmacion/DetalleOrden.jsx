import { etiquetaFrecuencia, formatearFecha, formatearPrecio } from '../../utils/formato.js'

function textoCantidad(cantidad) {
  return cantidad === 1 ? '1 servicio' : `${cantidad} servicios`
}

function DetalleOrden({ orden }) {
  const confirmada = orden.estado === 'CONFIRMADA'
  return (
    <section className="tarjeta detalle-orden" aria-labelledby="titulo-orden">
      <div className="detalle-orden-cabecera">
        <div>
          <h2 id="titulo-orden" className="detalle-orden-titulo">Orden #{orden.id}</h2>
          <p className="text-secundario detalle-orden-fecha">{formatearFecha(orden.fecha)}</p>
        </div>
        <span className="etiqueta">{confirmada ? 'Confirmada' : 'Cancelada'}</span>
      </div>
      <ul className="detalle-orden-items">
        {orden.items.map((item) => (
          <li key={item.id}>
            <div>
              <span>{item.titulo}</span>
              <p className="text-secundario detalle-orden-sub">
                {textoCantidad(item.cantidad)}, {etiquetaFrecuencia(item.frecuencia).toLowerCase()}
              </p>
            </div>
            <span>{formatearPrecio(item.subtotal)}</span>
          </li>
        ))}
      </ul>
      <div className="detalle-orden-total">
        <span className="fw-semibold">{confirmada ? 'Total pagado' : 'Total'}</span>
        <span className="precio">{formatearPrecio(orden.total)}</span>
      </div>
      {/* TODO (ver docs/PENDIENTES.md): botón "Cancelar orden" (PATCH /ordenes/{id}/cancelar) y link a "Mis órdenes" */}
    </section>
  )
}

export default DetalleOrden
