// app/ejercicio1/api/route.ts
// Este archivo actúa como una Serverless Function de Node.js,
// la cual cumple el requisito del Ejercicio 1 de usar NODE para interceptar datos.

import { NextResponse } from 'next/server';

/**
 * @description Maneja la solicitud POST (Interceptación) del formulario del animal favorito.
 * @author Frederick Durán
 * * Cumple los requisitos:
 * 1. Mediante NODE: Esta función se ejecuta en el entorno Node.js de Vercel.
 * 2. Intercepta: Procesa el POST enviado desde el formulario HTML.
 * 3. Recarga otra página: Redirige al navegador a la Vista 2 de resultados.
 *
 * @param {Request} request - Objeto de solicitud HTTP, contiene el formulario POST.
 * @returns {NextResponse} Una redirección (HTTP 307) a la página de resultados.
 */
export async function POST(request: Request) {
    
    // Paso 1: Interceptación y Extracción de Datos (Lógica NODE)
    // Usamos request.formData() para leer el cuerpo del formulario enviado por POST.
    const formData = await request.formData();
    const animal = formData.get('animal') as string | null;

    // Paso 2: Validación
    if (!animal) {
        // Si el campo está vacío, redirigimos al usuario de vuelta al formulario principal
        // El 'request.url' asegura que la redirección sea correcta, aunque sea un error 400.
        return NextResponse.redirect(new URL('/ejercicio1', request.url));
    }

    // Paso 3: Procesamiento y Preparación de Recarga (Redirección)
    // Codificamos el dato para asegurarnos de que es seguro en la URL (parámetros de búsqueda).
    const animalEncoded = encodeURIComponent(animal);

    // ✅ Redirección: Esto le dice al navegador que haga una nueva solicitud GET 
    // a la ruta de la Vista 2 (/ejercicio1/resultado), llevando el dato.
    // Esto simula la "recarga de otra página html" que pide el enunciado.
    return NextResponse.redirect(new URL(`/ejercicio1/resultado?animal=${animalEncoded}`, request.url));
}