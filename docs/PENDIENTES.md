# Pendientes del front

Las 6 pantallas de la maqueta (Inicio, Detalle, Login, Registro, Carrito y Confirmación) ya están hechas, y también
Mi perfil, Mis órdenes (con cancelar), vaciar el carrito, la búsqueda por texto con filtro de cupo y paginación, las
reseñas (crear, borrar y paginar), y Mis servicios (publicar, editar, cupos y fotos), las páginas de Ayuda, Términos y 404, y el profesional y
las zonas en las tarjetas. Lo que sigue cubre los endpoints del back que todavía no tienen pantalla (la consigna
pide cubrirlos todos). Cada tarea está pensada para una rama y uno o más commits propios.

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
