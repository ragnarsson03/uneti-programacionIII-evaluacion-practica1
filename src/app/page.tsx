// src/app/page.tsx - Menú Principal
import Link from 'next/link';
import Image from 'next/image';

/**
 * @fileoverview Página de Inicio (Home)
 * @description Esta es la puerta de entrada a nuestra aplicación.
 * 
 * Aquí presentamos al usuario (Profesor) un menú sencillo 
 * para navegar hacia los dos ejercicios de la evaluación.
 * 
 * Funcionalidades clave:
 * - Uso del componente <Link> de Next.js para navegación rápida (SPA).
 * - Uso del componente <Image> para cargar logos de forma optimizada.
 * 
 * @author Frederick Durán
 */
export default function Home() {
  return (
    // Contenedor principal centrado
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8 min-h-[calc(100vh-4rem)]">

      {/* Logos de cabecera */}
      <div className="flex justify-center items-center mb-4">
        <Image src="/favicon.ico" alt="Favicon" width={80} height={80} className="w-20 h-20 mr-2" />
        <Image src="/next.svg" alt="Next.js Logo" width={160} height={160} className="w-40 h-40" />
      </div>

      {/* Tarjeta de bienvenida */}
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg text-center">

        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
          Evaluación Práctica 1. Programación III
        </h1>

        <p className="text-xl text-gray-600 mb-10">
          Hola👋🏻, Profesor Carlos Márquez,
          <br />
          Seleccione el ejercicio que desea visualizar.
        </p>

        {/* Botones de navegación */}
        <div className="space-y-4">

          {/* Botón para Ejercicio 1 */}
          <Link
            href="/ejercicio1"
            className="block py-3 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md"
          >
            Ejercicio 1: Node.js (Interceptación y Recarga)
          </Link>

          {/* Botón para Ejercicio 2 */}
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