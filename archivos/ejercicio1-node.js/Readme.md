# 🟦 Ejercicio 1 – Node.js + Express + TypeScript + EJS

Aplicación web que solicita al usuario ingresar su animal favorito a través de un formulario HTML y luego muestra el resultado en una segunda vista generada dinámicamente desde el servidor con EJS.

---

## 📜 Descripción del Proyecto

Este proyecto es parte de la Evaluación Práctica 1 de Programación III en UNETI (2025-2). La aplicación está construida con un backend en Node.js y Express, utilizando TypeScript para el tipado estático y EJS como motor de plantillas para renderizar las vistas en el frontend.

### Características
- **Servidor Backend:** Configurado con Express y TypeScript para manejar las solicitudes HTTP.
- **Formulario HTML:** Una vista principal (`index.ejs`) que captura la entrada del usuario.
- **Renderizado Dinámico:** El servidor procesa los datos del formulario y renderiza una segunda vista (`resultado.ejs`) mostrando el animal ingresado.
- **Estructura Organizada:** El código está separado en carpetas de `backend` y `frontend` para una mejor organización.
- **Estilos CSS:** Incluye una carpeta `public` para servir archivos estáticos como hojas de estilo.

---

## 🛠️ Tecnologías Utilizadas

### Node.js
Entorno de ejecución de JavaScript del lado del servidor. Permite construir aplicaciones de red rápidas y escalables.

### Express
Framework web minimalista y flexible para Node.js que proporciona un conjunto robusto de características para aplicaciones web y móviles.

### TypeScript
Superset de JavaScript que añade tipado estático opcional. Ayuda a construir aplicaciones más robustas y a detectar errores en tiempo de desarrollo.

### EJS (Embedded JavaScript)
Motor de plantillas que permite generar HTML dinámico incrustando código JavaScript directamente en los archivos `.ejs`. Es ideal para aplicaciones en Node.js y Express.

#### ¿Por qué usar EJS?
- **Facilidad de integración:** Se integra de forma nativa con Express.
- **Sintaxis familiar:** Utiliza JavaScript estándar, por lo que no es necesario aprender una nueva sintaxis de plantillas.
- **Versatilidad:** Permite el uso de bucles, condicionales e inclusión de plantillas parciales para crear vistas complejas.

---

## 📦 Requisitos Previos

- Node.js 18+
- npm (Node Package Manager)
- Un navegador web moderno

---

## ⚙️ Comandos de Instalación y Ejecución

A continuación, se muestran los comandos utilizados para configurar y ejecutar el proyecto.

**1. Inicializar el proyecto:**
Crea un archivo `package.json` para gestionar las dependencias.
```bash
npm init -y
```

**2. Instalar Express:**
Añade el framework Express al proyecto.
```bash
npm install express
```

**3. Instalar dependencias de desarrollo:**
Instala TypeScript, `ts-node` para ejecutar archivos de TypeScript directamente y los tipos de Node y Express.
```bash
npm install -D typescript ts-node @types/node @types/express
```

**4. Crear archivo `tsconfig.json`:**
Genera el archivo de configuración de TypeScript.
```bash
npx tsc --init
```

**5. Ejecutar el servidor en modo de desarrollo:**
Inicia el servidor y lo reinicia automáticamente ante cualquier cambio en el código fuente.
```bash
npm run dev
```

---

## 🚀 Despliegue

(Colocar aquí el enlace al despliegue en Vercel, Netlify u otra plataforma)

---

## 👨‍🏫 Docente

- **Profesor:** Carlos Márquez
- **Institución:** UNETI

---

## 📄 Notas

Todo el código se encuentra documentado con explicaciones propias del estudiante, siguiendo las indicaciones establecidas para la evaluación.
