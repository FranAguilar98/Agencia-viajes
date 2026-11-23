# FastCheck: agencia de viajes

Sitio web de una agencia de viajes desarrollado con **React + Vite**, **React Router** y **Tailwind CSS**. El usuario elige un destino, revisa los vuelos y hoteles disponibles y arma su viaje. Los datos vienen de una **API REST mock** y una **API GraphQL mock** hechas con MSW.

## Sitio publicado
https://github.com/FranAguilar98/Agencia-viajes.git

## Funcionalidades

- **Destinos** (`/destinos`): lista obtenida desde la API REST mock con Osaka (Japón), Río de Janeiro (Brasil), Madrid (España) y Ciudad de México (México).
- **Detalle de destino** (`/destinos/:id`): muestra el destino (REST) y consulta por GraphQL los vuelos y hoteles disponibles, con precios, fechas y disponibilidad.
- **Descuento de disponibilidad**: cada asiento o habitación que se agrega al viaje resta un cupo. Al llegar a 0 aparece "Sin disponibilidad" y el botón se bloquea.
- **Mi viaje** (`/mi-viaje`): lista lo elegido; con + y - se cambia la cantidad (al restar, el cupo vuelve a estar disponible). También se puede quitar una línea completa o vaciar el viaje. Muestra el total en pesos chilenos.
- **Contáctanos** (`/contacto`): datos de contacto de la agencia y un formulario que no se envía si no cumple el mínimo de caracteres y muestra un aviso. No acepta símbolos en el nombre ni en el mensaje.
- **Página de error**: cualquier ruta que no existe muestra "Página no encontrada".

> Las fotos de los destinos y de la portada están en `public/img/`. Si una foto no existe, la tarjeta muestra solo el degradé de color del destino.
>
> Los datos viven en memoria: al recargar la página el viaje vuelve a quedar vacío y los cupos a su valor inicial.

## Tecnologías

- React 19
- Vite 6
- React Router 7
- Context API + `useReducer`
- Tailwind CSS 4 (`@tailwindcss/vite`, prefijo `tw`)
- MSW 3.0.5 (API REST y GraphQL mock) y `graphql`
- Vitest y Testing Library
- gh-pages

Requiere **Node.js 22.12 o superior** (lo exige MSW 3).

## Estructura

```
public/               imágenes (img/) y mockServiceWorker.js (generado por MSW)
src/
├── components/       Componentes reutilizables: Navegacion, Pie, Aviso, Boton,
│                     CampoFormulario, Cargando, TarjetaDestino, TarjetaVuelo,
│                     TarjetaHotel, ItemViaje
├── context/          ViajeContext (contexto), ViajeProvider (estado y acciones),
│                     viajeReducer (reglas del viaje y de los cupos)
├── hooks/            useViaje (consume el contexto), useFormulario (lógica de formularios)
├── mocks/            handlers (datos y respuestas REST y GraphQL), browser (activa MSW)
├── pages/            Inicio, Destinos, DetalleDestino, MiViaje, Contacto, NoEncontrado
├── util/             api (peticiones), config (constantes y datos de contacto),
│                     formato (precios y fechas), validaciones (formulario)
├── App.jsx           Rutas del sitio
├── index.css         Estilos generales
├── tailwind.css      Tailwind, prefijo y colores del tema
└── main.jsx          Activa MSW y monta Router + ViajeProvider
test/                 Pruebas (Vitest): setup, handlers, viajeReducer, Contacto
```

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/destinos` | Lista de destinos |
| `/destinos/:id` | Detalle con vuelos y hoteles |
| `/mi-viaje` | Viaje armado por el usuario |
| `/contacto` | Contáctanos |
| `*` | Página no encontrada |

## APIs mock

Los archivos de `src/mocks/` usan MSW para interceptar las peticiones `fetch`. `handlers.js` contiene los datos y las respuestas; `browser.js` activa MSW en el navegador. En las pruebas, `test/setup.js` reutiliza los mismos handlers con `setupServer`.

**API REST**

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/destinos` | Lista de destinos con país y resumen |
| GET | `/api/destinos/:id` | Un destino (404 si no existe) |

