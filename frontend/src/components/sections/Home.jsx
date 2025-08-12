import home from "@/assets/home.jpg";

const Home = () => {
    return (
        <section className="relative overflow-hidden bg-white min-h-screen w-full flex flex-col justify-center items-center py-12 px-4 overflow-x-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center py-12 md:py-20 w-full max-w-7xl mx-auto">
                {/* Contenedor de texto */}
                <div className="text-center md:text-left px-4 md:px-20">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
                        Aplicación para denunciar incidentes ambientales
                    </h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Informa sobre contaminación, incendios forestales, minería ilegal y más. Registra ubicación, fotos y fecha en minutos.
                    </p>

                    {/* Contenedor de los botones */}
                    <div className="flex justify-center md:justify-start gap-4">
                        {/* Boton "Denunciar ahora" */}
                        <a
                            href="/denunciar"
                            className="px-6 py-3 bg-gradient-to-r from-[#55c57a] to-[#6eaf81] text-[#000000] rounded-full shadow-lg hover:bg-[#6eaf81] focus:outline-none"
                        >
                            Denunciar ahora
                        </a>

                        {/* Boton "Ver categorias" */}
                        <a
                            href="/categorias"
                            className="px-6 py-3 border-2 border-[#55c57a] text-[#000000] rounded-full shadow-md hover:bg-[#55c57a] focus:outline-none"
                        >
                            Ver categorías
                        </a>
                    </div>
                </div>

                {/* Contenedor de la imagen */}
                <div className="relative w-full md:w-3/4 h-[300px] md:h-[400px] mt-8 md:mt-0 mx-auto">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 opacity-80">
                        <img
                            src={home} 
                            alt="Ilustración de inicio – ciudadanos que reportan incidentes."
                            className="relative rounded-xl shadow-lg w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;