import {
  actualizarCategoria, actualizarZona, crearCategoria, crearZona,
  eliminarCategoria, eliminarZona, listarCategorias, listarZonas,
} from '../api/amicus.js'
import SeccionAdmin from '../components/admin/SeccionAdmin.jsx'
import { CAMPOS_CATEGORIA, CAMPOS_ZONA } from '../components/admin/camposAdmin.js'
import '../styles/acceso.css'
import '../styles/admin.css'

// Fuera del componente para que no cambien en cada render (SeccionAdmin vuelve a pedir la lista si cambian)
const API_CATEGORIAS = {
  listar: listarCategorias,
  crear: crearCategoria,
  actualizar: actualizarCategoria,
  eliminar: eliminarCategoria,
}

const API_ZONAS = {
  listar: listarZonas,
  crear: crearZona,
  actualizar: actualizarZona,
  eliminar: eliminarZona,
}

// Solo ADMIN (ver RutaAdmin en App.jsx)
function Admin() {
  return (
    <div className="container py-4">
      <h1 className="h3 mb-1">Administración</h1>
      <p className="text-secundario">
        Categorías y zonas que se usan en el buscador y al publicar servicios.
      </p>
      <div className="admin-grilla">
        <SeccionAdmin
          id="categorias"
          titulo="Categorías"
          singular="categoría"
          plural="categorías"
          campos={CAMPOS_CATEGORIA}
          api={API_CATEGORIAS}
        />
        <SeccionAdmin
          id="zonas"
          titulo="Zonas"
          singular="zona"
          plural="zonas"
          campos={CAMPOS_ZONA}
          api={API_ZONAS}
        />
      </div>
    </div>
  )
}

export default Admin
