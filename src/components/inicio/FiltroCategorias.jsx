import Chip from './Chip.jsx'

function FiltroCategorias({ categorias, categoriaId, onElegir }) {
  return (
    <div className="filtro-categorias" role="group" aria-label="Filtrar por categoría">
      <Chip activo={categoriaId === ''} onClick={() => onElegir('')}>Todas</Chip>
      {categorias.map((categoria) => (
        <Chip
          key={categoria.id}
          activo={categoriaId === String(categoria.id)}
          onClick={() => onElegir(String(categoria.id))}
        >
          {categoria.nombre}
        </Chip>
      ))}
    </div>
  )
}

export default FiltroCategorias
