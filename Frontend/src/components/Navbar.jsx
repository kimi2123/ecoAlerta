import { Link } from "react-router-dom";
import { Bell } from "lucide-react"; 

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#000000] flex items-center gap-2">
          <Bell className="text-[#55c57a]" />
          EcoAlerta
        </Link>

        <div className="flex space-x-8">
          <Link to="/" className="text-lg text-[#000000] hover:text-[#55c57a]">
            Inicio
          </Link>
          <Link to="/categorias" className="text-lg text-[#000000] hover:text-[#55c57a]">
            Categorías
          </Link>
          <Link to="/sobre" className="text-lg text-[#000000] hover:text-[#55c57a]">
            Sobre
          </Link>
        </div>

        {/* Boton "Denunciar ahora" */}
        <div className="flex items-center">
          <Link
            to="/denunciar" // Esto lleva al formulario de reporte
            className="px-6 py-3 bg-gradient-to-r from-[#55c57a] to-[#6eaf81] text-[#000000] rounded-full shadow-lg hover:bg-[#6eaf81] transition-all"
          >
            Denunciar ahora
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;