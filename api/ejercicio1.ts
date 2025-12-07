// api/ejercicio1.ts
// Este código reemplaza el tuyo, implementando la lectura de HTML
import { VercelRequest, VercelResponse } from '@vercel/node';
import * as fs from 'fs';
import * as path from 'path';

// Define la ruta base para leer los archivos HTML.
// Se asume que el directorio raíz es donde se encuentra 'ejercicio1-node.js'
const frontendDir = path.join(process.cwd(), 'ejercicio1-node.js', 'frontend');

export default async (req: VercelRequest, res: VercelResponse) => {
    // 1. Manejar la solicitud GET (Mostrar el formulario)
    if (req.method === 'GET') {
        try {
            const indexPath = path.join(frontendDir, 'index.html');
            // Nota: Se usa readFileSync ya que es Serverless y no afecta a otros clientes
            const indexHtml = fs.readFileSync(indexPath, 'utf-8');
            
            // ⚠️ Importante: Devuelve el HTML del formulario.
            res.setHeader('Content-Type', 'text/html');
            return res.status(200).send(indexHtml);
        } catch (error) {
            console.error('Error al cargar index.html:', error);
            return res.status(500).send('Error 500: No se pudo cargar el formulario del Ejercicio 1. Revise la ruta de lectura de archivos.');
        }
    }

    // 2. Manejar la solicitud POST (Procesar y mostrar el resultado)
    if (req.method === 'POST') {
        // Vercel/Node.js debería parsear automáticamente el cuerpo del formulario (x-www-form-urlencoded)
        const animalFavorito = req.body?.animal; // Asumiendo que el campo se llama 'animal' en el formulario

        if (!animalFavorito) {
            // Si no hay dato, redirige o muestra un error
            return res.status(400).send('<h1>Error</h1><p>Debe ingresar un animal favorito.</p>');
        }

        try {
            const resultadoPath = path.join(frontendDir, 'resultado.html');
            let resultadoHtml = fs.readFileSync(resultadoPath, 'utf-8');
            
            // ⚠️ Reemplaza el placeholder {{animal}} en el HTML
            resultadoHtml = resultadoHtml.replace('{{animal}}', animalFavorito);

            // ⚠️ Importante: Devuelve la página de resultado procesada.
            res.setHeader('Content-Type', 'text/html');
            return res.status(200).send(resultadoHtml);
        } catch (error) {
            console.error('Error al procesar el resultado:', error);
            return res.status(500).send('Error 500: No se pudo procesar la página de resultados.');
        }
    }
    
    // Si es otro método (PUT, DELETE, etc.)
    return res.status(405).send('Método no permitido.');
};