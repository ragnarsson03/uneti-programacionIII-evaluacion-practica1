import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Configurar EJS como motor de plantillas
app.set("views", path.join(__dirname, "../../frontend/views"));
app.set("view engine", "ejs");

// Servir archivos estáticos desde la carpeta public del frontend
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Ruta principal que renderiza la vista index
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});