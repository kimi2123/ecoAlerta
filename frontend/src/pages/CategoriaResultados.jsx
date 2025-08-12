import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoriaResultados = () => {
  const { slug } = useParams(); // Obtén el parámetro "slug" de la URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Hacer la solicitud a la API usando el slug
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/GetDenuncias.php?tipo=${slug}`);
        const result = await response.json();
        
        if (Array.isArray(result)) {
          setData(result);
        } else {
          throw new Error("Formato de respuesta inesperado.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };
    fetchData();
  }, [slug]); // Dependiendo del slug, realiza una nueva solicitud

  // Mostrar mensaje mientras se cargan los datos
  if (loading) return <p>Cargando...</p>;

  // Mostrar mensaje de error si algo falla
  if (error) return <p>Error al cargar los datos: {error}</p>;

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      <div className="text-3xl font-bold text-black mb-4 flex items-center">
        <span className="text-green-500 mr-2">🔥</span>
        {slug} {/* El nombre dinámico basado en el slug */}
      </div>

      <div className="w-full max-w-lg bg-gray-50 p-4 rounded-lg shadow-md">
        <div className="space-y-4">
          {/* Denuncias */}
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

          <button className="text-green-500 mt-4">Volver a categorías</button>
        </div>
      </div>
    </div>
  );
};

export default CategoriaResultados;
