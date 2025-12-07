import express from "express";
import serverless from "serverless-http";
import path from "path";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(process.cwd(), "ejercicio1-node.js/public")));

// Configuración de vistas
app.set("views", path.join(process.cwd(), "ejercicio1-node.js/frontend"));
app.set("view engine", "ejs");

// Ruta principal
app.get("/", (req, res) => {
  res.render("index", { profesor: "Carlos Márquez" });
});

// Procesar formulario
app.post("/procesar", (req, res) => {
  const animal = req.body.animal || "No especificado";
  res.render("resultado", { animal });
});

export const handler = serverless(app);
