import Link from 'next/link';
import { Home, Pencil, FileCode } from 'lucide-react';

/**
 * @fileoverview Componente de Navegación (Navbar)
 * @description Barra de navegación con enlaces a las rutas principales.
 * Utiliza iconos de la librería 'lucide-react' para una mejor apariencia.
 * 
 * @author Frederick Durán
 */

export default function Navbar() {
  return (
    <nav className="flex items-center space-x-4">
      <Link href="/" className="flex items-center space-x-1 hover:text-indigo-200">
        <Home size={18} />
        <span className="text-sm sm:text-base">Inicio</span>
      </Link>
      <Link href="/ejercicio1" className="flex items-center space-x-1 hover:text-indigo-200">
        <Pencil size={18} />
        <span className="text-sm sm:text-base">Ejercicio 1</span>
      </Link>
      <Link href="/ejercicio2" className="flex items-center space-x-1 hover:text-green-300">
        <FileCode size={18} />
        <span className="text-sm sm:text-base">Ejercicio 2</span>
      </Link>
    </nav>
  );
}
