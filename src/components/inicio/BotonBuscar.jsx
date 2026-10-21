import { Search } from 'lucide-react'

function BotonBuscar() {
  return (
    <button type="submit" className="btn-amicus">
      <Search size={16} aria-hidden="true" />
      Buscar
    </button>
  )
}

export default BotonBuscar
