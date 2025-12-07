// app/page.tsx - Esta es la Página principal de la Evaluación (Menú) y es la ruta raíz "/"
// muy importante no eliminar ni modificar
import Link from 'next/link';

export default function Home() {
  return (
    // Aquí usamos clases de Tailwind para un diseño simple y centrado
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-4rem)] bg-gray-100 p-4">
      
      <p className="text-lg text-gray-700 mb-4">Hola👋🏻, Profesor Carlos Márquez</p>

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6 border-b pb-2">
          Evaluación Práctica 1  Programación III 📚
        </h1>
        
        <ul className="space-y-4">
          <li>
            {/* Enlace al Ejercicio 1 (Formulario) */}
            <Link 
              href="/ejercicio1"
              className="block bg-indigo-500 text-white py-3 px-4 rounded-lg text-center hover:bg-indigo-600 transition duration-150"
            >
              Ejercicio 1 – Node.js (Animal Favorito)
            </Link>
          </li>
          
          <li>
            {/* Enlace al Ejercicio 2 (TypeScript Enums) */}
            <Link 
              href="/ejercicio2"
              className="block bg-green-500 text-white py-3 px-4 rounded-lg text-center hover:bg-green-600 transition duration-150"
            >
              Ejercicio 2 – TypeScript + Enumeraciones
            </Link>
          </li>
        </ul>
      </div>
      <p className="text-lg text-gray-700 mb-4">Felicidades, la app se está ejecutando 🎉!!</p>
    </div>
  );
}
