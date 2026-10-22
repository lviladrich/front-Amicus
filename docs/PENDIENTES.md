# Pendientes del front

Las 6 pantallas de la maqueta (Inicio, Detalle, Login, Registro, Carrito y Confirmación) ya están hechas, y también
Mi perfil, Mis órdenes (con cancelar), vaciar el carrito, la búsqueda por texto con filtro de cupo y paginación, las
reseñas (crear, borrar y paginar), y Mis servicios (publicar, editar, cupos y fotos). Lo que sigue cubre los
endpoints del back que todavía no tienen pantalla (la consigna pide cubrirlos todos) y algunos detalles de la
maqueta. Cada tarea está pensada para una rama y uno o más commits propios.

Antes de arrancar leé `docs/API.md` (contrato del back) y fijate cómo están hechas las pantallas existentes:
llamadas en `src/api/amicus.js`, `useEffect` con loading y error, estilos en `src/styles/<pantalla>.css` y las
clases comunes de `src/styles/amicus.css`. Buscá `TODO (ver docs/PENDIENTES.md)` en el código para ver dónde
engancha cada tarea.

## Bloque A · Cuenta del usuario

### A3. Recuperar contraseña
- Dónde: `src/components/acceso/FormularioLogin.jsx`.
- El back no tiene endpoint para esto. Opción mínima: link "Olvidé mi contraseña" a una pantalla informativa.
  Si se quiere completo, primero hay que agregar el endpoint en back-Amicus.

## Bloque D · Profesional y administración

### D3. Administración de categorías y zonas (solo ADMIN)
- Endpoints: `POST/PUT/DELETE /categorias` y `POST/PUT/DELETE /zonas`.
- Qué: ruta `/admin` visible solo si `usuario.rol === 'ADMIN'` (usuario de prueba del back: `admin@amicus.com` /
  `admin123`). Tabla + formulario simple para cada una.
- Rama sugerida: `feature/admin`.

## Bloque E · Detalles de la maqueta

- E1. Páginas de Ayuda y Términos enlazadas desde `src/components/layout/Footer.jsx`.
- E2. La tarjeta de servicio de la maqueta muestra el nombre del profesional y las zonas, pero
  `ServicioResumenResponse` no los trae. Hay que agregarlos en el back (`profesional`, `zonas`) y después
  mostrarlos en `src/components/TarjetaServicio.jsx`. Lo mismo para el ítem del carrito (profesional y categoría).
- E3. Página 404 para rutas que no existen (`<Route path="*">` en `src/App.jsx`).
