import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

// Desplegable propio subrayado en amarillo que se lee como parte de la frase. No usa <select> porque la lista
// nativa copia el tamano gigante del titulo y en Mac no se puede achicar con CSS.
function SelectorFrase({ id, etiqueta, valor, onChange, textoVacio, opciones, cargando = false }) {
  const [abierto, setAbierto] = useState(false)
  const contenedor = useRef(null)

  const elegida = opciones.find((opcion) => String(opcion.id) === String(valor))
  const texto = cargando ? 'Cargando...' : elegida ? elegida.nombre : textoVacio

  // Cierra la lista al hacer clic afuera o con Escape
  useEffect(() => {
    if (!abierto) return
    function alHacerClic(evento) {
      if (contenedor.current && !contenedor.current.contains(evento.target)) setAbierto(false)
    }
    function alApretarTecla(evento) {
      if (evento.key === 'Escape') setAbierto(false)
    }
    document.addEventListener('mousedown', alHacerClic)
    document.addEventListener('keydown', alApretarTecla)
    return () => {
      document.removeEventListener('mousedown', alHacerClic)
      document.removeEventListener('keydown', alApretarTecla)
    }
  }, [abierto])

  function elegir(nuevoValor) {
    onChange(nuevoValor)
    setAbierto(false)
  }

  return (
    <span className="selector-frase" ref={contenedor}>
      <button
        type="button"
        id={id}
        className="selector-boton"
        aria-label={`${etiqueta}: ${texto}`}
        aria-haspopup="listbox"
        aria-expanded={abierto}
        disabled={cargando}
        onClick={() => setAbierto(!abierto)}
      >
        {texto}
        <ChevronDown className="selector-flecha" size={28} aria-hidden="true" />
      </button>

      {abierto && (
        <ul className="selector-lista" role="listbox" aria-label={etiqueta}>
          <li>
            <button type="button" role="option" aria-selected={!elegida} onClick={() => elegir('')}>
              {textoVacio}
            </button>
          </li>
          {opciones.map((opcion) => (
            <li key={opcion.id}>
              <button
                type="button"
                role="option"
                aria-selected={elegida?.id === opcion.id}
                onClick={() => elegir(String(opcion.id))}
              >
                {opcion.nombre}
              </button>
            </li>
          ))}
        </ul>
      )}
    </span>
  )
}

export default SelectorFrase
