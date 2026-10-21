function Chip({ activo = false, onClick, children }) {
  return (
    <button
      type="button"
      className={activo ? 'chip chip-activo' : 'chip'}
      aria-pressed={activo}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Chip
