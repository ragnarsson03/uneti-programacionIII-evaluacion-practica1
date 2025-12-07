// src/app/ejercicio2/page.tsx - Vista del Ejercicio 2: TypeScript Enums
import { GeneroPelicula, PaisPelicula } from './enums';

/**
 * @description Función auxiliar para obtener un array de nombres de enum,
 * excluyendo las claves numéricas generadas por TypeScript para los enums numéricos.
 * @param {any} enumObject - El objeto enum (e.g., GeneroPelicula).
 * @returns {string[]} Un array de cadenas con los nombres de las propiedades.
 */
function getEnumNames(enumObject: any): string[] {
    // Filtramos para asegurarnos de que solo se devuelvan los nombres (cadenas),
    // y no los índices numéricos (0, 1, 2, etc.) que TypeScript añade.
    return Object.keys(enumObject).filter(key => isNaN(Number(key)));
}

export default function Ejercicio2Enumeraciones() {

    // 1. Obtener los nombres amigables de los géneros de películas
    const generos = getEnumNames(GeneroPelicula);

    // 2. Obtener los valores (países) de la enumeración
    // Para los enums de cadena (string enums), solo necesitamos los valores.
    const paises = Object.values(PaisPelicula);

    return (
        <div className="flex flex-col items-center justify-start bg-gray-100 p-8 min-h-[calc(100vh-4rem)]">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
                
                <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
                    🎬 Ejercicio 2: Enumeraciones con TypeScript
                </h1>
                
                {/* -------------------- GÉNEROS DE PELÍCULAS -------------------- */}
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2">
                    Tipos de Género de Película (Enum Numérico)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {generos.map((genero, index) => (
                        <div 
                            key={index} 
                            className="p-3 bg-indigo-100 rounded-lg text-indigo-800 text-center font-medium shadow-sm"
                        >
                            {/* Muestra el nombre del género (clave) y su valor numérico */}
                            {genero} (Valor: {GeneroPelicula[genero as keyof typeof GeneroPelicula]})
                        </div>
                    ))}
                </div>

                {/* -------------------- PAÍSES DE PELÍCULA -------------------- */}
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2">
                    Países de Película (Enum de Cadena)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {paises.map((pais, index) => (
                        <div 
                            key={index} 
                            className="p-3 bg-green-100 rounded-lg text-green-800 text-center font-medium shadow-sm"
                        >
                            {/* Muestra el valor de cadena de la enumeración */}
                            {pais}
                        </div>
                    ))}
                </div>

            </div>
            <div className="mt-4 text-sm text-gray-500">
                <p>Vista del Ejercicio 2</p>
            </div>
        </div>
    );
}