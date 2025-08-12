// src/pages/NotFound.jsx
import React from "react";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <p>
        <a href="/" style={{ color: "blue", textDecoration: "underline" }}>Volver a la página de inicio</a>
      </p>
    </div>
  );
};

export default NotFound;