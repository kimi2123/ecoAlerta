import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { useNavigate } from "react-router-dom";

// Evita reconfigurar si ya está hecho
if (!L.Icon.Default.prototype._getIconUrl) {
  L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });
}

import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { AlertTriangle, CalendarDays, MapPin, Flame, Factory, Pickaxe, Squirrel, Image as ImageIcon } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const tituloPorSlug = {
  "incendio-forestal": "Incendio forestal",
  "contaminacion": "Contaminación",
  "mineria-ilegal": "Minería ilegal",
  "vida-silvestre": "Vida silvestre",
};
const IconoPorSlug = {
  "incendio-forestal": Flame,
  "contaminacion": Factory,
  "mineria-ilegal": Pickaxe,
  "vida-silvestre": Squirrel,
};

export default function Informe() {
  const navigate = useNavigate();
  const { slug, id } = useParams();
  const [denuncia, setDenuncia] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const titulo = tituloPorSlug[slug] ?? "Informe";
  const IconoCategoria = IconoPorSlug[slug] ?? null;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const respuesta = await fetch(`http://localhost:8080/GetDenuncias.php?id=${encodeURIComponent(id)}`);
        if (!respuesta.ok) throw new Error("No se pudo cargar el informe");
        const data = await respuesta.json();
        if (!alive) return;
        setDenuncia(data);
      } catch (e) {
        if (alive) setError(e.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return <main className="max-w-3xl mx-auto px-4 md:px-8 py-10">Cargando…</main>;
  }
  if (error || !denuncia) {
    return <main className="max-w-3xl mx-auto px-4 md:px-8 py-10">Error: {error ?? "Sin datos"}</main>;
  }

  const fecha = new Date(denuncia.fecha).toLocaleDateString("es-EC", { day: "2-digit", month: "long", year: "numeric" });

  const lat = Number(denuncia.lat);
  const lng = Number(denuncia.lng);
  const tieneCoordenadas = Number.isFinite(lat) && Number.isFinite(lng);
  const fotoUrl = denuncia.foto_url || null;

  return (
    <main className="max-w-3xl mx-auto px-4 md:px-8 py-10">
      <article className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <header className="flex items-start justify-between p-6 md:p-8">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-slate-800">
              Informe de reporte
            </p>

            <div className="mt-2 flex items-center gap-3">
              {/* Icono por categoría, ahora en verde */}
              {IconoCategoria && (
                <IconoCategoria className="h-10 w-10 text-emerald-600" />
              )}

              {/* Título con degradado verde (sin rojo intenso) */}
              <h1
                className="
                  text-5xl md:text-5xl font-extrabold tracking-tight leading-tight
                  bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-600
                  bg-clip-text text-transparent inline-block
                "
              >
                {titulo}
              </h1>
            </div>
          </div>
        </header>

        <hr className="border-slate-200" />

        <section className="p-6 md:p-8 space-y-8">
          <div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-slate-900">Tipo de incidente</h2>
            </div>
            <p className="mt-2 text-2xl font-semibold">{denuncia.tipo}</p>
            {denuncia.descripcion && (
              <p className="mt-1 text-slate-700">{denuncia.descripcion}</p>
            )}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-slate-900">Fecha del incidente</h2>
            </div>
            <p className="mt-2 text-xl">{fecha}</p>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-slate-900">Ubicación y fotos</h2>
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-slate-200">
                {tieneCoordenadas ? (
                  <MapContainer center={[lat, lng]} zoom={14} scrollWheelZoom={false} className="h-48 w-full">
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[lat, lng]}>
                      <Popup>
                        {denuncia.tipo}{denuncia.ciudad ? ` — ${denuncia.ciudad}` : ""}
                      </Popup>
                    </Marker>
                  </MapContainer>
                ) : (
                  <div className="h-48 w-full flex items-center justify-center bg-slate-100 text-slate-500">
                    Sin coordenadas
                  </div>
                )}
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-200 min-h-48 flex items-center justify-center bg-slate-50">
                {fotoUrl ? (
                  <img src={fotoUrl} alt="Evidencia" className="w-full h-48 object-cover" loading="lazy" />
                ) : (
                  <div className="flex items-center gap-2 text-slate-500">
                    <ImageIcon className="h-5 w-5" /> Sin foto adjunta
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-left text-green-500 mt-4">
            <button
              onClick={() => navigate(`/categorias/${slug}`)} // Regresa a la lista de denuncias para la categoría
              
            >
              Volver a la lista de denuncias
            </button>
          </div>
        </section>
      </article>
    </main>
  );
}      




