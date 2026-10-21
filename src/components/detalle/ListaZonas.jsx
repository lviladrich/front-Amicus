function ListaZonas({ zonas }) {
  return (
    <section aria-labelledby="titulo-zonas">
      <h2 id="titulo-zonas" className="h5">Zonas donde trabaja</h2>
      {zonas.length === 0 ? (
        <p className="text-secundario">El profesional todavía no indicó sus zonas.</p>
      ) : (
        <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
          {zonas.map((zona) => (
            <li key={zona.id}><span className="etiqueta">{zona.nombre}</span></li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ListaZonas
