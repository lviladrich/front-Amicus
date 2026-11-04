import { useState } from 'react'

// Rango de precio del catalogo. Se aplica al apretar "Aplicar" (o Enter), no en cada tecla,
// para no pedirle al back una busqueda por cada numero que se escribe.
function FiltroPrecio({ minimo, maximo, onAplicar }) {
  const [borradorMin, setBorradorMin] = useState(minimo)
  const [borradorMax, setBorradorMax] = useState(maximo)
  const [error, setError] = useState('')

  function aplicar(evento) {
    evento.preventDefault()
    if (borradorMin !== '' && borradorMax !== '' && Number(borradorMin) > Number(borradorMax)) {
      setError('El mínimo no puede ser mayor que el máximo.')
      return
    }
    setError('')
    onAplicar(borradorMin, borradorMax)
  }

  function limpiar() {
    setBorradorMin('')
    setBorradorMax('')
    setError('')
    onAplicar('', '')
  }

  const hayFiltro = minimo !== '' || maximo !== ''

  return (
    <form className="filtro-precio" onSubmit={aplicar} aria-label="Filtrar por precio" noValidate>
      <span className="filtro-precio-titulo">Precio</span>
      <input
        type="number"
        min="0"
        step="1000"
        inputMode="numeric"
        placeholder="Mínimo"
        aria-label="Precio mínimo"
        value={borradorMin}
        onChange={(evento) => setBorradorMin(evento.target.value)}
      />
      <span className="text-secundario small">a</span>
      <input
        type="number"
        min="0"
        step="1000"
        inputMode="numeric"
        placeholder="Máximo"
        aria-label="Precio máximo"
        value={borradorMax}
        onChange={(evento) => setBorradorMax(evento.target.value)}
      />
      <button type="submit" className="btn-amicus btn-amicus-borde btn-chico">Aplicar</button>
      {hayFiltro && (
        <button type="button" className="btn-texto small" onClick={limpiar}>Limpiar</button>
      )}
      {error && <p className="texto-error w-100 mb-0" role="alert">{error}</p>}
    </form>
  )
}

export default FiltroPrecio
