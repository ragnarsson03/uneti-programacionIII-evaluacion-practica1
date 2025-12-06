/**
 * Servidor desarrollado para el Ejercicio 1 de la Evaluación Práctica 1 – Programación III.
 * Autor: Frederick Durán =)
 * Descripción:
 * - Servidor Node.js usando Express y TypeScript.
 * - Procesa un formulario enviado por el usuario.
 * - Renderiza vistas dinámicas con el motor de plantillas EJS.
 */

import express, { type Request, type Response } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// --------------------------------------------------------------
// Este Middleware es necesario para procesar datos enviados desde formularios
// --------------------------------------------------------------
// Servir archivos estáticos (CSS, imágenes, JS del frontend)
// --------------------------------------------------------------
app.use(express.static(path.join(__dirname, "../../frontend/public")));

// --------------------------------------------------------------
// Middleware necesario para procesar datos enviados desde formularios
// --------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------------------------
// Configuración del motor de plantillas EJS
// Se indica a Express dónde se encuentran las vistas (frontend/views)
// --------------------------------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../frontend/views"));

// --------------------------------------------------------------
// Ejemplo de lista de animales que puede usar el profesor
// --------------------------------------------------------------
const animalesEjemplos = ["Gato", "Perro", "Delfín"];

// --------------------------------------------------------------
// Ruta principal: muestra el formulario index.ejs
// --------------------------------------------------------------
app.get("/", (req: Request, res: Response) => {
    res.render("index", { animalesEjemplos });
});

// --------------------------------------------------------------
// Ruta de POST /procesar: recibe el animal enviado en el formulario
// --------------------------------------------------------------
app.post("/procesar", (req: Request, res: Response) => {
    const { animal } = req.body;

    // En caso de error o envío vacío
    if (!animal || animal.trim() === "") {
        return res.render("resultado", { animal: "No ingresaste ningún animal." });
    }

    res.render("resultado", { animal });
});

// --------------------------------------------------------------
// Inicialización del servidor
// --------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});