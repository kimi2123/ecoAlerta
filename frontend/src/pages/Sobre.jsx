import React from "react";

/** Puntito + texto (viñeta bonita) */
const Bullet = ({ children }) => (
  <li className="flex items-start gap-3">
    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500"></span>
    <span className="text-slate-600">{children}</span>
  </li>
);

/** Icono de correo (inline SVG para no instalar libs) */
const MailIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-6 w-6 text-emerald-600"
    aria-hidden="true"
    {...props}
  >
    <path d="M4 8l8 5 8-5" />
    <rect x="3" y="5" width="18" height="14" rx="2" />
  </svg>
);

export default function Sobre() {
  return (
    <main className="relative">
      {/* fondo suave en degradado (no tapa el contenido) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-50/70 to-teal-50/20" />

      <section className="relative container mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-start">
        <div> 
         <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-8">
          Cómo funciona EcoAlerta
        </h1>

        <ul className="space-y-4 mb-10">
          <Bullet>Selecciona el tipo de incidente.</Bullet>
          <Bullet>Describe lo ocurrido, la fecha del incidente y sube evidencia.</Bullet>
          <Bullet>Marca la ubicación para coordenadas precisas.</Bullet>
          <Bullet>En caso de no poder acceder a la geolocalizacion existe modo manual para asignar la ubicacion</Bullet>
          <Bullet>Los incidentes reportados seran guardados en una base de datos</Bullet>
        </ul>
        </div>
          
        <div>
           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-8">
          Cómo acceder a los registros de los incidentes
        </h1>

        <ul className="space-y-4 mb-10">
          <Bullet>Acceda a la seccion de categorias en la parte superior.</Bullet>
          <Bullet>Acceda al tipo de incidente al que quiere acceder</Bullet>
          <Bullet>Cuando acceda se mostrara una lista con los incidentes de esa categoria</Bullet>
          <Bullet>Podra aplastar click encima de un incidente y se mostrara todos los datos recibidos acerca de la denuncia del incidente</Bullet>
        </ul>
        </div>

        {/* tarjeta de contacto */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-8">
          Para contactarnos puede escribir al siguiente correo           
        </h1>
        <div className="w-fit bg-white border rounded-xl shadow-sm p-4 flex items-center gap-3">
          
          <MailIcon />
           
          <a
            href="mailto:contacto@ecoalerta.ec"
            className="font-medium text-emerald-700 hover:underline size-full"
          >
            contacto@ecoalerta.ec
          </a>
        </div>
      </section>

      {/* Bloque extra opcional: qué se puede reportar */}
      <section className="relative container mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          ¿Qué puedes reportar?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900">Contaminación</h3>
            <p className="text-slate-600 text-sm mt-1">
              Derrames, emisiones y desechos.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900">Incendios forestales</h3>
            <p className="text-slate-600 text-sm mt-1">
              Focos de fuego, humo o riesgos inminentes.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900">Minería ilegal</h3>
            <p className="text-slate-600 text-sm mt-1">
              Actividades no autorizadas o daños visibles.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900">Vida silvestre</h3>
            <p className="text-slate-600 text-sm mt-1">
              Actividades no autorizadas, como caza furtiva, pesca u recoleccion.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}