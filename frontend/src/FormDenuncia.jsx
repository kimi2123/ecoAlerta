import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LocationPanel from "./LocationPanel";
import Button from "./components/Button";
const FormDenuncia = () => {
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("");
  const [fecha, setFecha] = useState(null);
  const [foto, setFoto] = useState();
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  // Estado unificado de ubicación
  const [loc, setLoc] = useState({
    lat: null,
    lng: null,
    ciudad: "",
    direccion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const fechaISO = fecha instanceof Date ? fecha.toISOString() : (fecha || "");

    if (!tipo || !descripcion) return alert("Por favor, completa todos los campos obligatorios.");
    if (loc.lat == null || loc.lng == null) return alert("Por favor, selecciona una ubicación válida.");
    if (!loc.ciudad) return alert("Por favor, selecciona una ubicación válida.");
    if (!foto) return alert("Por favor, adjunta una foto del incidente.");

    const datosEnviar = new FormData();
    datosEnviar.append("tipo", tipo);
    datosEnviar.append("descripcion", descripcion);
    datosEnviar.append("fecha", String(fechaISO));
    datosEnviar.append("foto", foto);
    datosEnviar.append("lat", String(loc.lat));
    datosEnviar.append("lng", String(loc.lng));
    datosEnviar.append("ciudad", loc.ciudad || "");
    datosEnviar.append("direccion", loc.direccion || "");

    

    try {
      const respuesta = await fetch("/api/CrearDenuncia.php", {
        method: "POST",
        body: datosEnviar,
      });
      const data = await respuesta.json();
      if (!respuesta.ok || data.status !== "success") throw new Error(data.msg || "Error al crear la denuncia");
    alert("Denuncia registrada. ID: " + data.id);
    }catch (err) {
      console.error(err);
      alert("No se pudo enviar la denuncia.");
    }finally{
      setSending(true);
    }

  };

  return (
    <div className="container  mx-auto p-4">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        {/* COLUMNA IZQUIERDA: formulario */}
        <div className="bg-gray rounded-2xl shadow-sm p-6 animate-fade-up">
          <h1 className="text-3xl font-bold mb-6 text-black">Formulario de denuncia</h1>

          <div className="mb-4">
            <label className=" block text-sm font-medium text-gray-700">Tipo de incidente</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-black placeholder:text-slate-400
             focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 transition"
            >
              <option value="">— Selecciona —</option>
              <option value="Contaminación">Contaminación</option>
              <option value="Incendio forestal">Incendio forestal</option>
              <option value="Minería ilegal">Minería ilegal</option>
              <option value="Vida silvestre">Vida silvestre</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descripción clara del incidente</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-black placeholder:text-slate-400
             focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 transition" 
              placeholder="Describe lo ocurrido con detalles"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha del incidente</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker className="w-full border rounded-xl px-3 py-2 text-black placeholder:text-slate-400
             focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 transition"  value={fecha} onChange={setFecha} />
              </LocalizationProvider>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Foto</label>
              <input
                type="file"
            className="w-full border rounded-xl px-3 py-2 text-black placeholder:text-slate-400
             focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 transition"                
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  if (!file) {
                    setFoto(null); setError("");return;
                  }
                  if (!file.type.startsWith("image/")) {
                    setFoto(null);
                    setError("El archivo debe ser una imagen");
                    e.target.value = "";
                    return;
                  }
                  setFoto(file);
                  setError("");                
                }}
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
              {foto && (<img src={URL.createObjectURL(foto)} alt="Vista previa"className="mt-2 h-24 object-cover rounded border" />)}
            </div>
          </div>

          <Button
            type="submit"
            variant="custom"
            color="#16a34a"   // verde
            fg="#ffffff"
            size="md"
            className="w-full mt-2"
          >
            Enviar
          </Button>
        </div>

        {/* COLUMNA DERECHA: ubicación */}
        <div className="bg-white rounded-2xl shadow-sm p-6 animate-fade-up">
          <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
          <LocationPanel
            value={loc}
            onChange={(next) => setLoc(next)}
          />
        </div>
      </form>
    </div>
  );
};

export default FormDenuncia;