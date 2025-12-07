// src/app/page.tsx - Menú Principal
import Link from 'next/link';

export default function Home() {
  return (
    // Usa la misma altura calculada para centrar verticalmente debajo del Header
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8 min-h-[calc(100vh-4rem)]">
       <div className="flex justify-center items-center mb-4">
         <img src="/favicon.ico" alt="Favicon" className="w-20 h-20 mr-2" />
         <img src="/next.svg" alt="Next.js Logo" className="w-40 h-40" />
       </div>

      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg text-center">
       
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
          Evaluación Práctica 1. Programación III
        </h1>
        <p className="text-xl text-gray-600 mb-10">

          Hola👋🏻, Profesor Carlos Márquez,
          <br></br>
          Seleccione el ejercicio que desea visualizar.
          
        </p>

        <div className="space-y-4">
          
          {/* Enlace al Ejercicio 1 */}
          <Link 
            href="/ejercicio1" 
            className="block py-3 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md"
          >
            Ejercicio 1: Node.js (Interceptación y Recarga)
          </Link>

          {/* Enlace al Ejercicio 2 */}
          <Link 
            href="/ejercicio2" 
            className="block py-3 px-6 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-150 shadow-md"
          >
            Ejercicio 2: TypeScript (Enumeraciones)
          </Link>

        </div>
        
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>Desarrollado por Frederick Durán</p>
      </div>
    </div>
  );
}