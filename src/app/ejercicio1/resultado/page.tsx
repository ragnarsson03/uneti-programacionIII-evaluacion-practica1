// app/ejercicio1/resultado/page.tsx - Vista 2: Resultado
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resultado | Ejercicio 1',
};

/**
 * @fileoverview Vista de Resultado (Ejercicio 1)
 * @description Esta página es la que el usuario ve DESPUÉS de enviar el formulario.
 * 
 * ¿Cómo funciona?
 * 1. El servidor recibe el animal.
 * 2. El servidor redirige a esta página enviando el dato en la URL (Query Param).
 * 3. Esta página lee ese dato de la URL y lo muestra en pantalla.
 * 
 * @author Frederick Durán
 */
export default async function Ejercicio1Resultado({
    searchParams,
}: {
    searchParams: Promise<{ animal?: string }>
}) {

    // Leemos los parámetros que vienen en la URL (ej: ?animal=Leon)
    const { animal } = await searchParams;

    // Si por alguna razón no viene el animal, mostramos un texto por defecto
    const value = animal ?? "No especificado";

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg text-center border border-gray-100">

                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-green-50 rounded-full">
                        <span className="text-4xl text-green-600">✅</span>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    ¡Interceptado con Éxito!
                </h1>

                <p className="text-gray-500 font-medium mb-8">
                    El servidor Node.js procesó la solicitud correctamente.
                </p>

                <div className="bg-blue-50 rounded-2xl p-8 mb-8 border border-blue-100">
                    <p className="text-sm text-blue-500 uppercase tracking-widest font-bold mb-3">
                        Tu Animal Favorito es
                    </p>
                    {/* Aquí mostramos el valor que interceptamos */}
                    <h2 className="text-4xl font-black text-blue-700 break-words capitalize">
                        {value}
                    </h2>
                </div>

                <Link
                    href="/ejercicio1"
                    className="inline-flex items-center justify-center w-full py-3 px-6 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors shadow-md"
                >
                    ↩ Probar con otro animal
                </Link>
            </div>

            <footer className="mt-12 text-center text-gray-500 font-medium">
                <p className="mb-2">
                    Desarrollado por Frederick Durán =)
                </p>
                <p className="text-xs text-gray-400">
                    Vista 2 (Resultado Procesado)
                </p>
            </footer>
        </div>
    );
}
