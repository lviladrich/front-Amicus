# front-Amicus

Front de Amicus, el marketplace de servicios del hogar del Grupo 1 (Aplicaciones Interactivas, UADE).
React + Vite + React Router + Bootstrap. El back está en [back-Amicus](https://github.com/lviladrich/back-Amicus).

## Cómo correrlo

1. Levantar el back (`http://localhost:8080`, ver su README).
2. En este repo:

```bash
npm install
npm run dev     # http://localhost:5173
npm run lint
npm run build
```

Usuario de prueba del back: `admin@amicus.com` / `admin123` (rol ADMIN, ve la pantalla de Administración), o crear
uno desde "Crear cuenta".

## Pantallas

| Ruta | Pantalla | Sesión |
|---|---|---|
| `/` | Inicio: buscador por frase y palabra clave, categorías y servicios paginados | No |
| `/servicios/:id` | Detalle del servicio, reseñas y panel de compra | No (para comprar o reseñar, sí) |
| `/login`, `/registro` | Acceso | No |
| `/carrito` | Carrito: cantidad, frecuencia, quitar y vaciar | Sí |
| `/ordenes/:id/confirmacion` | Confirmación de compra | Sí |
| `/ordenes` | Mis órdenes | Sí |
| `/ordenes/:id` | Detalle de una orden (con cancelar) | Sí |
| `/perfil` | Mi perfil | Sí |
| `/mis-servicios` | Mis servicios: cupos, editar y dar de baja | Sí |
| `/mis-servicios/nuevo`, `/mis-servicios/:id/editar` | Publicar o editar un servicio (con fotos) | Sí |
| `/admin` | Administración de categorías y zonas | Sí, rol ADMIN |
| `/ayuda`, `/terminos` | Ayuda (preguntas frecuentes) y Términos y condiciones | No |
| cualquier otra | Página 404 | No |

Las rutas con sesión pasan por `RutaPrivada` (si no hay sesión, mandan al login y vuelven después). `/admin` usa
`RutaAdmin`, que además pide el rol ADMIN; el link aparece en el menú de usuario solo para ese rol.

## Estructura

```
src/
  api/amicus.js         todas las llamadas al back (contrato en docs/API.md)
  context/              sesión (token y usuario) y carrito (para el contador del header)
  hooks/                useSesion, useCarrito
  components/
    layout/             Header, Footer, Logo, BotonCarrito, MenuUsuario
    comunes/            Cargando, MensajeError, ModalConfirmacion, Paginacion, RutaPrivada, RutaAdmin
    inicio/ detalle/ acceso/ carrito/ confirmacion/   componentes de las pantallas de la maqueta
    ordenes/ perfil/ misServicios/ admin/              componentes de Mis órdenes, Mi perfil, Mis servicios y Administración
  pages/                una página por ruta
  styles/               amicus.css (paleta y clases comunes) + un css por pantalla
  utils/                formato de precios y fechas, colores e íconos por categoría
docs/
  API.md                endpoints que usa el front
  PENDIENTES.md         lo que falta, dividido en tareas
```

## Lo que falta

Ver [docs/PENDIENTES.md](docs/PENDIENTES.md).
