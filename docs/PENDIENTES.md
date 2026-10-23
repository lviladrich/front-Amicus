# Pendientes del front

Las 6 pantallas de la maqueta (Inicio, Detalle, Login, Registro, Carrito y Confirmación) ya están hechas, y también
Mi perfil, Mis órdenes (con cancelar), vaciar el carrito, la búsqueda por texto con filtro de cupo y paginación, las
reseñas (crear, borrar y paginar), Mis servicios (publicar, editar, cupos y fotos), la Administración de categorías y
zonas, las páginas de Ayuda, Términos y 404, y el profesional y las zonas en las tarjetas. Con eso todos los endpoints
del back tienen pantalla, salvo `GET /categorias/{id}` y `GET /zonas/{id}`, que no hacen falta porque las listas ya
traen todos los datos. Cada tarea está pensada para una rama y uno o más commits propios.

Antes de arrancar leé `docs/API.md` (contrato del back) y fijate cómo están hechas las pantallas existentes:
llamadas en `src/api/amicus.js`, `useEffect` con loading y error, estilos en `src/styles/<pantalla>.css` y las
clases comunes de `src/styles/amicus.css`. Buscá `TODO (ver docs/PENDIENTES.md)` en el código para ver dónde
engancha cada tarea.

## Bloque A · Cuenta del usuario

### A3. Recuperar contraseña
- Dónde: `src/components/acceso/FormularioLogin.jsx`.
- El back no tiene endpoint para esto. Opción mínima: link "Olvidé mi contraseña" a una pantalla informativa.
  Si se quiere completo, primero hay que agregar el endpoint en back-Amicus.
