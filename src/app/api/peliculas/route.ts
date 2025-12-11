/**
 * @fileoverview API Route para el manejo de películas en memoria.
 * @description Esta API almacena las películas en una variable del servidor mientras
 * este esté activo. Cuando el servidor se reinicia, los datos se pierden ya que
 * no hay persistencia en base de datos ni LocalStorage (esto es intencional según
 * los requisitos del ejercicio).
 * 
 * @author Frederick Durán
 */

import { NextRequest, NextResponse } from "next/server";

// Tipos para las películas - deben coincidir con los enums del cliente
type Pelicula = {
    titulo: string;
    genero: number; // GeneroPelicula enum value
    pais: string;   // PaisPelicula enum value
};

/**
 * ALMACENAMIENTO EN MEMORIA DEL SERVIDOR
 * Esta variable almacena las películas mientras el servidor esté corriendo.
 * Se reinicia cuando el servidor se reinicia o cuando se hace hot-reload
 * durante el desarrollo.
 */
let peliculasEnMemoria: Pelicula[] = [];

/**
 * GET /api/peliculas
 * Retorna la lista completa de películas almacenadas en memoria.
 */
export async function GET() {
    return NextResponse.json(peliculasEnMemoria);
}

/**
 * POST /api/peliculas
 * Agrega una nueva película al almacenamiento en memoria.
 * 
 * Body esperado:
 * {
 *   titulo: string,
 *   genero: number (valor del enum GeneroPelicula),
 *   pais: string (valor del enum PaisPelicula)
 * }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { titulo, genero, pais } = body;

        // Validación: el título no puede estar vacío
        if (!titulo || titulo.trim() === "") {
            return NextResponse.json(
                { error: "El título no puede estar vacío" },
                { status: 400 }
            );
        }

        // Validación: no permitir películas duplicadas
        const existe = peliculasEnMemoria.some(
            (p) => p.titulo.toLowerCase() === titulo.toLowerCase()
        );

        if (existe) {
            return NextResponse.json(
                { error: "Esa película ya existe en la lista" },
                { status: 400 }
            );
        }

        // Crear y agregar la nueva película
        const nuevaPelicula: Pelicula = {
            titulo: titulo.trim(),
            genero,
            pais,
        };

        peliculasEnMemoria.push(nuevaPelicula);

        return NextResponse.json(nuevaPelicula, { status: 201 });
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        return NextResponse.json(
            { error: "Error al procesar la solicitud" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/peliculas
 * Elimina una película del almacenamiento por su índice.
 * 
 * Query param: index (número del índice a eliminar)
 */
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const indexStr = searchParams.get("index");

        if (indexStr === null) {
            return NextResponse.json(
                { error: "Se requiere el parámetro 'index'" },
                { status: 400 }
            );
        }

        const index = parseInt(indexStr, 10);

        if (isNaN(index) || index < 0 || index >= peliculasEnMemoria.length) {
            return NextResponse.json(
                { error: "Índice inválido" },
                { status: 400 }
            );
        }

        // Eliminar la película en el índice especificado
        peliculasEnMemoria.splice(index, 1);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error al eliminar la película:", error);
        return NextResponse.json(
            { error: "Error al procesar la solicitud" },
            { status: 500 }
        );
    }
}
