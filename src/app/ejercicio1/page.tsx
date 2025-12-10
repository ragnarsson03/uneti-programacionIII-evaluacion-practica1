// app/ejercicio1/page.tsx - Vista 1: Formulario - Ruta del ejercicio1
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ejercicio 1 | Animal Favorito',
  description: 'Formulario para enviar tu animal favorito al servidor.',
};

export default function Ejercicio1Formulario() {
  /**
   * Vista Principal del Ejercicio 1.
   * Muestra un formulario estilizado para capturar el animal favorito del usuario.
   * Los datos se envían vía POST a nuestra API en Node.js (route.ts).
   */
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500-500 p-6">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-lg transition-all hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transform hover:-translate-y-1">

        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 text-center">
          Ejercicio 1
        </h1>
        <p className="text-gray-500 font-medium text-center mb-8">
          Profesor Carlos Márquez 👨🏻‍💻
        </p>

        <p className="text-gray-700 mb-8 text-center text-lg leading-relaxed">
          Ingresa el nombre de su <span className="font-bold text-purple-600">animal favorito</span> para procesarlo en el servidor Node.js.
        </p>

        {/* Formulario que apunta al Route Handler (Node.js) */}
        <form
          action="/api/ejercicio1"
          method="POST"
          className="space-y-6"
        >
          <div className="relative group">
            <label htmlFor="animal" className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
              Animal Favorito
            </label>
            <input
              type="text"
              id="animal"
              name="animal"
              placeholder="Ej: Jaguar"
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 text-gray-900 placeholder-gray-400 transition-all font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-purple-500/30 transform transition-all active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            Enviar a Node.js 🚀
          </button>
        </form>

        {/* Sección de Ejemplos */}
        <div className="mt-10 pt-6 border-t border-gray-200/60">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Ejemplos válidos:</h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">🦁 León</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">🐬 Delfín</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">🦅 Águila</span>
          </div>
        </div>

      </div>

      {/* Footer Requerido */}
      <footer className="mt-12 text-center text-white/90 font-medium tracking-wide">
        <p className="drop-shadow-md mb-2">
          Desarrollado por Frederick Durán =)
        </p>
        <Link href="/" className="text-sm text-white/70 hover:text-white hover:underline transition-colors">
          ← Volver al Menú Principal
        </Link>
      </footer>
    </div>
  );
}