// app/ejercicio1/resultado/page.tsx - Vista 2: Archivo que muestra el resultado
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resultado | Ejercicio 1',
};

export default async function Ejercicio1Resultado({
    searchParams,
}: {
    searchParams: Promise<{ animal?: string }>
}) {

    // Extraemos el parámetro 'animal' que viene de la URL (enviado por la redirección de Node.js)
    const { animal } = await searchParams;
    // Si no hay animal, mostramos un fallback
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
                    El servidor Node.js procesó la solicitud.
                </p>

                <div className="bg-blue-50 rounded-2xl p-8 mb-8 border border-blue-100">
                    <p className="text-sm text-blue-500 uppercase tracking-widest font-bold mb-3">
                        Tu Animal Favorito es
                    </p>
                    <h2 className="text-4xl font-black text-blue-700 break-words">
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
