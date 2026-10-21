import PanelAcceso from '../components/acceso/PanelAcceso.jsx'
import FormularioLogin from '../components/acceso/FormularioLogin.jsx'

function Login() {
  return (
    <PanelAcceso
      titular="Profesionales de tu barrio,"
      destacado="a un clic."
      pie="Plomería, electricidad, pintura y más, en 18 barrios de CABA y el conurbano."
    >
      <FormularioLogin />
    </PanelAcceso>
  )
}

export default Login
