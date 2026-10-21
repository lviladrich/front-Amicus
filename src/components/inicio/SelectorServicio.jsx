import SelectorFrase from './SelectorFrase.jsx'

function SelectorServicio({ categorias, valor, onChange, cargando }) {
  return (
    <SelectorFrase
      id="selector-servicio"
      etiqueta="Servicio que necesitás"
      textoVacio="un servicio"
      valor={valor}
      onChange={onChange}
      opciones={categorias}
      cargando={cargando}
    />
  )
}

export default SelectorServicio
