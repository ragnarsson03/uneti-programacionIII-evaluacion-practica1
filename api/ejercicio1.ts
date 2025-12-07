import express, { Request, Response } from "express";
import serverless from "serverless-http";
import path from "path";

const app = express();

// Middleware para procesar formularios
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(process.cwd(), "ejercicio1-node.js/frontend/public")));

// Configuración de vistas EJS
app.set("views", path.join(process.cwd(), "ejercicio1-node.js/frontend/views"));
app.set("view engine", "ejs");

// Ruta principal (formulario)
app.get("/", (req: Request, res: Response) => {
  res.render("index", { profesor: "Carlos Márquez" });
});

// Procesar formulario
app.post("/procesar", (req: Request, res: Response) => {
  const animal = req.body.animal || "No especificado";
  res.render("resultado", { animal });
});

// Exportar para Vercel
export const handler = serverless(app);
