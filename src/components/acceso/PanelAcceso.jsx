import '../../styles/acceso.css'

// Layout de login y registro: panel de marca a la izquierda y tarjeta con el formulario (children) a la derecha
function PanelAcceso({ titular, destacado, pie, children }) {
  return (
    <div className="acceso">
      <aside className="acceso-panel">
        <h2 className="acceso-titular">
          {titular} <span className="acceso-destacado">{destacado}</span>
        </h2>
        {pie && <p className="acceso-pie">{pie}</p>}
      </aside>
      <section className="acceso-contenido">
        <div className="acceso-tarjeta">{children}</div>
      </section>
    </div>
  )
}

export default PanelAcceso
