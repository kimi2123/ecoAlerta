import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Factory, Flame, Pickaxe, Squirrel } from "lucide-react"; 

const CategoriaResultados = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ciudad, setCiudad] = useState(''); 
  const [anio, setAnio] = useState(''); 

  const [ciudadesDisponibles, setCiudadesDisponibles] = useState([]);
  const [añosDisponibles, setAñosDisponibles] = useState([]);


  const categorias = useMemo(() => ({
    "contaminacion": { label: "Contaminación", icon: Factory },
    "incendio-forestal": { label: "Incendio forestal", icon: Flame },
    "mineria-ilegal": { label: "Minería ilegal", icon: Pickaxe },
    "vida-silvestre": { label: "Vida silvestre", icon: Squirrel }
  }), []);

  const categoria = categorias[slug];

  useEffect(() => {
    if (!categoria) {
      setError("Categoría no encontrada");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        let url = `http://localhost:8080/GetDenuncias.php?tipo=${categoria.label}`;

        if (ciudad) url += `&ciudad=${ciudad}`; 
        if (anio) url += `&anio=${anio}`; 

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API.");
        }

        const result = await response.json();
        if (Array.isArray(result)) {
          setData(result);

          const ciudades = [...new Set(result.map(item => item.ciudad))];
          const años = [...new Set(result.map(item => new Date(item.fecha).getFullYear()))];

          setCiudadesDisponibles(ciudades);
          setAñosDisponibles(años);
        } else {
          throw new Error("Formato de respuesta inesperado.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, categoria, ciudad, anio]);

  if (loading) return <p>Cargando...</p>;

  if (error) return <p>Error al cargar los datos: {error}</p>;

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      <div className="text-3xl font-bold text-black mb-4 flex items-center">
        {categoria?.icon && <categoria.icon className="h-10 w-10 text-green-500 mr-2" />}
        {categoria?.label || slug}
      </div>

      <div className="w-full max-w-lg bg-gray-50 p-4 rounded-lg shadow-md">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-black">Ciudad</label>
              <select 
                value={ciudad} 
                onChange={(e) => setCiudad(e.target.value)} 
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option value="">Todas</option> 
                {ciudadesDisponibles.map((ciudad, index) => (
                  <option key={index} value={ciudad}>{ciudad}</option>
                ))}
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-semibold text-black">Año</label>
              <select 
                value={anio} 
                onChange={(e) => setAnio(e.target.value)} 
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option value="">Todos</option> 
                {añosDisponibles.map((año, index) => (
                  <option key={index} value={año}>{año}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <h3 className="text-lg font-semibold text-black">Denuncias</h3>

            {data && data.length > 0 ? (
              data.map((denuncia) => (
                <button
                 key={denuncia.id} 
                 onClick={() => navigate(`/categorias/${slug}/${denuncia.id}/informe`)}
                 className= "w-full text-left border-b border-gray-300 py-2 hover:bg-gray-50 rounded-md transition cursor-pointer"
                 type="button"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {new Date(denuncia.fecha).toLocaleDateString()}
                    </span>
                    <span className="font-semibold text-gray-800">{denuncia.ciudad}</span>
                  </div>
                  <p className="text-sm text-gray-700">{denuncia.descripcion}</p>
                </button>
              ))
            ) : (
              <p>No hay denuncias disponibles.</p>
            )}
          </div>

          <button 
            className="text-green-500 mt-4"
            onClick={() => navigate('/categorias')}
          >
            Volver a categorías
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriaResultados;
