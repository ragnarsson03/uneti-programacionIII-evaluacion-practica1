# 📄 Documentación del Proyecto: Ejercicio 1 - Node.js

## 1. Descripción General

Este documento detalla la estructura y el funcionamiento del proyecto "Ejercicio 1", una aplicación web simple construida con Node.js, Express, TypeScript y EJS. La aplicación presenta un formulario donde el usuario puede ingresar su animal favorito, y al enviarlo, muestra el resultado en una nueva página.

## 2. Estructura de Archivos y Carpetas

El proyecto está organizado en dos directorios principales: `backend` y `frontend`, para separar las responsabilidades del servidor y del cliente.

```
ejercicio1-node.js/
│
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   └── server.ts       # Lógica principal del servidor Express
│   ├── package.json        # Dependencias y scripts del backend
│   ├── tsconfig.json       # Configuración de TypeScript
│   └── ...
│
├── frontend/
│   ├── public/
│   │   └── styles.css      # Hoja de estilos para las vistas
│   └── views/
│       ├── index.ejs       # Plantilla del formulario principal
│       └── resultado.ejs   # Plantilla para mostrar el resultado
│
└── Readme.md               # README original del ejercicio
└── DOCUMENTACION.md        # Este archivo
```

---

## 3. Análisis del Backend

El backend está construido con **Express** y escrito en **TypeScript**. Su lógica principal se encuentra en el archivo [`server.ts`](ejercicio1-node.js/backend/src/server.ts).

### Funcionalidades Clave:

1.  **Inicialización del Servidor**:
    *   Se crea una instancia de Express y se configura para escuchar en el `PORT 3000`.

2.  **Middlewares**:
    *   `express.static()`: Se utiliza para servir archivos estáticos desde la carpeta [`frontend/public`](ejercicio1-node.js/frontend/public/). Esto permite que el navegador acceda directamente a `styles.css`.
    *   `express.urlencoded()`: Esencial para parsear (interpretar) los datos enviados desde un formulario HTML a través de una petición `POST`. Sin este middleware, `req.body` estaría vacío.

3.  **Configuración del Motor de Vistas (EJS)**:
    *   `app.set("view engine", "ejs")`: Establece EJS como el motor de plantillas por defecto.
    *   `app.set("views", ...)`: Indica a Express que las plantillas (archivos `.ejs`) se encuentran en el directorio [`frontend/views`](ejercicio1-node.js/frontend/views/).

### Rutas Definidas:

*   **`GET /`**
    *   **Propósito**: Mostrar la página principal con el formulario.
    *   **Acción**: Renderiza la plantilla [`index.ejs`](ejercicio1-node.js/frontend/views/index.ejs).
    *   **Datos enviados a la vista**: Pasa un array `animalesEjemplos` a la plantilla, que se utiliza para mostrar una lista de ejemplos.

*   **`POST /procesar`**
    *   **Propósito**: Recibir y procesar los datos del formulario.
    *   **Acción**:
        1.  Extrae el valor del campo `animal` del cuerpo de la solicitud (`req.body`).
        2.  Valida si el campo no está vacío.
        3.  Renderiza la plantilla [`resultado.ejs`](ejercicio1-node.js/frontend/views/resultado.ejs).
    *   **Datos enviados a la vista**: Pasa un objeto `{ animal: "..." }` con el valor ingresado por el usuario.

### Dependencias del Backend (`package.json`):

*   **Producción**:
    *   `express`: El framework web para Node.js.
    *   `ejs`: El motor de plantillas.
*   **Desarrollo**:
    *   `typescript`, `ts-node`, `@types/*`: Herramientas para compilar y ejecutar TypeScript en Node.js.

---

## 4. Análisis del Frontend

El frontend se compone de las vistas EJS y una hoja de estilos CSS.

### Vistas EJS:

*   **[`index.ejs`](ejercicio1-node.js/frontend/views/index.ejs)**:
    *   Contiene un formulario HTML que envía una petición `POST` a la ruta `/procesar`.
    *   El campo de entrada (`<input>`) tiene el atributo `name="animal"`, que es la clave que el backend utiliza para obtener el valor desde `req.body.animal`.
    *   Utiliza sintaxis EJS (`<% ... %>`) para iterar sobre el array `animalesEjemplos` y mostrar una lista `<ul>` dinámica.

*   **[`resultado.ejs`](ejercicio1-node.js/frontend/views/resultado.ejs)**:
    *   Es una página simple que muestra el resultado.
    *   Utiliza la sintaxis `<%= animal %>` para inyectar y mostrar el valor de la variable `animal` que fue enviada desde el servidor en el método `res.render()`.
    *   Incluye un enlace para volver a la página de inicio.

### Hoja de Estilos (`styles.css`):

*   Ubicada en [`frontend/public/styles.css`](ejercicio1-node.js/frontend/public/styles.css).
*   Proporciona un diseño visual básico y limpio, centrando el contenido en un contenedor con sombra, y estilizando los elementos del formulario para una mejor experiencia de usuario.

---

## 5. Flujo de la Aplicación (Cómo Funciona)

1.  El usuario abre `http://localhost:3000` en su navegador.
2.  El servidor Express recibe la petición `GET /` y responde renderizando la vista `index.ejs`.
3.  El navegador muestra el formulario HTML. El usuario escribe un animal y presiona "Enviar".
4.  El formulario envía una petición `POST` a la ruta `/procesar` con los datos (`animal=valor_ingresado`).
5.  El servidor recibe la petición, el middleware `express.urlencoded()` procesa los datos y los añade a `req.body`.
6.  El manejador de la ruta `POST /procesar` extrae el valor de `req.body.animal`.
7.  El servidor renderiza la vista `resultado.ejs`, pasándole el animal ingresado.
8.  El navegador muestra la página de resultado con el mensaje final.