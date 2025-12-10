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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white-500 via-teal-500 to-white-500 p-6">
            <div className="bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center transform transition-all hover:scale-[1.02] duration-300">

                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-green-100 rounded-full">
                        <span className="text-4xl">✅</span>
                    </div>
                </div>

                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                    ¡Interceptado con Éxito!
                </h1>

                <p className="text-gray-500 font-medium mb-8">
                    El servidor Node.js procesó la solicitud.
                </p>

                <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-100 shadow-inner">
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-3">
                        Tu Animal Favorito es
                    </p>
                    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 break-words drop-shadow-sm">
                        {value}
                    </h2>
                </div>

                <Link
                    href="/ejercicio1"
                    className="inline-flex items-center justify-center w-full py-3 px-6 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                    ↩ Probar con otro animal
                </Link>
            </div>

            <footer className="mt-12 text-center text-white/90 font-medium tracking-wide">
                <p className="drop-shadow-md mb-2">
                    Desarrollado por Frederick Durán =)
                </p>
                <p className="text-xs text-white/60">
                    Vista 2 (Resultado Procesado)
                </p>
            </footer>
        </div>
    );
}
