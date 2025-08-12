import { Link } from "react-router-dom";
import { Factory, Flame, Pickaxe, Squirrel } from "lucide-react";

const items = [
  { slug: "contaminacion",     title: "Contaminación",        desc: "Derrames, emisiones y desechos.", icon: Factory },
  { slug: "incendio-forestal", title: "Incendios forestales", desc: "Fuego que amenaza bosques.",      icon: Flame },
  { slug: "mineria-ilegal",    title: "Minería ilegal",       desc: "Actividades no autorizadas.",      icon: Pickaxe },
  { slug: "vida-silvestre",    title: "Vida silvestre",       desc: "Caza furtiva y abuso a animales.", icon: Squirrel },
];

export default function Categorias() {
  return (
    <main className="w-full bg-white">
      {/* Contenedor centrado, un poco más abajo y con buen padding inferior */}
      <section className="mx-auto w-full max-w-6xl px-4 md:px-8 pt-14 pb-16">
        {/* Titulo centrado y con ancho de lectura agradable */}
        <h1 className="
              text-left
              text-3xl md:text-5xl
              font-extrabold tracking-tight text-slate-900
              mb-10
              max-w-none       
              whitespace-nowrap 
              leading-tight
            ">
          Categorías de incidentes ambientales
        </h1>

        {/* 1 col en móvil, 2 col en md+, centrado por el contenedor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {items.map(({ slug, title, desc, icon: Icon }) => (
            <Link key={slug} to={`/categorias/${slug}`} className="block h-full">
              <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm transition hover:shadow-md">
                <header className="flex items-start gap-4">
                  <Icon className="h-6 w-6 text-[#55c57a] shrink-0" />
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                    <p className="text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                </header>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}