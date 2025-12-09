// app/ejercicio1/resultado/page.tsx - Vista 2: Archivo que muestra el resultado
import Link from 'next/link';

export default async function Ejercicio1Resultado({
    searchParams,
}: {
    searchParams: Promise<{ animal?: string }>
}) {

    const { animal } = await searchParams;
    const value = animal ?? "No especificado";

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
                
                <h1 className="text-4xl font-extrabold text-green-600 mb-4">
                    ¡Resultado Procesado!
                </h1>

                <p className="text-xl text-gray-700 mb-8">
                    El animal favorito que fue interceptado por Node.js es:
                </p>

                <h2 className="text-5xl font-black text-indigo-700 break-words mb-8">
                    {value}
                </h2>

                <Link 
                    href="/ejercicio1"
                    className="inline-block py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-150"
                >
                    Volver al Formulario
                </Link>
            </div>
            <div className="mt-4 text-sm text-gray-500">
                <p>Vista 2 (Resultado)</p>
            </div>
        </div>
    );
}
