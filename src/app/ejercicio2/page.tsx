"use client";

import { useEffect, useState } from "react";
import { GeneroPelicula, PaisPelicula } from "./enums";

/**
 * @description Interfaz que define la estructura de una Película.
 */
type Pelicula = {
  titulo: string;
  genero: GeneroPelicula;
  pais: PaisPelicula;
};

/**
 * @description Helper para obtener las keys numéricas del enum GeneroPelicula
 */
function getGeneroKeys(): string[] {
  return Object.keys(GeneroPelicula).filter((key) => isNaN(Number(key)));
}

/**
 * @description Helper para obtener un color de fondo basado en el género
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
  const generosKeys = getGeneroKeys();
  const paisesValues = Object.values(PaisPelicula);

  // Estados
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState<GeneroPelicula>(GeneroPelicula.Accion);
  const [pais, setPais] = useState<PaisPelicula>(PaisPelicula.Venezuela);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  // Cargar desde LocalStorage al montar
  useEffect(() => {
    setMounted(true);
    const data = localStorage.getItem("peliculas");
    if (data) {
      try {
        const parsedData = JSON.parse(data) as Pelicula[];
        setPeliculas(parsedData);
      } catch (e) {
        console.error("Error al parsear localStorage:", e);
      }
    }
  }, []);

  // Guardar en LocalStorage al cambiar peliculas
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("peliculas", JSON.stringify(peliculas));
    }
  }, [peliculas, mounted]);

  const agregarPelicula = (e: React.FormEvent) => {
    e.preventDefault();

    if (titulo.trim() === "") {
      setError("El título no puede estar vacío");
      return;
    }

    const existe = peliculas.some(
      (p) => p.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (existe) {
      setError("Esa película ya existe");
      return;
    }

    const nueva: Pelicula = {
      titulo,
      genero,
      pais,
    };

    setPeliculas([...peliculas, nueva]);
    setTitulo("");
    // No reseteamos género/país para facilitar la entrada masiva, o sí?
    // El requerimiento no especifica, pero resetear es un comportamiento estándar.
    // setGenero(GeneroPelicula.Accion); 
    // setPais(PaisPelicula.Venezuela);
    setError("");
  };

  const eliminarPelicula = (index: number) => {
    const copia = [...peliculas];
    copia.splice(index, 1);
    setPeliculas(copia);
  };

  // Evitar renderizado en servidor para prevenir hydration mismatch con localStorage
  if (!mounted) {
    return <div className="min-h-screen bg-white"></div>;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LADO IZQUIERDO: Bienvenida */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex items-center space-x-2">
            {/* Logo simulado de Angular/Framework */}
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className="text-2xl font-bold text-pink-600">UNETI</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-slate-900">
            Hola, Profesor <br />
            Carlos Márquez 😎
          </h1>

          <p className="text-lg text-slate-600">
            Felicitaciones, La app se está ejecutando.🧑🏻‍💻
          </p>
        </div>

        {/* LADO DERECHO: Formulario y Lista */}
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
                    type="button" // Botón dummy para el estilo "Añadir" dentro del input visualmente, o al lado!!
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
                  <label className="text-xs text-slate-400 mb-1 block">Género</label>
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
                  <label className="text-xs text-slate-400 mb-1 block">País</label>
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
            <p className="text-xs text-slate-400 mb-4">Escribe el nombre completo de la película</p>

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