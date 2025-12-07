# Frontend – Ejercicio 1

Este directorio contiene las plantillas EJS y los archivos estáticos utilizados por el servidor Express.

## 📁 Estructura


frontend/
├── views/
│ ├── index.ejs → Formulario para ingresar el animal
│ └── resultado.ejs → Vista generada dinámicamente
└── public/
└── styles.css → Estilos de la aplicación

## 🔧 Motor de plantillas
Las vistas son procesadas por el backend mediante:

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));

## 🎨 Estilos
El archivo `styles.css` se sirve desde la carpeta pública configurada en Express.