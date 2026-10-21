function Cargando({ texto = 'Cargando...' }) {
  return (
    <div className="d-flex align-items-center gap-2 py-4 text-secundario" role="status">
      <span className="spinner-border spinner-border-sm" aria-hidden="true" />
      <span>{texto}</span>
    </div>
  )
}

export default Cargando
