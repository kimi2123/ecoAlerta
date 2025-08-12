import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CategoriaResultados = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categorias = useMemo(() => ({
    "contaminacion": "Contaminación",
    "incendio-forestal": "Incendio forestal",
    "mineria-ilegal": "Minería ilegal",
    "vida-silvestre": "Vida silvestre"
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
        const response = await fetch(`http://localhost:8080/GetDenuncias.php?tipo=${categoria}`);
        
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API.");
        }

        const result = await response.json();
        if (Array.isArray(result)) {
          setData(result);
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
  }, [slug, categoria]);

  if (loading) return <p>Cargando...</p>;

  if (error) return <p>Error al cargar los datos: {error}</p>;

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      <div className="text-3xl font-bold text-black mb-4 flex items-center">
        <span className="text-green-500 mr-2">🔥</span>
        {categoria || slug}
      </div>

      <div className="w-full max-w-lg bg-gray-50 p-4 rounded-lg shadow-md">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-black">Denuncias</h3>

            {data && data.length > 0 ? (
              data.map((denuncia) => (
                <div key={denuncia.id} className="border-b border-gray-300 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {new Date(denuncia.fecha).toLocaleDateString()}
                    </span>
                    <span className="font-semibold text-gray-800">{denuncia.ciudad}</span>
                  </div>
                  <p className="text-sm text-gray-700">{denuncia.descripcion}</p>
                </div>
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
