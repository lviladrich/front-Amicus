import { useState } from 'react'
import { estiloCategoria } from '../../utils/categorias.js'

// Sin imagenes muestra el bloque de color de la categoria, como en el listado
function GaleriaImagenes({ imagenes, categoria, titulo }) {
  const [indice, setIndice] = useState(0)
  const { fondo, Icono } = estiloCategoria(categoria)
  const actual = imagenes[indice]

  return (
    <div>
      <div className="galeria-principal" style={{ background: fondo }}>
        {actual
          ? <img src={actual.url} alt={`${titulo}, imagen ${indice + 1} de ${imagenes.length}`} />
          : <Icono size={64} strokeWidth={1.5} aria-hidden="true" />}
      </div>
      {imagenes.length > 1 && (
        <div className="galeria-miniaturas">
          {imagenes.map((imagen, posicion) => (
            <button
              key={imagen.id}
              type="button"
              className={posicion === indice ? 'miniatura miniatura-activa' : 'miniatura'}
              aria-label={`Ver imagen ${posicion + 1}`}
              aria-pressed={posicion === indice}
              onClick={() => setIndice(posicion)}
            >
              <img src={imagen.url} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default GaleriaImagenes
