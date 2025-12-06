import serverless from "serverless-http";
import express, { Request, Response } from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal
app.get("/", (req: Request, res: Response) => {
    res.send(`
        <h1>Ejercicio 1 – Animal Favorito</h1>
        <form method="POST" action="/api/animal">
            <label>Ingresa tu animal favorito:</label>
            <input name="animal" />
            <button type="submit">Enviar</button>
        </form>
    `);
});

// Ruta que procesa los datos
app.post("/", (req: Request, res: Response) => {
    const animal = req.body.animal || "No ingresado";
    res.send(`
        <h1>Resultado</h1>
        <p>Tu animal favorito es: <strong>${animal}</strong></p>
        <a href="/api/animal">Volver</a>
    `);
});

// Exportación serverless para Vercel
export const GET = serverless(app);
export const POST = serverless(app);
