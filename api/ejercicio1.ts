// api/ejercicio1.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import * as fs from 'fs';
import * as path from 'path';

// Ruta a la carpeta que contiene tus HTML
const frontendDir = path.join(process.cwd(), 'ejercicio1-node.js', 'frontend');

export default async (req: VercelRequest, res: VercelResponse) => {
    
    // 1. Manejo del GET: Carga la Vista 1 (Formulario)
    if (req.method === 'GET') {
        const indexPath = path.join(frontendDir, 'index.html');
        const indexHtml = fs.readFileSync(indexPath, 'utf-8');
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(indexHtml);
    }

    // 2. Manejo del POST: Intercepta y Recarga la Vista 2 (Resultado)
    if (req.method === 'POST') {
        // Intercepta el dato del formulario
        const animalFavorito = req.body?.animal; 

        if (!animalFavorito) {
            return res.status(400).send('<h1>Error</h1><p>Animal no recibido.</p>');
        }

        // Procesa: Lee la plantilla HTML
        const resultadoPath = path.join(frontendDir, 'resultado.html');
        let resultadoHtml = fs.readFileSync(resultadoPath, 'utf-8');
        
        // Recarga: Reemplaza el placeholder y devuelve el HTML final
        resultadoHtml = resultadoHtml.replace('{{animal}}', animalFavorito);

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(resultadoHtml);
    }
    
    return res.status(405).send('Método no permitido.');
};