import PanelAcceso from '../components/acceso/PanelAcceso.jsx'
import FormularioRestablecer from '../components/acceso/FormularioRestablecer.jsx'

function RestablecerPassword() {
  return (
    <PanelAcceso
      titular="Un paso más y"
      destacado="listo."
    >
      <FormularioRestablecer />
    </PanelAcceso>
  )
}

export default RestablecerPassword
