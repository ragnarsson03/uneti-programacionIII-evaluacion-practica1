import express from "express";
import serverless from "serverless-http";
import path from "path";

const app = express();

// Middleware para procesar formularios
app.use(express.urlencoded({ extended: true }));

// Aquí van los archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Vistas (EJS) si quieres mantener plantillas dinámicas
app.set("views", path.join(__dirname, "../frontend"));
app.set("view engine", "ejs");

// Ruta principal (formulario)
app.get("/", (req, res) => {
  res.render("index", { animalesEjemplos: ["Gato", "Perro", "Delfín"] });
});

// Procesar formulario
app.post("/", (req, res) => {
  const { animal } = req.body;
  res.render("resultado", { animal: animal || "No ingresado" });
});

// Exportar para Vercel
export const handler = serverless(app);
