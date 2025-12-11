/**
 * @fileoverview API Route para el manejo de películas en memoria.
 * @description Esta es la parte del "backend" de nuestro Ejercicio 2.
 * 
 * Funciona como una pequeña base de datos temporal que vive en la memoria RAM del servidor.
 * 
 * ¿Por qué en memoria?
 * Porque el ejercicio pide almacenamiento temporal mientras el servidor esté activo.
 * Si reiniciamos el proyecto (npm run dev), esta lista vuelve a estar vacía.
 * 
 * @author Frederick Durán
 */

import { NextRequest, NextResponse } from "next/server";

// Definimos qué forma tienen los datos que vamos a guardar
type Pelicula = {
    titulo: string;
    genero: number; // Guardamos el número del Enum
    pais: string;   // Guardamos el texto del Enum
};

/**
 * ESTA ES NUESTRA "BASE DE DATOS" TEMPORAL
 * Es una simple variable array [] que vive en el servidor.
 * Mientras el servidor no se apague, los datos siguen aquí.
 */
let peliculasEnMemoria: Pelicula[] = [];

/**
 * MÉTODO GET (Obtener datos)
 * Cuando el frontend pide "/api/peliculas", ejecutamos esto.
 * Retorna la lista completa de películas que tenemos guardadas.
 */
export async function GET() {
    return NextResponse.json(peliculasEnMemoria);
}

/**
 * MÉTODO POST (Guardar datos)
 * Recibe una nueva película desde el formulario y la guarda en el array.
 */
export async function POST(request: NextRequest) {
    try {
        // Leemos los datos que nos envió el formulario
        const body = await request.json();
        const { titulo, genero, pais } = body;

        // Validación 1: Que no nos manden un título vacío
        if (!titulo || titulo.trim() === "") {
            return NextResponse.json(
                { error: "El título no puede estar vacío" },
                { status: 400 } // Error 400 = Bad Request
            );
        }

        // Validación 2: Que no repitan la película (buscamos si ya existe)
        const existe = peliculasEnMemoria.some(
            (p) => p.titulo.toLowerCase() === titulo.toLowerCase()
        );

        if (existe) {
            return NextResponse.json(
                { error: "Esa película ya existe en la lista" },
                { status: 400 }
            );
        }

        // Si todo está bien, creamos el objeto y lo guardamos
        const nuevaPelicula: Pelicula = {
            titulo: titulo.trim(),
            genero,
            pais,
        };

        peliculasEnMemoria.push(nuevaPelicula); // ¡Guardado!

        // Respondemos con éxito (201 = Created)
        return NextResponse.json(nuevaPelicula, { status: 201 });
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}

/**
 * MÉTODO DELETE (Borrar datos)
 * Elimina una película basándose en su posición en la lista (índice).
 * Ejemplo: /api/peliculas?index=0 (borra la primera)
 */
export async function DELETE(request: NextRequest) {
    try {
        // Buscamos el parámetro "index" en la URL
        const { searchParams } = new URL(request.url);
        const indexStr = searchParams.get("index");

        if (indexStr === null) {
            return NextResponse.json(
                { error: "Falta decir cuál índice borrar" },
                { status: 400 }
            );
        }

        const index = parseInt(indexStr, 10);

        // Verificamos que el índice sea válido (que exista en el array)
        if (isNaN(index) || index < 0 || index >= peliculasEnMemoria.length) {
            return NextResponse.json(
                { error: "Ese índice no existe" },
                { status: 400 }
            );
        }

        // Borramos el elemento del array
        peliculasEnMemoria.splice(index, 1);

        return NextResponse.json({ success: true, message: "Película borrada" });
    } catch (error) {
        return NextResponse.json(
            { error: "Error al intentar borrar" },
            { status: 500 }
        );
    }
}
