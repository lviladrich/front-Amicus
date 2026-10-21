# Pendientes del front

Las 6 pantallas de la maqueta (Inicio, Detalle, Login, Registro, Carrito y Confirmación) ya están hechas. Lo que sigue
cubre los endpoints del back que todavía no tienen pantalla (la consigna pide cubrirlos todos) y algunos detalles
de la maqueta. Cada tarea está pensada para una rama y uno o más commits propios.

Antes de arrancar leé `docs/API.md` (contrato del back) y fijate cómo están hechas las pantallas existentes:
llamadas en `src/api/amicus.js`, `useEffect` con loading y error, estilos en `src/styles/<pantalla>.css` y las
clases comunes de `src/styles/amicus.css`. Buscá `TODO (ver docs/PENDIENTES.md)` en el código para ver dónde
engancha cada tarea.

## Bloque A · Cuenta del usuario

### A1. Menú de usuario desplegable
- Dónde: `src/components/layout/MenuUsuario.jsx` (hoy muestra iniciales, nombre y "Salir").
- Qué: convertirlo en un dropdown con "Mi perfil", "Mis órdenes" y "Salir". Cerrar con Escape y al hacer clic afuera.
- Rama sugerida: `feature/menu-usuario`.

### A2. Pantalla Mi perfil
- Endpoints: `GET /auth/usuarios/{id}` y `PUT /auth/usuarios/{id}` con `{ nombre, apellido, email }`.
- Qué: ruta privada `/perfil` (agregarla en `src/App.jsx` envuelta en `RutaPrivada`), formulario reutilizando
  `Campo` de `src/components/acceso/`, mostrar errores del back por campo. Al guardar, actualizar el usuario de la
  sesión (agregar una función `actualizarUsuario` en `src/context/SesionProvider.jsx`).
- Funciones nuevas en `src/api/amicus.js`: `obtenerUsuario(id)`, `actualizarPerfil(id, datos)`.
- Rama sugerida: `feature/perfil`.

### A3. Recuperar contraseña
- Dónde: `src/components/acceso/FormularioLogin.jsx`.
- El back no tiene endpoint para esto. Opción mínima: link "Olvidé mi contraseña" a una pantalla informativa.
  Si se quiere completo, primero hay que agregar el endpoint en back-Amicus.

## Bloque B · Órdenes y carrito

### B1. Mis órdenes
- Endpoint: `GET /ordenes?page=&size=` (paginado).
- Qué: ruta privada `/ordenes` con la lista (número, fecha, estado, total) y link a cada orden. Se puede reutilizar
  `DetalleOrden` de `src/components/confirmacion/` para ver una orden (`/ordenes/:id`).
- Rama sugerida: `feature/mis-ordenes`.

### B2. Cancelar orden
- Endpoint: `PATCH /ordenes/{id}/cancelar` (devuelve la orden con estado `CANCELADA`).
- Dónde: `src/components/confirmacion/DetalleOrden.jsx` y la pantalla de B1. Pedir confirmación antes (modal).
- Rama sugerida: `feature/cancelar-orden`.

### B3. Vaciar carrito
- Endpoint: `DELETE /carrito` (devuelve el carrito vacío).
- Dónde: `src/components/carrito/ListaCarrito.jsx`. Guardar la respuesta con `setCarrito` para que se actualice el
  contador del header. Pedir confirmación antes.
- Rama sugerida: `feature/vaciar-carrito`.

## Bloque C · Búsqueda y reseñas

### C1. Búsqueda por texto, "solo con cupo" y paginación
- Endpoint: `GET /servicios?q=&conCupo=&page=&size=` (`buscarServicios` ya acepta esos filtros).
- Dónde: `src/components/inicio/BuscadorFrase.jsx` y `src/components/ListaServicios.jsx`.
- Qué: campo de texto libre, switch "Solo con cupo" y un componente `Paginacion` reutilizable que use
  `totalPaginas`, `esPrimera` y `esUltima`.
- Rama sugerida: `feature/busqueda-paginacion`.

### C2. Crear y eliminar reseñas
- Endpoints: `POST /servicios/{id}/resenas` con `{ puntaje (1-5), comentario }` y `DELETE /resenas/{id}`.
- Dónde: `src/components/detalle/ListaResenas.jsx`. Formulario con selector de estrellas, solo visible con sesión.
  El botón eliminar se muestra solo en las reseñas del usuario (`autorId === usuario.id`) o si es ADMIN.
  Después de crear o borrar, volver a pedir las reseñas y el servicio (cambia el promedio).
- También paginar las reseñas (hoy se ve solo la primera página).
- Rama sugerida: `feature/resenas`.

## Bloque D · Profesional y administración

### D1. Mis servicios (panel del profesional)
- Endpoints: `GET /servicios/profesional/{profesionalId}`, `POST /servicios`, `PUT /servicios/{id}`,
  `DELETE /servicios/{id}`.
- Qué: ruta privada `/mis-servicios` con la lista y un formulario de alta y edición (título, descripción, precio,
  cupos, categoría y zonas; reutilizar `listarCategorias` y `listarZonas`).
- Rama sugerida: `feature/mis-servicios`.

### D2. Cupos e imágenes del servicio
- Endpoints: `PATCH /servicios/{id}/cupos` con `{ cuposDisponibles }`, `POST /servicios/{id}/imagenes` con
  `{ url, ordenVisualizacion }` y `DELETE /servicios/{id}/imagenes/{imagenId}`.
- Dónde: dentro del panel de D1.
- Rama sugerida: `feature/cupos-imagenes`.

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
- E4. Mensaje global cuando el token vence (hoy, si `GET /carrito` devuelve 401 se cierra la sesión sin avisar;
  ver `src/context/CarritoProvider.jsx` y `src/pages/Carrito.jsx`).
