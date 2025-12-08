"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // Importamos el componente Image de Next.js para optimizar las imágenes
import { GeneroPelicula, PaisPelicula } from "./enums";

/**
 * Definición de la estructura de una Película.
 * Utilizo esta interfaz para asegurar que cada objeto película tenga obligatoriamente
 * un título (texto), un género (del enum GeneroPelicula) y un país (del enum PaisPelicula).
 */
type Pelicula = {
  titulo: string;
  genero: GeneroPelicula;
  pais: PaisPelicula;
};

/**
 * Función auxiliar para obtener las claves del enum GeneroPelicula.
 * Como GeneroPelicula es un enum numérico, TypeScript genera claves inversas (números).
 * Aquí filtro para obtener solo los nombres (strings) y poder mostrarlos en el select.
 */
function getGeneroKeys(): string[] {
  return Object.keys(GeneroPelicula).filter((key) => isNaN(Number(key)));
}

/**
 * Función para asignar un color de fondo diferente según el género de la película.
 * Esto ayuda a diferenciar visualmente los elementos en la lista.
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
  // Obtengo las listas de géneros y países para usarlas en los desplegables (selects)
  const generosKeys = getGeneroKeys();
  const paisesValues = Object.values(PaisPelicula);

  // Definición de Estados (Hooks)
  // Estado para almacenar la lista de películas. Se inicializa como un array vacío.
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);

  // Estados para los campos del formulario
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState<GeneroPelicula>(GeneroPelicula.Accion);
  const [pais, setPais] = useState<PaisPelicula>(PaisPelicula.Venezuela);

  // Estado para manejar mensajes de error (validaciones)
  const [error, setError] = useState("");

  // Estado para controlar si el componente ya se montó en el cliente (evita errores de hidratación con LocalStorage)
  const [mounted, setMounted] = useState(false);

  // Efecto para CARGAR los datos del LocalStorage al iniciar la aplicación.
  // Se ejecuta una sola vez cuando el componente se monta (array de dependencias vacío []).
  useEffect(() => {
    setMounted(true);
    const data = localStorage.getItem("peliculas");
    if (data) {
      try {
        // Convierto el string JSON recuperado de vuelta a un array de objetos Pelicula
        const parsedData = JSON.parse(data) as Pelicula[];
        setPeliculas(parsedData);
      } catch (e) {
        console.error("Error al leer del localStorage:", e);
      }
    }
  }, []);

  // Efecto para GUARDAR los datos en LocalStorage cada vez que la lista de películas cambia.
  // Se ejecuta cada vez que el estado 'peliculas' o 'mounted' se actualiza.
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("peliculas", JSON.stringify(peliculas));
    }
  }, [peliculas, mounted]);

  // Función que se ejecuta al enviar el formulario
  const agregarPelicula = (e: React.FormEvent) => {
    e.preventDefault(); // Evito que la página se recargue

    // Validación 1: El título no puede estar vacío
    if (titulo.trim() === "") {
      setError("El título no puede estar vacío");
      return;
    }

    // Validación 2: No permitir películas duplicadas (mismo nombre)
    const existe = peliculas.some(
      (p) => p.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (existe) {
      setError("Esa película ya existe en la lista");
      return;
    }

    // Creo el nuevo objeto película con los datos del formulario
    const nueva: Pelicula = {
      titulo,
      genero,
      pais,
    };

    // Actualizo el estado agregando la nueva película al array existente
    setPeliculas([...peliculas, nueva]);

    // Limpio el campo de título y el error
    setTitulo("");
    setError("");
  };

  // Función para eliminar una película de la lista por su índice
  const eliminarPelicula = (index: number) => {
    const copia = [...peliculas]; // Creo una copia del array para no mutar el estado directamente
    copia.splice(index, 1); // Elimino el elemento
    setPeliculas(copia); // Actualizo el estado
  };

  // Si no está montado, renderizo un div vacío para evitar diferencias entre servidor y cliente
  if (!mounted) {
    return <div className="min-h-screen bg-white"></div>;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* SECCIÓN IZQUIERDA: Bienvenida y Logos */}
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

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-slate-900">
            Hola, Profesor <br />
            Carlos Márquez😎
          </h1>

          <p className="text-lg text-slate-600">
            Felicitaciones, La app se está ejecutando.🧑🏻‍💻
          </p>

          {/* Mostrar los Enums disponibles como pide el ejercicio 2 */}
          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-700 mb-2">Datos disponibles (Enumeradas):</h3>
            <div className="text-sm text-slate-600">
              <p><span className="font-semibold">Géneros:</span> {generosKeys.join(", ")}</p>
              <p className="mt-1"><span className="font-semibold">Países:</span> {paisesValues.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* SECCIÓN DERECHA: Formulario y Lista de Películas */}
        <div className="border-l-2 border-pink-100 pl-8 md:pl-12 py-4 flex flex-col h-full">

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Añade una nueva película</h2>

            <form onSubmit={agregarPelicula} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="text-sm text-slate-500 font-medium">Nombre de la película</label>
                <div className="flex space-x-2">
                  <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ej: Jurassic Park"
                    className="flex-1 border-2 border-slate-200 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={agregarPelicula}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
                  >
                    Añadir
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Género (Enumerar)</label>
                  <select
                    value={genero}
                    onChange={(e) => setGenero(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  >
                    {generosKeys.map((g, i) => (
                      <option key={i} value={i}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">País (Enumerar)</label>
                  <select
                    value={pais}
                    onChange={(e) => setPais(e.target.value as PaisPelicula)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  >
                    {paisesValues.map((p, i) => (
                      <option key={i} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            <p className="text-xs text-slate-400 mb-4">Listado de películas guardadas:</p>

            <div className="flex flex-wrap gap-3 content-start">
              {peliculas.map((p, i) => (
                <div
                  key={i}
                  className={`group relative px-4 py-2 rounded-full font-medium text-sm cursor-default transition-all hover:shadow-md flex items-center gap-2 ${getGeneroColor(p.genero)}`}
                  title={`${GeneroPelicula[p.genero]} - ${p.pais}`}
                >
                  <span>{p.titulo}</span>
                  <button
                    onClick={() => eliminarPelicula(i)}
                    className="opacity-0 group-hover:opacity-100 text-current hover:text-red-600 font-bold transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}

              {peliculas.length === 0 && (
                <p className="text-slate-300 italic">No hay películas añadidas aún.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}