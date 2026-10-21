import ItemCarrito from './ItemCarrito.jsx'

// TODO (ver docs/PENDIENTES.md): botón "Vaciar carrito" (DELETE /carrito)
function ListaCarrito({ items, onActualizado }) {
  return (
    <ul className="carrito-lista" aria-label="Servicios en tu carrito">
      {items.map((item) => (
        <ItemCarrito key={item.id} item={item} onActualizado={onActualizado} />
      ))}
    </ul>
  )
}

export default ListaCarrito
