"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { GeneroPelicula, PaisPelicula } from "./enums";

/**
 * @fileoverview Componente principal del Ejercicio 2.
 * @description Este componente implementa:
 * 1. Un formulario para registrar películas (título, género, país)
 * 2. Almacenamiento temporal en memoria del servidor (vía API)
 * 3. Una tabla que muestra las películas con Título, Género y País
 * 
 * Las películas se guardan en la memoria del servidor mientras este esté activo.
 * Al reiniciar el servidor, la lista se vacía.
 * 
 * @author Frederick Durán
 */

/**
 * Interfaz que define la estructura de una Película.
 */
type Pelicula = {
  titulo: string;
  genero: GeneroPelicula;
  pais: PaisPelicula;
};

/**
 * Obtiene las claves del enum GeneroPelicula (solo los nombres, no los valores numéricos).
 */
function getGeneroKeys(): string[] {
  return Object.keys(GeneroPelicula).filter((key) => isNaN(Number(key)));
}

/**
 * Asigna clases de estilo según el género para diferenciar visualmente.
 */
function getGeneroColor(genero: GeneroPelicula): string {
  switch (genero) {
    case GeneroPelicula.Accion: return "bg-red-100 text-red-800";
    case GeneroPelicula.Comedia: return "bg-yellow-100 text-yellow-800";
    case GeneroPelicula.Drama: return "bg-blue-100 text-blue-800";
    case GeneroPelicula.CienciaFiccion: return "bg-purple-100 text-purple-800";
    case GeneroPelicula.Terror: return "bg-gray-800 text-gray-100";
    case GeneroPelicula.Documental: return "bg-green-100 text-green-800";
    case GeneroPelicula.Animacion: return "bg-pink-100 text-pink-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

export default function Ejercicio2() {
  // Listas de géneros y países para los desplegables
  const generosKeys = getGeneroKeys();
  const paisesValues = Object.values(PaisPelicula);

  // Estados del componente
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState<GeneroPelicula>(GeneroPelicula.Accion);
  const [pais, setPais] = useState<PaisPelicula>(PaisPelicula.Venezuela);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  /**
   * Función para cargar las películas desde la API del servidor.
   * Usa useCallback para memorizar la función y evitar re-renders innecesarios.
   */
  const cargarPeliculas = useCallback(async () => {
    try {
      const response = await fetch("/api/peliculas");
      if (response.ok) {
        const data = await response.json();
        setPeliculas(data);
      }
    } catch (e) {
      console.error("Error al cargar películas:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Efecto para cargar las películas al montar el componente
  useEffect(() => {
    cargarPeliculas();
  }, [cargarPeliculas]);

  /**
   * Función para agregar una nueva película a través de la API.
   */
  const agregarPelicula = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación del lado del cliente
    if (titulo.trim() === "") {
      setError("El título no puede estar vacío");
      return;
    }

    try {
      const response = await fetch("/api/peliculas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          genero,
          pais,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al agregar la película");
        return;
      }

      // Recargar la lista de películas
      await cargarPeliculas();
      setTitulo("");
      setError("");
    } catch (e) {
      console.error("Error al agregar película:", e);
      setError("Error de conexión con el servidor");
    }
  };

  /**
   * Función para eliminar una película de la lista.
   */
  const eliminarPelicula = async (index: number) => {
    try {
      const response = await fetch(`/api/peliculas?index=${index}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await cargarPeliculas();
      }
    } catch (e) {
      console.error("Error al eliminar película:", e);
    }
  };

  // Pantalla de carga mientras se obtienen los datos
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-500">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* SECCIÓN IZQUIERDA: Bienvenida, Formulario y Enums */}
        <div className="flex flex-col justify-start space-y-6">
          <div className="flex items-center">
            <Image
              src="/favicon.ico"
              alt="Favicon"
              width={80}
              height={80}
              className="w-20 h-20 mr-2"
            />
            <Image
              src="/next.svg"
              alt="Next.js Logo"
              width={160}
              height={160}
              className="w-40 h-40"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
            Ejercicio 2: <br />
            Registro de Películas 🎬
          </h1>

          <p className="text-lg text-slate-600">
            Las películas se guardan en memoria del servidor mientras esté activo.
          </p>

          {/* Formulario de registro */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Añadir Nueva Película</h2>

            <form onSubmit={agregarPelicula} className="space-y-4">
              {/* Campo de título */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm text-slate-500 font-medium">Título de la película</label>
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej: Jurassic Park"
                  className="border-2 border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Selectores de Género y País */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-500 font-medium mb-1 block">Género</label>
                  <select
                    value={genero}
                    onChange={(e) => setGenero(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
                  >
                    {generosKeys.map((g, i) => (
                      <option key={i} value={i}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-500 font-medium mb-1 block">País</label>
                  <select
                    value={pais}
                    onChange={(e) => setPais(e.target.value as PaisPelicula)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
                  >
                    {paisesValues.map((p, i) => (
                      <option key={i} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mensaje de error */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Botón de envío */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Registrar Película
              </button>
            </form>
          </div>

          {/* Mostrar los Enums disponibles */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-700 mb-2">Enums Definidos:</h3>
            <div className="text-sm text-slate-600">
              <p><span className="font-semibold">GeneroPelicula:</span> {generosKeys.join(", ")}</p>
              <p className="mt-1"><span className="font-semibold">PaisPelicula:</span> {paisesValues.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* SECCIÓN DERECHA: Tabla de Películas Registradas */}
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">
            Películas Registradas ({peliculas.length})
          </h2>

          {peliculas.length === 0 ? (
            <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-400 italic text-center">
                No hay películas registradas aún.<br />
                ¡Agrega una desde el formulario!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 border-b border-slate-200">
                      #
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 border-b border-slate-200">
                      Título
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 border-b border-slate-200">
                      Género
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 border-b border-slate-200">
                      País
                    </th>
                    <th className="text-center px-4 py-3 text-sm font-semibold text-slate-700 border-b border-slate-200">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {peliculas.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate-500 border-b border-slate-100">
                        {i + 1}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-800 border-b border-slate-100">
                        {p.titulo}
                      </td>
                      <td className="px-4 py-3 border-b border-slate-100">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getGeneroColor(p.genero)}`}>
                          {GeneroPelicula[p.genero]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 border-b border-slate-100">
                        {p.pais}
                      </td>
                      <td className="px-4 py-3 text-center border-b border-slate-100">
                        <button
                          onClick={() => eliminarPelicula(i)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors text-sm font-medium"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Nota informativa */}
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs text-amber-700">
              <strong>Nota:</strong> Los datos se almacenan en memoria del servidor.
              Si reinicias el servidor o haces cambios en el código, la lista se vaciará.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}