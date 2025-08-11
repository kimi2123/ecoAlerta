import { useParams, useNavigate } from "react-router-dom";
import { use, useEffect, useState } from "react";

export default function Informe() {
    const {slug} = useParams();
    const navigate = useNavigate();
    const [denuncia, setDenuncias] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const respuesta = await fetch(`/api/GetDenuncias.php?id=${id}`);
                if (!respuesta.ok) throw new Error("Error en la respuesta de la API");
                const datos = await respuesta.json();
                if(!alive) return;

                if (slug && datos.categoria !== slug) {
                    navigate("/categorias/${data.categoria}/${data.id}/informe", {replace: true});
                    return;
                }
                setDenuncias(datos);
            } catch (e) {
                if (alive) setError(e.message);
            }
        })();
        return () => { alive = false; };
    }, [id, slug, navigate]);

    if(error) return <main className="max-w-3x1 mx-auto p-7">Error: {error}</main>;
    if (!denuncia) return <main className="max-w-3x1 mx-auto p-7">Cargando...</main>;

    return (
    <main className="max-w-3xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
        Informe de denuncia
      </h1>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Tipo de incidente</h2>
          <p className="text-xl font-semibold">{denuncia.tipo}</p>
          {denuncia.descripcion && (
            <p className="text-slate-700 mt-1">{denuncia.descripcion}</p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">Fecha del incidente</h2>
          <p>
            {fecha
              ? fecha.toLocaleDateString("es-EC", { day: "2-digit", month: "long", year: "numeric" })
              : "Sin fecha"}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">Ubicación y fotos</h2>

          {(denuncia.lat && denuncia.lng) ? (
            <>
              <p className="text-slate-700 mb-2">
                Coordenadas: {denuncia.lat}, {denuncia.lng}
              </p>
              {/* Mapa embebido sin dependencias */}
              <div className="rounded-xl overflow-hidden h-64">
                <iframe
                  title="Ubicación"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(denuncia.lat)},${encodeURIComponent(denuncia.lng)}&z=15&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </>
          ) : (
            <p className="text-slate-500 mb-2">Sin coordenadas</p>
          )}

          {denuncia.foto && (
            <img
              src={denuncia.foto}
              alt="Evidencia"
              className="w-full h-56 object-cover rounded-xl mt-4"
            />
          )}
        </div>
      </section>
    </main>
  );
}

