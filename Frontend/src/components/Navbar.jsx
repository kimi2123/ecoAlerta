import { Link } from "react-router-dom";
import { Bell } from "lucide-react"; 
import Logo from "@/assets/Logo.png";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#000000] flex items-center gap-2 ">
          <img
            src={Logo}
            alt="Campana"
            className= "w-8 h-8 mr-1" 
          />
          <span className="text-3xl md:text-3xl font-extrabold tracking-tight leading-tight
                  bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-600
                  bg-clip-text text-transparent inline-block">EcoAlerta</span>
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
            className="px-6 py-3 bg-gradient-to-r from-[#55c57a] to-[#6eaf81] text-black rounded-full shadow-lg hover:bg-[#6eaf81] transition-all"
          >
            Denunciar ahora
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;