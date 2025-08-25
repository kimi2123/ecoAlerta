# 🌱 ecoAlerta

**ecoAlerta** es una aplicación web de demostración para reportar incidentes ecológicos. Está diseñada con una arquitectura de frontend y backend separadas:

- **Frontend:** Desarrollado con React + Vite.
- **Backend:** Construido con PHP.

---

## Requisitos Previos
Inatalar lo siguiente:

- [Node.js y npm](https://nodejs.org) – Para gestionar y ejecutar el frontend.
- [PHP](https://www.php.net/) – Para ejecutar el servidor backend.
- [Git](https://git-scm.com/) – Para clonar el repositorio.

---

## Pasos para Ejecutar la Demo

### 1. Clonar el Repositorio

Abre una terminal y ejecuta:


    git clone <URL_DEL_REPOSITORIO>
    cd ecoAlerta

2. Ejecutar el Backend (PHP)

Desde la raíz del proyecto, ejecuta el siguiente comando para iniciar el servidor backend:

    php -S localhost:8080 -t Backend/Api

  Esto levantará el servidor PHP en: http://localhost:8080

3. Ejecutar el Frontend (React + Vite)

En una nueva terminal, navega al directorio Frontend:

    cd Frontend

Instala las dependencias:

    npm install

Luego, inicia el servidor de desarrollo:

    npm run dev


🌐 Acceso a la Aplicación

Una vez ambos servidores estén corriendo:

    http://localhost:5173
