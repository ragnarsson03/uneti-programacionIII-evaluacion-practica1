import express from "express";
import serverless from "serverless-http";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Archivos estáticos
app.use(express.static(path.join(__dirname, "../ejercicio1-node.js/frontend/public")));

// Leer formularios
app.use(express.urlencoded({ extended: true }));

// Configuración EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../ejercicio1-node.js/frontend/views"));

// Rutas
app.get("/", (req, res) => {
    res.render("index", {
        animalesEjemplos: ["Gato", "Perro", "Delfín"]
    });
});

app.post("/procesar", (req, res) => {
    const { animal } = req.body;
    res.render("resultado", {
        animal: animal?.trim() || "No ingresaste ningún animal."
    });
});

// Exportar como serverless
export const handler = serverless(app);
