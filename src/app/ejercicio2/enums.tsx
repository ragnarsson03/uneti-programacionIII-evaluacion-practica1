// src/app/ejercicio2/enums.ts
/**
 * @fileoverview Define las enumeraciones (enums) requeridas para el Ejercicio 2.
 * @author Frederick Durán
 */

// 1. Enumerar Género de Películas
// Un enum proporciona nombres amigables a un conjunto de valores numéricos constantes.
export enum GeneroPelicula {
    // Los valores por defecto son 0, 1, 2, etc.
    // Usamos PascalCase para los nombres de las propiedades.
    Accion,
    Comedia,
    Drama,
    CienciaFiccion,
    Terror,
    Documental
}

// 2. Enumerar País de la Película
// Aquí asignamos valores explícitos para mayor claridad.
export enum PaisPelicula {
    // Asignación de valores de cadena para ser más descriptivos al mostrarlos.
    Venezuela = "Venezuela",
    EEUU = "Estados Unidos",
    Espana = "España",
    Mexico = "México",
    Francia = "Francia",
    CoreaDelSur = "Corea del Sur"
}

// Nota: Se pueden usar funciones auxiliares o arrays si se necesita iterar,
// pero el requisito es usar la estructura 'enum'.