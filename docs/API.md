# Contrato con el back (back-Amicus)

Base: `http://localhost:8080/api` (ver `src/api/amicus.js`). Las rutas marcadas con 🔒 necesitan el header
`Authorization: Bearer <token>` (el token lo devuelve el login y `src/api/amicus.js` lo agrega solo).

Los errores vienen como `{ estado, error, mensaje, ruta, errores: { campo: mensaje } }`; `pedir()` los convierte en
`ErrorApi` con `.message`, `.estado` y `.errores`. Las listas paginadas vienen como
`{ contenido: [], pagina, tamanio, totalElementos, totalPaginas, esPrimera, esUltima }`.

## Usados por las pantallas

| Pantalla | Método y ruta | Respuesta |
|---|---|---|
| Inicio | `GET /servicios?categoriaId&zonaId&q&conCupo&page&size` | Página de `{ id, titulo, precio, cuposDisponibles, disponible, categoria, imagenPortada, profesional, zonas[] }` (`profesional` es "Nombre Apellido" y `zonas` son los nombres) |
| Inicio | `GET /categorias` | `[{ id, nombre, descripcion }]` |
| Inicio | `GET /zonas` | `[{ id, nombre }]` |
| Detalle | `GET /servicios/{id}` | `{ id, titulo, descripcion, precio, cuposDisponibles, disponible, fechaPublicacion, categoria{id,nombre}, profesional{id,username,nombre,apellido}, imagenes[{id,url}], zonas[{id,nombre}], promedioPuntaje, cantidadResenas }` |
| Detalle | `GET /servicios/{id}/resenas?page` | Página de `{ id, puntaje, comentario, fecha, autorId, autor }` |
| Login | `POST /auth/login` `{ email, password }` | `{ token, tipo, expiraEnSegundos, usuario{ id, username, email, nombre, apellido, rol } }` |
| Registro | `POST /auth/registro` `{ username, email, password, nombre, apellido }` | `usuario` (después se hace login automático) |
| Carrito 🔒 | `GET /carrito` | `{ id, usuarioId, items[{ id, servicioId, titulo, precioUnitario, cantidad, frecuencia, subtotal, cuposDisponibles, disponible, profesional, categoria }], total, cantidadDeItems }` |
| Detalle 🔒 | `POST /carrito/items` `{ servicioId, cantidad, frecuencia }` | carrito |
| Carrito 🔒 | `PUT /carrito/items/{itemId}` `{ cantidad, frecuencia }` | carrito |
| Carrito 🔒 | `DELETE /carrito/items/{itemId}` | carrito |
| Carrito 🔒 | `POST /carrito/checkout` | orden |
| Confirmación 🔒, Detalle de orden 🔒 | `GET /ordenes/{id}` | `{ id, usuarioId, fecha, estado (CONFIRMADA/CANCELADA), total, items[{ id, servicioId, titulo, cantidad, frecuencia, precioUnitario, subtotal }] }` |
| Confirmación 🔒, Detalle de orden 🔒 | `PATCH /ordenes/{id}/cancelar` | orden, con `estado: CANCELADA` |
| Mi perfil 🔒 | `GET /auth/usuarios/{id}` | `{ id, username, email, nombre, apellido, rol }` |
| Mi perfil 🔒 | `PUT /auth/usuarios/{id}` `{ nombre, apellido, email }` | usuario actualizado |
| Mis órdenes 🔒 | `GET /ordenes?page&size` | Página de `{ id, usuarioId, fecha, estado, total, items[...] }` |
| Carrito 🔒 | `DELETE /carrito` | carrito vacío |
| Detalle 🔒 | `POST /servicios/{id}/resenas` `{ puntaje (1-5), comentario? }` | `{ id, puntaje, comentario, fecha, autorId, autor }` |
| Detalle 🔒 | `DELETE /resenas/{id}` | — (204, solo el autor puede borrar la suya) |
| Administración 🔒 ADMIN | `POST /categorias` `{ nombre, descripcion? }`, `PUT /categorias/{id}`, `DELETE /categorias/{id}` | categoría (`DELETE`: 204; 409 si algún servicio la usa) |
| Administración 🔒 ADMIN | `POST /zonas` `{ nombre }`, `PUT /zonas/{id}`, `DELETE /zonas/{id}` | zona (`DELETE`: 204; 409 si algún servicio la usa) |

`frecuencia` es uno de `UNICA`, `SEMANAL`, `QUINCENAL`, `MENSUAL` (ver `FRECUENCIAS` en `src/utils/formato.js`).

## Todavía sin pantalla

Solo `GET /categorias/{id}` y `GET /zonas/{id}`, que no hacen falta: `GET /categorias` y `GET /zonas` ya traen todos los
datos. Mis servicios cubre el panel del profesional y Administración (`/admin`) cubre categorías y zonas.
