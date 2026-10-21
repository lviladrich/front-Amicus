import PanelAcceso from '../components/acceso/PanelAcceso.jsx'
import FormularioRegistro from '../components/acceso/FormularioRegistro.jsx'

function Registro() {
  return (
    <PanelAcceso
      titular="Con una sola cuenta"
      destacado="contratás y también ofrecés servicios."
      pie="Registrarte es gratis."
    >
      <FormularioRegistro />
    </PanelAcceso>
  )
}

export default Registro
