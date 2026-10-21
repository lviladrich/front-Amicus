import SelectorFrase from './SelectorFrase.jsx'

function SelectorBarrio({ zonas, valor, onChange, cargando }) {
  return (
    <SelectorFrase
      id="selector-barrio"
      etiqueta="Barrio donde lo necesitás"
      textoVacio="cualquier barrio"
      valor={valor}
      onChange={onChange}
      opciones={zonas}
      cargando={cargando}
    />
  )
}

export default SelectorBarrio
