import { Check, X } from 'lucide-react'
import { formatearFecha } from '../../utils/formato.js'

function SelloConfirmacion({ orden }) {
  const confirmada = orden.estado === 'CONFIRMADA'
  return (
    <header className="sello">
      <div className={`sello-icono ${confirmada ? '' : 'sello-icono-cancelada'}`} aria-hidden="true">
        {confirmada ? <Check size={32} /> : <X size={32} />}
      </div>
      <h1 className="sello-titulo">{confirmada ? 'Compra confirmada' : 'Orden cancelada'}</h1>
      <p className="text-secundario sello-detalle">
        Orden #{orden.id} · {formatearFecha(orden.fecha)}
      </p>
      {confirmada && <p className="text-secundario">Cada profesional te va a escribir para coordinar día y horario.</p>}
    </header>
  )
}

export default SelloConfirmacion
