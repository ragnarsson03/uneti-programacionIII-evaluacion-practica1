// src/components/Header.tsx
import Image from 'next/image';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Image 
            src="/uneti-logotipo.png" 
            alt="UNETI Logo" 
            width={50} 
            height={50} 
            className="rounded-full"
          />
          <span className="text-xl font-bold hidden sm:block">
            Prog III - Evaluación 1
          </span>
        </div>

        {/* Navbar */}
        <Navbar />
      </div>
    </header>
  );
}
