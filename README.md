<div align="center">
  <img src="uneti-logotipo.png" alt="Logo UNETI" width="200"/>
</div>

<h1 align="center">Evaluación Práctica 1 – Programación III (UNETI – 2025-2)</h1>

Este repositorio contiene el desarrollo de los dos ejercicios solicitados en la Evaluación Práctica 1 de la Unidad Curricular Programación III. El proyecto está organizado en directorios independientes para mantener una separación clara entre cada actividad.

---

## 📂 Estructura General del Repositorio

```
.
├── ejercicio1-node.js/   # Aplicación web con Node.js, Express y EJS
├── ejercicio2-typescript/  # Lógica de negocio con TypeScript y Vite
├── uneti-logotipo.png      # Logotipo de la institución
└── README.md               # Este archivo
```

---

## 🚀 Ejercicio 1 – Node.js + Express + TypeScript + EJS

Aplicación web simple que presenta un formulario donde el usuario puede ingresar su animal favorito. Al enviarlo, el servidor procesa la información y muestra el resultado en una nueva página renderizada dinámicamente con EJS.

### 🛠️ Tecnologías Utilizadas

-   **Node.js:** Entorno de ejecución de JavaScript del lado del servidor.
-   **Express:** Framework web minimalista para Node.js, utilizado para gestionar rutas y middlewares.
-   **TypeScript:** Superset de JavaScript que añade tipado estático para un desarrollo más robusto.
-   **EJS (Embedded JavaScript):** Es un Motor de plantillas que permite generar HTML dinámico incrustando código JavaScript.


-    **¿Por qué usar EJS?**
Facilidad de integración: Se integra muy bien con aplicaciones que ya utilizan Node.js y Express.js.


### ⚙️ Instalación y Ejecución

1.  **Navegar al directorio del backend:**
    ```bash
    cd ejercicio1-node.js/backend
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor en modo de desarrollo:**
    El servidor se iniciará en `http://localhost:3000` y se reiniciará automáticamente con cada cambio.
    ```bash
    npm run dev
    ```

---

## 🔬 Ejercicio 2 – TypeScript + Vite

Proyecto que implementa enumeraciones (`enums`) en TypeScript para representar y clasificar géneros y países de películas, mostrando los resultados directamente en la consola del navegador.

### 🛠️ Tecnologías Utilizadas

-   **TypeScript:** Utilizado para definir los `enums` y la lógica de la aplicación.
-   **Vite:** Herramienta de desarrollo frontend moderna que proporciona un servidor de desarrollo rápido y empaqueta el código para producción.

---

## 👨‍🏫 Docente

-   **Profesor:** Carlos Márquez
-   **Institución:** UNETI

## Estudiante

-   Frederick Durán 👨🏻‍💻
