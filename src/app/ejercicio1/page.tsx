// app/ejercicio1/page.tsx - Vista 1: Formulario - Ruta del ejercicio1
import Link from 'next/link';

export default function Ejercicio1Formulario() {
  // El formulario hará POST a la Route Handler (route.ts) en la misma ruta: /ejercicio1
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        
        {/* Tu diseño migrado de index.html */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Bienvenido al Ejercicio 1 Profesor Carlos Márquez 👨🏻‍💻
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Ingrese el nombre de su animal favorito para enviarlo al servidor (Node.js).
        </p>

        {/* Este es el Formulario que apunta al Route Handler (route.ts) */}
        <form 
            action="/api/ejercicio1" // La misma ruta que interceptará el route.ts
            method="POST" 
            className="space-y-4"
        >
          <label htmlFor="animal" className="block text-gray-700 font-semibold">
            Animal favorito:
          </label>
          <input 
            type="text" 
            id="animal" 
            name="animal" 
            placeholder="Ejemplo: Tigre" 
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />

          <button 
            type="submit" 
            className="w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-150"
          >
            Enviar
          </button>
        </form>
        
        {/* Ejemplos para el usuario*/}
        <h3 className="text-xl font-semibold mt-8 border-t pt-4 text-gray-900">Ejemplos:</h3>
        <ul className="list-disc list-inside text-gray-600 ml-4">
            <li>León</li>
            <li>Perro</li>
        </ul>

      </div>
      <div className="fixed bottom-4 text-sm text-gray-600">
        <p>Desarrollado por Frederick Durán =) | <Link href="/" className="text-blue-500 hover:underline">Volver al Menú</Link></p>
      </div>
    </div>
  );
}