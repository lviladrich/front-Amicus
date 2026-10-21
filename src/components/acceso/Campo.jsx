import ErrorCampo from './ErrorCampo.jsx'

// Label + input + ayuda opcional + error. Recibe el resto de las props del input (type, value, onChange, etc.)
function Campo({ id, etiqueta, error, ayuda, ...inputProps }) {
  const idError = `${id}-error`
  const idAyuda = `${id}-ayuda`
  const descripcion = [error && idError, ayuda && idAyuda].filter(Boolean).join(' ') || undefined

  return (
    <div className="campo">
      <label htmlFor={id} className="campo-etiqueta">{etiqueta}</label>
      <input
        id={id}
        name={id}
        className={`campo-input ${error ? 'campo-input-error' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={descripcion}
        {...inputProps}
      />
      {ayuda && <p id={idAyuda} className="campo-ayuda">{ayuda}</p>}
      <ErrorCampo id={idError}>{error}</ErrorCampo>
    </div>
  )
}

export default Campo
