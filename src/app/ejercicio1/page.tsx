// app/ejercicio1/page.tsx - Vista 1: Formulario
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ejercicio 1 | Animal Favorito',
  description: 'Formulario para enviar tu animal favorito al servidor.',
};

/**
 * @fileoverview Vista del Formulario (Ejercicio 1)
 * @description Esta es la primera parte del ejercicio 1.
 * Muestra un formulario sencillo que pide un "Animal Favorito".
 * 
 * LO IMPORTANTE AQUÍ:
 * El formulario usa la propiedad 'action="/api/ejercicio1"'.
 * Esto significa que cuando le das al botón enviar, los datos viajan
 * directamente a nuestro servidor Node.js (Route Handler) para ser procesados.
 * 
 * @author Frederick Durán
 */
export default function Ejercicio1Formulario() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg border border-gray-100">

        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Ejercicio 1
        </h1>
        <p className="text-gray-500 font-medium text-center mb-8">
          Bienvenido! Profesor Carlos Márquez 👨🏻‍💻
        </p>

        <p className="text-gray-700 mb-8 text-center text-lg leading-relaxed">
          Ingresa el nombre de su <span className="font-bold text-blue-600">animal favorito</span> para procesarlo en el servidor Node.js.
        </p>

        {/* 
          AQUÍ ESTÁ LA MAGIA: 
          action="/api/ejercicio1" -> Envía los datos a la API
          method="POST" -> Método HTTP seguro para enviar datos
        */}
        <form
          action="/api/ejercicio1"
          method="POST"
          className="space-y-6"
        >
          <div className="relative group">
            <label htmlFor="animal" className="block text-sm font-bold text-gray-700 mb-2">
              Animal Favorito
            </label>
            <input
              type="text"
              id="animal"
              name="animal"
              placeholder="Ej: Jaguar"
              required
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-900 placeholder-gray-400 transition-all font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors shadow-md"
          >
            Enviar a Node.js
          </button>
        </form>

        {/* Sección decorativa con ejemplos =) */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Ejemplos válidos:</h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">🦁 León</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">🐬 Delfín</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">🦅 Águila</span>
          </div>
        </div>

      </div>

      <footer className="mt-12 text-center text-gray-500 font-medium">
        <p className="mb-2">
          Desarrollado por Frederick Durán =)
        </p>
        <Link href="/" className="text-sm text-blue-500 hover:text-blue-700 hover:underline transition-colors">
          ← Volver al Menú Principal
        </Link>
      </footer>
    </div>
  );
}