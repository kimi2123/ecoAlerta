import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import FormDenuncia from "./FormDenuncia";
import Navbar from './components/Navbar'; 
import Home from './components/sections/Home';
import Categorias from './pages/Categorias';  
import CategoriaResultados from './pages/CategoriaResultados';
import Reporte from './pages/Reporte';  
import Sobre from './pages/Sobre';  
import NotFound from './pages/NotFound.jsx';  // Página para el error 404

function App() {
  return (
    <Router>
      {/* Navbar aparece en todas las páginas */}
      <Navbar />
      {/* Definición de rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/:slug" element={<CategoriaResultados />} />
        <Route path="/denunciar" element={<FormDenuncia />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;