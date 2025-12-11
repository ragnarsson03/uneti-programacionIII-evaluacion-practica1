"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { GeneroPelicula, PaisPelicula } from "./enums";

/**
 * @fileoverview Componente principal del Ejercicio 2.
 * @description Este componente es la parte visual que interactúa con el usuario.
 * Aquí manejamos:
 * 1. El formulario para que el usuario ingrese nuevas películas.
 * 2. La comunicación con nuestro servidor (API) para guardar y leer los datos.
 * 3. La visualización de la tabla con las películas registradas.
 * 
 * Es importante notar que usamos "use client" porque necesitamos interactividad
 * en el navegador (manejar clicks, formularios, estados visuales, etc.).
 * 
 * @author Frederick Durán
 */

/* Definimos qué información tiene una película para que TypeScript nos ayude a no cometer errores */
type Pelicula = {
  titulo: string;
  genero: GeneroPelicula;
  pais: PaisPelicula;
};

/* Función auxiliar para sacar solo los nombres de los géneros del Enum, para mostrarlos en la lista */
function getGeneroKeys(): string[] {
  return Object.keys(GeneroPelicula).filter((key) => isNaN(Number(key)));
}

/* Esta función nos ayuda a darle un color bonito a cada género en la tabla */
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
  // Preparamos las listas para llenas los desplegables (select) del formulario
  const generosKeys = getGeneroKeys();
  const paisesValues = Object.values(PaisPelicula);

  /* Aquí guardamos el estado de nuestra aplicación (la memoria del componente) */
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]); // Lista de películas
  const [titulo, setTitulo] = useState(""); // Lo que el usuario escribe en título
  const [genero, setGenero] = useState<GeneroPelicula>(GeneroPelicula.Accion); // Género seleccionado
  const [pais, setPais] = useState<PaisPelicula>(PaisPelicula.Venezuela); // País seleccionado
  const [error, setError] = useState(""); // Mensajes de error si algo sale mal
  const [loading, setLoading] = useState(true); // Para saber si estamos cargando datos

  /**
   * Esta función se encarga de ir al servidor (API) y pedirle la lista actualizada de películas.
   * Usamos 'fetch' que es como un mensajero que va al servidor y trae la respuesta.
   */
  const cargarPeliculas = useCallback(async () => {
    try {
      const response = await fetch("/api/peliculas");
      if (response.ok) {
        const data = await response.json();
        setPeliculas(data); // Actualizamos la lista visible con lo que trajo del servidor
      }
    } catch (e) {
      console.error("Ups, error al cargar películas:", e);
    } finally {
      setLoading(false); // Ya terminamos de cargar
    }
  }, []);

  /* Este 'Efecto' se ejecuta automáticamente cuando la página se carga por primera vez */
  useEffect(() => {
    cargarPeliculas();
  }, [cargarPeliculas]);

  /**
   * Función que se activa cuando el usuario le da clic al botón "Registrar Película".
   */
  const agregarPelicula = async (e: React.FormEvent) => {
    e.preventDefault(); // Evitamos que la página se recargue sola

    // Verificamos que no esté vacío el título antes de enviar
    if (titulo.trim() === "") {
      setError("El título no puede estar vacío");
      return;
    }

    try {
      // Enviamos los datos nuevos al servidor usando el método POST
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
        // Si el servidor nos dice que hubo error (ej: duplicado), lo mostramos
        setError(data.error || "Error al agregar la película");
        return;
      }

      // Si todo salió bien, recargamos la lista para ver la nueva película
      await cargarPeliculas();
      setTitulo(""); // Limpiamos el campo de texto
      setError(""); // Borramos cualquier error previo
    } catch (e) {
      console.error("Error al agregar película:", e);
      setError("Error de conexión con el servidor");
    }
  };

  /**
   * Función para borrar una película. Le decimos al servidor cuál índice borrar.
   */
  const eliminarPelicula = async (index: number) => {
    try {
      const response = await fetch(`/api/peliculas?index=${index}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await cargarPeliculas(); // Actualizamos la tabla
      }
    } catch (e) {
      console.error("Error al eliminar película:", e);
    }
  };

  // Si estamos cargando datos, mostramos un mensajito simple
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-500">Cargando Ejercicio 2...</div>
      </div>
    );
  }

  /* Aquí empieza la estructura visual (HTML/JSX) de la página */
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* SECCIÓN IZQUIERDA: Bienvenida y Logos - Personalizada según requerimientos */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex items-center">
            {/* Logos solicitados: Favicon y Next.js */}
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

          <h1 className="text-5xl md:text-1xl font-extrabold leading-tight text-slate-900">
            Hola, Profesor <br />
            Carlos Márquez😎
          </h1>

          {/* Nombre del estudiante añadido aquí según solicitud */}
          <p className="text-xl font-bold text-slate-700 mt-2">
            Estudiante: Frederick Durán 30346056
          </p>

          <p className="text-lg text-slate-600">
            Felicitaciones, La app se está ejecutando.🧑🏻‍💻
          </p>

          {/* Bloque estático de Datos Disponibles solicitado */}
          <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-3 text-lg border-b border-slate-200 pb-2">
              Datos disponibles (Enumeradas):
            </h3>
            <div className="text-base text-slate-700 space-y-3">
              <p>
                <span className="font-semibold text-slate-900">Géneros:</span><br />
                Accion, Comedia, Drama, CienciaFiccion, Terror, Documental, Animacion
              </p>
              <p>
                <span className="font-semibold text-slate-900">Países:</span><br />
                Venezuela, Estados Unidos, España, México, Francia, Reino Unido
              </p>
            </div>
          </div>
        </div>

        {/* SECCIÓN DERECHA: Formulario y Tabla de Películas */}
        <div className="flex flex-col h-full border-l-2 border-slate-100 pl-8 md:pl-12 py-4">

          {/* Parte 1: El Formulario */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 flex items-center gap-2">
              <span>🎬</span> Registro de Películas
            </h2>

            {/* Descripción del Ejercicio 2 */}
            <p className="text-sm text-slate-500 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong>Ejercicio 2:</strong> Utilizando TypeScript enumerar: género de películas,
              país de la película y luego mostrarlos en una tabla.
            </p>

            <form onSubmit={agregarPelicula} className="space-y-5 bg-white p-1 rounded-lg">
              {/* Input para el título */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm text-slate-600 font-bold">Nombre de la película</label>
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ejemplo: Interstellar"
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                />
              </div>

              {/* Selectores de Género y País */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-slate-600 font-bold mb-2 block">Género</label>
                  <select
                    value={genero}
                    onChange={(e) => setGenero(Number(e.target.value))}
                    className="w-full border-2 border-slate-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                  >
                    {generosKeys.map((g, i) => (
                      <option key={i} value={i}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-600 font-bold mb-2 block">País</label>
                  <select
                    value={pais}
                    onChange={(e) => setPais(e.target.value as PaisPelicula)}
                    className="w-full border-2 border-slate-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                  >
                    {paisesValues.map((p, i) => (
                      <option key={i} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mensaje de error personalizado en rojo */}
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-100">
                  ⚠️ {error}
                </div>
              )}

              {/* Botón Principal */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md active:scale-[0.98]"
              >
                + Registrar Película
              </button>
            </form>
          </div>

          {/* Parte 2: La Tabla de Resultados */}
          <div className="flex flex-col flex-1">
            <h2 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2">
              Películas en Memoria ({peliculas.length})
            </h2>

            {peliculas.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-8">
                <p className="text-4xl mb-2"></p>
                <p className="text-slate-400 font-medium text-center">
                  La lista está vacía actualmente.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <table className="w-full">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">#</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">Título</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">Género</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">País</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {peliculas.map((p, i) => (
                      <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-400 font-mono">
                          {i + 1}
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-slate-800">
                          {p.titulo}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGeneroColor(p.genero)}`}>
                            {GeneroPelicula[p.genero]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {p.pais}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => eliminarPelicula(i)}
                            className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                            title="Eliminar película"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}