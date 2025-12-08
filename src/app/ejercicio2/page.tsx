"use client";

import { useEffect, useState } from "react";
// Asegúrate de que este path sea correcto si tu archivo enums.ts está en otro lugar
import { GeneroPelicula, PaisPelicula } from "./enums";

/**
 * @description Interfaz (tipo) que define la estructura de una Película.
 * Los enums aseguran que 'genero' y 'pais' siempre tendrán valores válidos.
 * @author Frederick Durán
 */
type Pelicula = {
  titulo: string;
  genero: GeneroPelicula;
  pais: PaisPelicula;
};

/**
 * @description Función auxiliar para obtener solo los nombres (claves) de un enum,
 * excluyendo los índices numéricos que TypeScript añade a los enums numéricos.
 * @param {object} enumObject - El objeto enum. Usamos un tipo genérico T para tipar mejor.
 * @returns {string[]} Un array de cadenas con los nombres de las propiedades.
 * @author Frederick Durán
 */
// 🛑 CORRECCIÓN 1: Tipado del objeto enum a un tipo genérico más estricto.
function getEnumKeys<T extends Record<string, unknown>>(enumObject: T): string[] {
  return Object.keys(enumObject).filter(key => isNaN(Number(key)));
}

export default function Ejercicio2() {
  // Obtener los nombres de los enums para el listado y los selects
  const generosKeys = getEnumKeys(GeneroPelicula);
  const paisesValues = Object.values(PaisPelicula);

  // Estados
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [titulo, setTitulo] = useState("");
  // Inicialización con el primer valor del enum
  const [genero, setGenero] = useState<GeneroPelicula>(GeneroPelicula.Accion);
  const [pais, setPais] = useState<PaisPelicula>(PaisPelicula.Venezuela);
  const [error, setError] = useState("");

  // ✅ CARGAR DESDE LOCALSTORAGE (Se ejecuta solo al montar el componente)
  useEffect(() => {
    // Usamos setTimeout para evitar la advertencia de setState sincrónico dentro del efecto.
    // Esto asegura que la lectura del localStorage ocurra tras la renderización inicial.
    setTimeout(() => {
      const data = localStorage.getItem("peliculas");
      if (data) {
        try {
          const parsedData = JSON.parse(data) as Pelicula[];
          setPeliculas(parsedData);
        } catch (e) {
          console.error("Error al parsear localStorage:", e);
        }
      }
    }, 0);
  }, []);

  // ✅ GUARDAR EN LOCALSTORAGE (Se ejecuta cada vez que 'peliculas' cambia)
  useEffect(() => {
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
  }, [peliculas]);

  const agregarPelicula = (e: React.FormEvent) => {
    e.preventDefault();

    if (titulo.trim() === "") {
      setError("El título no puede estar vacío");
      return;
    }

    const existe = peliculas.some(
      p => p.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (existe) {
      setError("Esa película ya existe");
      return;
    }

    const nueva: Pelicula = {
      titulo,
      genero,
      pais
    };

    setPeliculas([...peliculas, nueva]);
    setTitulo("");
    setGenero(GeneroPelicula.Accion); // Resetear a la primera opción
    setPais(PaisPelicula.Venezuela); // Resetear a la primera opción
    setError("");
  };

  const eliminarPelicula = (index: number) => {
    const copia = [...peliculas];
    copia.splice(index, 1);
    setPeliculas(copia);
  };

  return (
    // 🛑 CORRECCIÓN 3: Altura calculada para evitar scroll (h-16 = 4rem)
    <div className="bg-gray-100 flex justify-center p-6 min-h-[calc(100vh-4rem)]">
      <div className="bg-white max-w-5xl w-full p-8 rounded-xl shadow-2xl grid md:grid-cols-2 gap-8">

        {/* IZQUIERDA: Listado de Enums */}
        <div>
          <h1 className="text-3xl font-bold mb-6 text-indigo-700">🎬 Ejercicio 2: Enums de TypeScript</h1>
          
          <h2 className="text-xl font-semibold mb-2 border-b pb-1 text-gray-800">Géneros de Película</h2>
          <ul className="mb-6 space-y-2">
            {generosKeys.map((g, i) => (
              <li key={i} className="bg-indigo-100 px-3 py-1 rounded shadow-sm text-indigo-800 font-medium">
                {g} (Valor: {GeneroPelicula[g as keyof typeof GeneroPelicula]})
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mb-2 border-b pb-1 text-gray-800">Países de Origen</h2>
          <ul className="space-y-2">
            {paisesValues.map((p, i) => (
              <li key={i} className="bg-green-100 px-3 py-1 rounded shadow-sm text-green-800 font-medium">
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* DERECHA: Formulario y Listado de Películas */}
        <div className="border-l pl-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Añadir Película</h2>

          <form onSubmit={agregarPelicula} className="space-y-4">
            <input
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="Nombre de la película"
              className="w-full border p-3 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />

            {/* Select para Género (Enum Numérico) */}
            <select
              value={genero}
              // 🛑 CORRECCIÓN 2: Asegurar que el valor del select sea un NÚMERO
              onChange={e => setGenero(Number(e.target.value))}
              className="w-full border p-3 rounded focus:ring-blue-500 focus:border-blue-500"
            >
              {/* Usamos el índice (i) como valor del option, que corresponde al valor numérico del enum */}
              {generosKeys.map((g, i) => (
                <option key={i} value={i}>{g}</option>
              ))}
            </select>

            {/* Select para País (Enum de Cadena) */}
            <select
              value={pais}
              // El valor ya es una cadena, lo casteamos al tipo enum (PaisPelicula)
              onChange={e => setPais(e.target.value as PaisPelicula)}
              className="w-full border p-3 rounded focus:ring-blue-500 focus:border-blue-500"
            >
              {paisesValues.map((p, i) => (
                <option key={i} value={p}>{p}</option>
              ))}
            </select>

            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition duration-150">
              Añadir al Listado
            </button>

            {error && <p className="text-red-600 text-sm font-semibold mt-2">{error}</p>}
          </form>

          <h3 className="text-xl font-bold mt-8 mb-3 border-t pt-4 text-gray-800">Listado de Películas ({peliculas.length})</h3>

          {/* Listado de Películas Añadidas */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {peliculas.map((p, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition duration-100"
              >
                <div>
                  <p className="font-semibold">{p.titulo}</p>
                  <p className="text-sm text-gray-600">
                    {/* Convertir el valor numérico del enum a su nombre legible */}
                    **{GeneroPelicula[p.genero]}** de {p.pais}
                  </p>
                </div>

                <button
                  onClick={() => eliminarPelicula(i)}
                  className="text-red-600 font-bold hover:text-red-800 transition duration-100"
                  title="Eliminar"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}