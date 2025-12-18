import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react"; // Importa desde lucide-react
// import { Image } from "astro:assets";

// Recibimos la lista de música COMPLETA como prop
export default function MusicFilter({ music }) {
  const dropdownRef = useRef(null);
  const [type, setType] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (newType) => {
    setSelectedType(newType);
    setType(false);
  };

  // Lógica de filtrado
  const filteredMusic = music
    .filter((item) => item.status === "public") // Filtramos los privados
    .filter((item) => {
      const typeMatch = selectedType === "Todos" || item.type === selectedType;
      const searchTermMatch =
        searchTerm === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return typeMatch && searchTermMatch;
    });

  // useEffect para cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setType(false);
      }
    };
    if (type) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [type]);

  return (
    <>
      <div className="w-full z-5 my-5 gap-3 flex flex-col sm:flex-row items-center justify-center md:justify-between">
        <div className="w-full flex items-center justify-start gap-2">
          <h1 className="sr-only">Lanzamientos de Daniel Ospid</h1>
          <h2 className="text-center text-2xl font-semibold font-sans">
            Música
          </h2>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-end gap-1">
          <div className="w-full md:w-50 h-9.5 px-3.5 flex items-center relative rounded-md border border-neutral-200 bg-neutral-50">
            <input
              type="text"
              placeholder="Buscar por título..."
              className="size-full font-normal text-sm font-sans focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search size={20} />
          </div>
          <div
            className="w-full md:w-50 h-9.5 px-3.5 cursor-pointer flex items-center relative rounded-md border border-neutral-200 bg-neutral-50"
            onClick={() => setType(!type)}
          >
            <button
              type="button"
              className="w-full h-9.5 px-1 flex items-center justify-start cursor-pointer font-normal text-sm font-sans"
            >
              {selectedType}
            </button>
            <ChevronDown size={20} />
            <div
              ref={dropdownRef}
              className={`w-full flex flex-col p-1 gap-1 absolute top-[calc(100%+4px)] rounded-md border border-neutral-200 bg-neutral-100 -ml-3.5 duration-300 ease-out ${
                type ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <button
                type="button"
                className="w-full h-9.5 px-3.5 flex items-center justify-start cursor-pointer rounded-md hover:bg-neutral-200 font-normal text-sm font-sans"
                onClick={() => handleTypeChange("Todos")}
              >
                Todos
              </button>
              <button
                type="button"
                className="w-full h-9.5 px-3.5 flex items-center justify-start cursor-pointer rounded-md hover:bg-neutral-200 font-normal text-sm font-sans"
                onClick={() => handleTypeChange("Sencillo")}
              >
                Sencillos
              </button>
              <button
                type="button"
                className="w-full h-9.5 px-3.5 flex items-center justify-start cursor-pointer rounded-md hover:bg-neutral-200 font-normal text-sm font-sans"
                onClick={() => handleTypeChange("EP")}
              >
                EP
              </button>
              <button
                type="button"
                className="w-full h-9.5 px-3.5 flex items-center justify-start cursor-pointer rounded-md hover:bg-neutral-200 font-normal text-sm font-sans"
                onClick={() => handleTypeChange("Álbum")}
              >
                Álbumes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Aquí renderizamos la grilla filtrada */}
      <div className="w-full my-5 grid grid-cols-12 gap-x-1 gap-y-4">
        {filteredMusic.map((item) => (
          // Este es el HTML de tu MusicBox.astro, recreado en React
          <a
            key={item.path}
            href={`/music/${item.path}`}
            className="w-full grid grid-cols-1 grid-rows-2 gap-1 col-span-12 md:col-span-3 lg:col-span-3 row-span-4"
          >
            <div className="w-full aspect-square rounded-md bg-neutral-50 overflow-hidden row-span-3">
              {item.covers && item.covers.length > 0 ? (
                <img
                  src={item.covers[0]}
                  alt={`Portada de «${item.title}»`}
                  title={`Portada de «${item.title}»`}
                  width={297}
                  height={297}
                  loading="eager"
                  fetchPriority="high"
                  className="size-full object-cover object-center select-none pointer-events-none"
                />
              ) : null}
            </div>
            <div className="w-full row-span-1">
              <h3 className="font-medium text-lg font-sans">{item.title}</h3>
              <p className="font-normal text-sm font-sans">{`${item.type}`}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
