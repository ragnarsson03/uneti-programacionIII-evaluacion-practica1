// src/components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Menú Principal */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition duration-150">
            {/* Usando tu imagen de logotipo de UNETI */}
            <Image 
              src="/uneti-logotipo.png" 
              alt="UNETI Logo" 
              width={30} 
              height={30} 
              className="rounded-full"
            />
            <span className="text-xl font-bold tracking-tight hidden sm:block">
              Prog III - Evaluación
            </span>
          </Link>

          {/* Enlaces de Navegación */}
          <nav className="flex space-x-6">
            <Link href="/" className="hover:text-indigo-200 transition duration-150 py-2">
              Menú
            </Link>
            <Link href="/ejercicio1" className="hover:text-indigo-200 transition duration-150 py-2">
              Ejercicio 1
            </Link>
            <Link href="/ejercicio2" className="hover:text-green-300 transition duration-150 py-2">
              Ejercicio 2
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
}