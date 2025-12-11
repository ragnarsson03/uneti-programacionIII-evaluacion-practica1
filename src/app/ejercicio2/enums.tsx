// src/app/ejercicio2/enums.ts
/**
 * @fileoverview Definición de Enumeraciones (Enums)
 * @description Aquí definimos las listas de opciones fijas que usaremos en la app.
 * 
 * ¿Para qué sirven los enums?
 * Nos permiten crear un conjunto de constantes relacionadas.
 * Esto ayuda a evitar errores de escritura y hace el código más ordenado.
 * 
 * @author Frederick Durán
 */

// 1. Enumerar Género de Películas
// Usamos un enum numérico (por defecto empiezan en 0, 1, 2...)
export enum GeneroPelicula {
    Accion,         // 0
    Comedia,        // 1
    Drama,          // 2
    CienciaFiccion, // 3
    Terror,         // 4
    Documental,     // 5
    Animacion       // 6
}

// 2. Enumerar País de la Película
// Usamos un enum de cadena (String Enum) para que el valor sea el texto exacto del país.
export enum PaisPelicula {
    Venezuela = "Venezuela",
    EEUU = "Estados Unidos",
    Espana = "España",
    Mexico = "México",
    Francia = "Francia",
    ReinoUnido = "Reino Unido"
}