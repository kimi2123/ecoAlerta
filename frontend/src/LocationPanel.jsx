import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from "../src/components/Button";


// Valor por defecto (Ecuador aprox)
const DEFAULT_CENTER = [-1.831, -78.455]; // [lat, lng]

function ClickCapture({ onPick }) {
  useMapEvents({
    click(e) {
      if (typeof onPick === "function") {
        onPick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

const LocationPanel = ({ value, onChange }) => {
  // value: { lat: number|null, lng: number|null, ciudad: string, direccion: string }
  const [mode, setMode] = useState("gps"); // 'gps' | 'manual'
  const hasPoint = useMemo(
    () => typeof value.lat === "number" && typeof value.lng === "number",
    [value]
  );

  // Cuando entra en modo GPS, intentamos geolocalizar UNA sola vez
  useEffect(() => {
    if (mode !== "gps") return;
    if (!navigator.geolocation) {
      setMode("manual");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        onChange({ ...value, lat: latitude, lng: longitude });
      },
      () => {
        // Denegado o error → caemos a manual
        setMode("manual");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const center = hasPoint ? [value.lat, value.lng] : DEFAULT_CENTER;

  return (
    <div className="rounded-lg border p-4">
      {/* Conmutador de modo */}
      <div className="flex items-center justify-between mb-4">
        <Button
         variant={mode === "gps" ? "primary":"outline"}
          type="button"
          size="sm"
          onClick={() => setMode("gps")}
          title="Asignación automática (GPS)"
        >
          ← GPS
        </Button>
        <div className="text-sm text-gray-500 font-medium">
          Asignación: {mode === "gps" ? "Automática (GPS)" : "manual"}
        </div>
        <Button
          variant={mode === "manual" ? "custom":"customOutline"}
          color="#f59e0b"       // ámbar
          type="button"
          size="sm"
          onClick={() => setMode("manual")}
          title="Asignación manual"
        >
          Manual →
        </Button>
      </div>

      {/* Campos arriba del mapa (o del área manual) */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Latitud</label>
          <input
            type="number"
            step="any"
            className="w-full border rounded-xl px-3 py-2 text-black placeholder:text-slate-400
             focus:ring-5 focus:ring-emerald-500 focus:border-emerald-500 transition"
            value={value.lat ?? ""}
            onChange={(e) => onChange({ ...value, lat: e.target.value === "" ? null : Number(e.target.value) })}
            // Si quieres bloquear edición en GPS, descomenta:
            // readOnly={mode === "gps"}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Longitud</label>
          <input
            type="number"
            step="any"
            className="w-full border rounded-xl px-3 py-2 text-black placeholder:text-slate-400
             focus:ring-5 focus:ring-emerald-500 focus:border-emerald-500 transition"
            value={value.lng ?? ""}
            onChange={(e) => onChange({ ...value, lng: e.target.value === "" ? null : Number(e.target.value) })}
            // readOnly={mode === "gps"}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs text-gray-600 mb-1">
            Ciudad {mode === "manual" && <span className="text-red-600">*</span>}
          </label>
          <input
            type="text"
            placeholder="Quito, Guayaquil…"
            className="w-full border rounded-xl px-3 py-2 text-black placeholder:text-slate-400
             focus:ring-5 focus:ring-emerald-500 focus:border-emerald-500 transition"
            value={value.ciudad}
            onChange={(e) => onChange({ ...value, ciudad: e.target.value })}
            required={mode === "manual"}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs text-gray-600 mb-1">Dirección</label>
          <input
            type="text"
            placeholder="Calle, referencia…"
            className="w-full border rounded-xl px-3 py-2 text-black placeholder:text-slate-400
             focus:ring-5 focus:ring-emerald-500 focus:border-emerald-500 transition"
            value={value.direccion}
            onChange={(e) => onChange({ ...value, direccion: e.target.value })}
          />
        </div>
      </div>

      {/* Contenido principal según el modo */}
      {mode === "gps" ? (
        <div className="h-64 w-full rounded overflow-hidden border">
          <MapContainer center={center} zoom={hasPoint ? 14 : 6} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {hasPoint && (
              <Marker position={[value.lat, value.lng]}>
                <Popup>Ubicación seleccionada</Popup>
              </Marker>
            )}
            {/* Permite reemplazar la ubicación con un clic */}
            <ClickCapture onPick={(lat, lng) => onChange({ ...value, lat, lng })} />
          </MapContainer>
        </div>
      ) : (
        <div className="text-sm text-gray-600 bg-gray-50 border rounded p-3">
          Modo manual: completa ciudad (obligatoria), latitud y longitud. El mapa está oculto.
        </div>
      )}
    </div>
  );
};

export default LocationPanel;
