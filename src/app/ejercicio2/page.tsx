"use client";

import { useEffect, useState } from "react";
import { GeneroPelicula, PaisPelicula } from "./enums";

type Pelicula = {
  titulo: string;
  genero: GeneroPelicula;
  pais: PaisPelicula;
};

function getEnumKeys(enumObject: any): string[] {
  return Object.keys(enumObject).filter(key => isNaN(Number(key)));
}

export default function Ejercicio2() {
  const generos = getEnumKeys(GeneroPelicula);
  const paises = Object.values(PaisPelicula);

  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState<GeneroPelicula>(GeneroPelicula.Accion);
  const [pais, setPais] = useState<PaisPelicula>(PaisPelicula.Venezuela);
  const [error, setError] = useState("");

  // ✅ CARGAR DESDE LOCALSTORAGE
  useEffect(() => {
    const data = localStorage.getItem("peliculas");
    if (data) {
      setPeliculas(JSON.parse(data));
    }
  }, []);

  // ✅ GUARDAR EN LOCALSTORAGE
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
    setGenero(GeneroPelicula.Accion);
    setPais(PaisPelicula.Venezuela);
    setError("");
  };

  const eliminarPelicula = (index: number) => {
    const copia = [...peliculas];
    copia.splice(index, 1);
    setPeliculas(copia);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white max-w-5xl w-full p-8 rounded-xl shadow-xl grid md:grid-cols-2 gap-8">

        {/* IZQUIERDA */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Ejercicio 2</h1>
          <h2 className="text-lg font-semibold mb-2">🎬 Géneros</h2>
          <ul className="mb-6 space-y-2">
            {generos.map((g, i) => (
              <li key={i} className="bg-indigo-100 px-3 py-1 rounded">
                {g}
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mb-2">🌍 Países</h2>
          <ul className="space-y-2">
            {paises.map((p, i) => (
              <li key={i} className="bg-green-100 px-3 py-1 rounded">
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* DERECHA */}
        <div>
          <h2 className="text-xl font-bold mb-4">Añadir Película</h2>

          <form onSubmit={agregarPelicula} className="space-y-3">
            <input
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="Nombre de la película"
              className="w-full border p-2 rounded"
            />

            <select
              value={genero}
              onChange={e => setGenero(Number(e.target.value))}
              className="w-full border p-2 rounded"
            >
              {generos.map((g, i) => (
                <option key={i} value={i}>{g}</option>
              ))}
            </select>

            <select
              value={pais}
              onChange={e => setPais(e.target.value as PaisPelicula)}
              className="w-full border p-2 rounded"
            >
              {paises.map((p, i) => (
                <option key={i} value={p}>{p}</option>
              ))}
            </select>

            <button className="w-full bg-blue-600 text-white py-2 rounded">
              Añadir
            </button>

            {error && <p className="text-red-600 text-sm">{error}</p>}
          </form>

          <h3 className="text-lg font-bold mt-6 mb-2">Listado</h3>

          <div className="space-y-2">
            {peliculas.map((p, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <div>
                  <p className="font-semibold">{p.titulo}</p>
                  <p className="text-sm text-gray-600">
                    {GeneroPelicula[p.genero]} — {p.pais}
                  </p>
                </div>

                <button
                  onClick={() => eliminarPelicula(i)}
                  className="text-red-600 font-bold"
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
