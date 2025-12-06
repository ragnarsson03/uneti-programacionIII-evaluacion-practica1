import express from "express";
import serverless from "serverless-http";
import path from "path";

const app = express();

// Middleware para formularios
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(process.cwd(), "ejercicio1-node.js/public")));

// Configuración de vistas EJS
app.set("views", path.join(process.cwd(), "ejercicio1-node.js/frontend"));
app.set("view engine", "ejs");

// Rutas
app.get("/", (req, res) => {
  res.render("index", {
    profesor: "Carlos Márquez"
  });
});

app.post("/procesar", (req, res) => {
  const animal = req.body.animal || "No especificado";
  res.render("resultado", { animal });
});

// Exportar como función serverless
export const handler = serverless(app);
