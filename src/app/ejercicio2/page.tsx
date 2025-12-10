"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GeneroPelicula, PaisPelicula } from "./enums";
import Link from 'next/link';

// Definición de tipos
type Pelicula = {
  titulo: string;
  genero: GeneroPelicula;
  pais: PaisPelicula;
};

/**
 * Helper para extraer las keys numéricas del Enum GeneroPelicula
 * como strings legibles.
 */
function getGeneroKeys(): string[] {
  return Object.keys(GeneroPelicula).filter((key) => isNaN(Number(key)));
}

/**
 * Retorna estilos de badge según el género.
 */
function getGeneroBadgeStyles(genero: GeneroPelicula): string {
  switch (genero) {
    case GeneroPelicula.Accion: return "bg-red-100 text-red-700 border-red-200";
    case GeneroPelicula.Comedia: return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case GeneroPelicula.Drama: return "bg-blue-100 text-blue-700 border-blue-200";
    case GeneroPelicula.CienciaFiccion: return "bg-purple-100 text-purple-700 border-purple-200";
    case GeneroPelicula.Terror: return "bg-gray-800 text-gray-100 border-gray-700";
    case GeneroPelicula.Documental: return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case GeneroPelicula.Animacion: return "bg-pink-100 text-pink-700 border-pink-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export default function Ejercicio2() {
  // --- Estados ---
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState<GeneroPelicula>(GeneroPelicula.Accion);
  const [pais, setPais] = useState<PaisPelicula>(PaisPelicula.Venezuela);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  // Datos para selects
  const generosKeys = getGeneroKeys();
  const paisesValues = Object.values(PaisPelicula);

  // --- Efectos (Carga y Guardado en LocalStorage) ---
  useEffect(() => {
    setMounted(true);
    const data = localStorage.getItem("peliculas");
    if (data) {
      try {
        setPeliculas(JSON.parse(data));
      } catch (e) {
        console.error("Error parsing localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("peliculas", JSON.stringify(peliculas));
    }
  }, [peliculas, mounted]);

  // --- Handlers ---
  const agregarPelicula = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) {
      setError("El título es obligatorio.");
      return;
    }
    const existe = peliculas.some(p => p.titulo.toLowerCase() === titulo.toLowerCase());
    if (existe) {
      setError("Esta película ya está registrada.");
      return;
    }

    const nueva: Pelicula = { titulo, genero, pais };
    setPeliculas([...peliculas, nueva]);
    setTitulo("");
    setError("");
  };

  const eliminarPelicula = (index: number) => {
    const copia = [...peliculas];
    copia.splice(index, 1);
    setPeliculas(copia);
  };

  // Evitar Hydration Mismatch
  if (!mounted) return <div className="min-h-screen bg-white"></div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">

      <main className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 min-h-[800px]">

          {/* COLUMNA IZQUIERDA: Bienvenida e Información */}
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Círculos decorativos de fondo */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex gap-4 mb-8">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                  <Image src="/favicon.ico" alt="Logo" width={40} height={40} className="w-10 h-10 object-contain" />
                </div>
              </div>

              <h1 className="text-5xl font-black leading-tight mb-6">
                Manejo de <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                  Películas
                </span>
                <br /> con Enums
              </h1>

              <p className="text-blue-200 text-lg font-light leading-relaxed mb-10">
                Ejercicio práctico para demostrar el uso de TypeScript Enums y persistencia LocalStorage en una interfaz moderna.
              </p>

              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
                  <h3 className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3">Géneros Disponibles</h3>
                  <div className="flex flex-wrap gap-2">
                    {generosKeys.map((g, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs text-blue-100 border border-white/5 hover:bg-white/20 transition-colors cursor-default">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
                  <h3 className="text-xs font-bold text-teal-300 uppercase tracking-widest mb-3">Países Disponibles</h3>
                  <div className="flex flex-wrap gap-2">
                    {paisesValues.map((p, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs text-teal-100 border border-white/5 hover:bg-white/20 transition-colors cursor-default">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-10">
              <p className="text-sm text-blue-400/80">Profesor Carlos Márquez 😎</p>
            </div>
          </div>

          {/* COLUMNA DERECHA: App Funcional */}
          <div className="lg:col-span-3 bg-white p-10 flex flex-col">

            {/* Header Formulario */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full inline-block"></span>
                Nueva Película
              </h2>

              <form onSubmit={agregarPelicula} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex flex-col gap-5">

                  {/* Input Título */}
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Título del film</label>
                    <input
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      placeholder="Ej: Interestelar"
                      className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder-slate-300"
                    />
                  </div>

                  {/* Selects Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Género</label>
                      <div className="relative">
                        <select
                          value={genero}
                          onChange={(e) => setGenero(Number(e.target.value))}
                          className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                        >
                          {generosKeys.map((g, i) => (
                            <option key={i} value={i}>{g}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">País de origen</label>
                      <div className="relative">
                        <select
                          value={pais}
                          onChange={(e) => setPais(e.target.value as PaisPelicula)}
                          className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                        >
                          {paisesValues.map((p, i) => (
                            <option key={i} value={p}>{p}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botón y Error */}
                  <div className="flex items-center justify-between mt-2">
                    {error ? (
                      <span className="text-red-500 text-sm font-medium animate-pulse">⚠ {error}</span>
                    ) : (
                      <span></span>
                    )}
                    <button
                      type="submit"
                      className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-600 transform transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/30"
                    >
                      + Agregar a la lista
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Lista de Películas */}
            <div className="flex-grow flex flex-col min-h-0">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center justify-between">
                <span>Mi Colección</span>
                <span className="text-xs bg-slate-100 text-slate-500 py-1 px-3 rounded-full">{peliculas.length} películas</span>
              </h2>

              <div className="flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                {peliculas.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 rounded-2xl">
                    <p className="text-4xl mb-2">🎬</p>
                    <p>Tu colección está vacía</p>
                  </div>
                ) : (
                  peliculas.map((p, i) => (
                    <div key={i} className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-blue-200">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg shadow-sm ${getGeneroBadgeStyles(p.genero).split(' ')[0]}`}>
                          {/* Icono simple basado en la primera letra del género */}
                          {GeneroPelicula[p.genero][0]}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">{p.titulo}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getGeneroBadgeStyles(p.genero)}`}>
                              {GeneroPelicula[p.genero]}
                            </span>
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200">
                              {p.pais}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => eliminarPelicula(i)}
                        className="text-slate-300 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Eliminar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer Global para esta página */}
      <footer className="text-center py-6 text-slate-400 text-sm font-medium">
        Desarrollado por Frederick Durán =) | <Link href="/" className="hover:text-blue-500 transition-colors">Volver al Inicio</Link>
      </footer>

    </div>
  );
}