**API GraphQL** (`POST /graphql`)

```graphql
query OpcionesViaje($destinoId: String!) {
    opcionesViaje(destinoId: $destinoId) {
        vuelos { id aerolinea origen salida llegada precio asientosDisponibles }
        hoteles { id nombre estrellas precioNoche noches desde hasta habitacionesDisponibles }
    }
}
```

Las páginas cargan los datos con `useState` y `useEffect`, muestran un indicador mientras llegan y un aviso si hay un error. Cada petición se cancela con `AbortController` si el usuario sale de la página.

## Estado global

El viaje vive en un solo estado (`ViajeContext`) administrado con `useReducer`:

- `items`: líneas `{ clave, tipo, destino, nombre, detalle, precio, disponibles, cantidad }`.
- Los cupos que quedan se calculan como `disponibles - cantidad`.

Las acciones (`AGREGAR_ITEM`, `QUITAR_UNIDAD`, `QUITAR_ITEM`, `VACIAR_VIAJE`) se resuelven dentro del reducer, que además impide pasar de los cupos disponibles.

## Validaciones del formulario de contacto

| Campo | Regla |
|---|---|
| Nombre | Mínimo 3 caracteres, solo letras y espacios |
| Correo | Formato válido |
| Mensaje | Mínimo 10 caracteres, solo letras, números y puntuación básica |

Si hay errores, el formulario no se envía y se muestran todos juntos con un aviso.

## Diseño

Diseño responsivo (celular, tablet y escritorio) con Tailwind. Paleta basada en verde azulado oscuro con acentos verde lima:

| Color | Código | Uso |
|---|---|---|
| Verde azulado | `#123f45` | Fondos principales y pie de página |
| Verde azulado muy oscuro | `#0c2c31` | Barra de navegación |
| Verde lima | `#d4f58b` | Títulos destacados y botones |
| Crema | `#f5f8ee` | Fondo de la página |

## Decisiones técnicas

- **`HashRouter`**: el sitio se publica en GitHub Pages, que es un alojamiento estático y no puede redirigir rutas como `/mi-viaje` a `index.html`. Con `BrowserRouter`, recargar en una ruta interna daría error 404. `HashRouter` deja la ruta después del `#` (`/#/mi-viaje`), que el servidor nunca recibe.
- **MSW también en producción**: como no hay un servidor real, `main.jsx` activa MSW al iniciar y la ruta del worker usa `import.meta.env.BASE_URL`, para que funcione bajo la subruta de GitHub Pages.
- **Prefijo `tw`**: todas las clases de Tailwind llevan el prefijo `tw:` (por ejemplo `tw:flex` o `tw:md:grid-cols-2`), configurado en `tailwind.css`.
- **MSW 3.0.5**: `http` se importa desde `msw` y `graphql` desde `msw/graphql`. El worker de `public/` debe tener la misma versión que el paquete (`npx msw init public/ --save`).
- **Pruebas de handlers en entorno `node`**: el archivo `handlers.test.js` usa `// @vitest-environment node`, porque en Node 24 o superior el `fetch` rechaza el `AbortSignal` de jsdom.
- **Datos de contacto en `config.js`**: teléfono, dirección y correo están en un solo lugar.

## Ejecución local

```bash
npm install
npm run dev
```

Si falta `public/mockServiceWorker.js`, o su versión no coincide con la de MSW:

```bash
npx msw init public/ --save
```

Otros comandos:

```bash
npm test        # pruebas (Vitest)
npm run build   # versión de producción
npm run preview # sirve la versión de producción
```

## Pruebas

Hay 18 pruebas automáticas:

- **handlers** (6): API REST y GraphQL mock (destinos, vuelos, hoteles y destino inexistente).
- **viajeReducer** (7): agregar, descontar cupos, límite de disponibilidad, quitar y vaciar.
- **Contacto** (5): validaciones y aviso del formulario.


## Publicación en GitHub Pages

```bash
npm run deploy
```

Requiere que `base` en `vite.config.js` y `homepage` en `package.json` coincidan con el nombre del repositorio.