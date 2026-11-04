import { useState } from 'react'
import TarjetaServicio from '../TarjetaServicio.jsx'
import { borrarVistos, leerVistos } from '../../utils/vistos.js'

// Fila con los ultimos servicios que se abrieron en este navegador. Si no hay ninguno, no se muestra.
function VistosRecientemente() {
  const [vistos, setVistos] = useState(leerVistos)

  if (vistos.length === 0) return null

  function borrar() {
    borrarVistos()
    setVistos([])
  }

  return (
    <section aria-labelledby="titulo-vistos" className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="titulo-vistos" className="h5 mb-0">Vistos recientemente</h2>
        <button type="button" className="btn-texto small" onClick={borrar}>Borrar historial</button>
      </div>
      <div className="vistos-fila">
        {vistos.map((servicio) => (
          <TarjetaServicio key={servicio.id} servicio={servicio} />
        ))}
      </div>
    </section>
  )
}

export default VistosRecientemente
