// src/app/ejercicio2/page.tsx
import { GeneroPelicula, PaisPelicula } from "./enums";

export default function Ejercicio2Enumeraciones() {
  const generos = Object.values(GeneroPelicula);
  const paises = Object.values(PaisPelicula);

  const listaCompleta = [
    ...generos.map(g => ({ type: "Género", value: g, color: "bg-indigo-200" })),
    ...paises.map(p => ({ type: "País", value: p, color: "bg-green-200" })),
  ];

  return (
    <div className="flex flex-col items-center justify-start bg-gray-100 p-4 min-h-[calc(100vh-4rem)]">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: LISTADO DE ENUMS */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold text-indigo-700">
            🎬 Listado de Enumeraciones (TypeScript)
          </h1>
          <p className="text-gray-600 mb-6">
            Aquí se muestran los valores definidos en las enumeraciones de **Género** y **País**.
          </p>
          
          <div className="space-y-3">
            {listaCompleta.map((item, index) => (
              <div key={index} className={`p-3 rounded-lg flex justify-between items-center ${item.color} shadow-sm`}>
                <span className="font-semibold text-gray-800">{item.value}</span>
                <span className="text-xs text-gray-600 italic">{item.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: FORMULARIO DEMO */}
        <div className="lg:col-span-1 border-l pl-8 space-y-6">
          <h2 className="text-xl font-bold text-red-600 border-b pb-2">
            Añadir Ejemplo (No Funcional)
          </h2>
          <form className="space-y-4">
            <label htmlFor="ejemplo" className="block text-gray-700 font-semibold">
              Nombre del elemento
            </label>
            <div className="flex space-x-2">
              <input 
                type="text" 
                id="ejemplo" 
                placeholder="Ej: Nueva Animación" 
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
              <button 
                type="submit" 
                className="py-2 px-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-150"
              >
                Añadir
              </button>
            </div>
            <p className="text-sm text-gray-500 italic">
              Este formulario es solo demostrativo.
            </p>
          </form>
        </div>

      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Vista del Ejercicio 2. Enumeraciones listas y listadas correctamente.</p>
      </div>
    </div>
  );
}
