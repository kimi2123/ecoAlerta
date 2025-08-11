import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormDenuncia from "./FormDenuncia";
import "./App.css";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para la pantalla principal de denuncia */}
        <Route path="/" element={<FormDenuncia />} />
        {/* Si la ruta no coincide con ninguna de las anteriores */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;