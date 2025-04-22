import { useState } from "react";
import { Save, RefreshCcw } from "lucide-react";

function Crear() {
  const [tipo, setTipo] = useState("camiseta");
  const [color, setColor] = useState("blanco");
  const [material, setMaterial] = useState("algodon");
  const [talla, setTalla] = useState("M");
  const [cantidad, setCantidad] = useState(1);
  const [estampaIndex, setEstampaIndex] = useState(0);
  const [imagenPersonalizada, setImagenPersonalizada] = useState(null);
  const [usarPersonalizada, setUsarPersonalizada] = useState(false);
  const [imagenLink, setImagenLink] = useState("");
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(40);
  const [tamano, setTamano] = useState(100);
  const [busqueda, setBusqueda] = useState("");
  const [modo, setModo] = useState("imagen");
  const [texto, setTexto] = useState("");
  const [colorTexto, setColorTexto] = useState("#000000");
  const [nombreDiseno, setNombreDiseno] = useState("");
  const [misDisenos, setMisDisenos] = useState([]);

  const tipos = [
    { id: "camiseta", label: "Camiseta" },
    { id: "buso", label: "Buso" },
    { id: "buso-capotero", label: "Buso Capotero" },
  ];
  const colores = ["blanco", "negro"];
  const materiales = ["algodon", "poliester"];
  const tallas = ["S", "M", "L", "XL"];

  const estampas = [
    { nombre: "estampa1", etiquetas: ["flor", "colorido"] },
    { nombre: "estampa2", etiquetas: ["moderno", "abstracto"] },
    { nombre: "estampa3", etiquetas: ["naturaleza"] },
    { nombre: "estampa4", etiquetas: ["arte", "retro"] },
  ];

  const estampasFiltradas = estampas.filter((e) =>
    e.etiquetas.some((tag) =>
      tag.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  const siguienteEstampa = () => {
    setEstampaIndex((prev) => (prev + 1) % estampasFiltradas.length);
    setUsarPersonalizada(false);
  };

  const anteriorEstampa = () => {
    setEstampaIndex(
      (prev) => (prev - 1 + estampasFiltradas.length) % estampasFiltradas.length
    );
    setUsarPersonalizada(false);
  };

  const handleImagenPersonalizada = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagenPersonalizada(url);
      setUsarPersonalizada(true);
    }
  };

  const handleImagenLink = () => {
    if (imagenLink) {
      setImagenPersonalizada(imagenLink);
      setUsarPersonalizada(true);
    }
  };

  const reiniciarDiseno = () => {
    setPosX(50);
    setPosY(40);
    setTamano(100);
    setImagenPersonalizada(null);
    setUsarPersonalizada(false);
    setImagenLink("");
    setTexto("");
    setColorTexto("#000000");
    setNombreDiseno("");
  };

  const guardarDiseno = () => {
    const nuevoDiseno = {
      nombre: nombreDiseno,
      tipo,
      color,
      material,
      talla,
      cantidad,
      modo,
      contenido:
        modo === "imagen"
          ? {
              imagen: usarPersonalizada ? imagenPersonalizada : imagenEstampa,
              posX,
              posY,
              tamano,
            }
          : {
              texto,
              colorTexto,
              posX,
              posY,
              tamano,
            },
    };
    setMisDisenos((prev) => [...prev, nuevoDiseno]);
    alert("Diseño guardado exitosamente");
  };

  const imagenBase = `/LaTienda/Img-Bases/${tipo}-${color}.png`;
  const imagenEstampa = `/LaTienda/Disenos/${estampasFiltradas[estampaIndex]?.nombre}.png`;

  const contenidoSobrePrenda = () => {
    if (modo === "imagen") {
      const src = usarPersonalizada ? imagenPersonalizada : imagenEstampa;
      return (
        src && (
          <img
            src={src}
            alt="Diseño aplicado"
            className="absolute"
            style={{
              top: `${posY}%`,
              left: `${posX}%`,
              transform: "translate(-50%, -50%)",
              width: `${tamano}px`,
              height: `${tamano}px`,
              maxWidth: "200px",
              maxHeight: "200px",
            }}
          />
        )
      );
    }
    if (modo === "texto") {
      return (
        <div
          className="absolute text-center font-bold"
          style={{
            top: `${posY}%`,
            left: `${posX}%`,
            transform: "translate(-50%, -50%)",
            width: `${tamano}px`,
            fontSize: `${tamano / 6}px`,
            color: colorTexto,
            wordWrap: "break-word",
          }}
        >
          {texto}
        </div>
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      <div className="md:col-span-3 text-center">
        <h1 className="text-2xl font-bold mb-6">Personaliza tu prenda</h1>
      </div>
      {/* Izquierda */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Tipo de prenda:</label>
          <select
            className="w-full p-2 border rounded"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            {tipos.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Color y cantidad */}
        <div className="mb-4 flex items-center space-x-8">
          <label className="block font-medium mb-1">Color:</label>
          <div className="flex space-x-1">
            {colores.map((c) => (
              <div
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                  color === c ? "border-black" : "border-gray-400"
                }`}
                style={{ backgroundColor: c === "negro" ? "black" : c }}
              ></div>
            ))}
          </div>
          <div>
            <label className="block font-medium mb-1">Cantidad:</label>
            <input
              type="number"
              min={1}
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="w-16 p-1 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Material:</label>
          <select
            className="w-full p-2 border rounded"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            {materiales.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Talla:</label>
          <select
            className="w-full p-2 border rounded"
            value={talla}
            onChange={(e) => setTalla(e.target.value)}
          >
            {tallas.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Buscar diseño:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Ej: flor, arte, retro..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <label className="block font-medium">Modo:</label>
          <select
            className="p-2 border rounded"
            value={modo}
            onChange={(e) => setModo(e.target.value)}
          >
            <option value="imagen">Imagen</option>
            <option value="texto">Texto</option>
          </select>
        </div>
      </div>

      {/* Centro */}
      <div className="flex flex-col items-center">
        <div className="relative bg-gray-100 aspect-square w-full max-w-md">
          <img
            src={imagenBase}
            alt="Prenda base"
            className="w-full h-full object-contain"
          />
          {contenidoSobrePrenda()}
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={anteriorEstampa}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Anterior
          </button>
          <button
            onClick={siguienteEstampa}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Derecha */}
      <div>
        <label className="block font-medium mb-1">Posición X (%):</label>
        <input
          type="range"
          min={0}
          max={100}
          value={posX}
          onChange={(e) => setPosX(Number(e.target.value))}
          className="w-full mb-2"
        />

        <label className="block font-medium mb-1">Posición Y (%):</label>
        <input
          type="range"
          min={0}
          max={100}
          value={posY}
          onChange={(e) => setPosY(Number(e.target.value))}
          className="w-full mb-2"
        />

        <label className="block font-medium mb-1">Tamaño:</label>
        <input
          type="range"
          min={50}
          max={300}
          value={tamano}
          onChange={(e) => setTamano(Number(e.target.value))}
          className="w-full mb-4"
        />

        {modo === "imagen" && (
          <>
            <input
              type="file"
              accept="image/*"
              className="mb-2"
              onChange={handleImagenPersonalizada}
            />
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder="Pega un link de imagen"
              value={imagenLink}
              onChange={(e) => setImagenLink(e.target.value)}
            />
            <button
              className="w-full bg-blue-500 text-white p-2 rounded mb-4"
              onClick={handleImagenLink}
            >
              Usar imagen del link
            </button>
          </>
        )}

        {modo === "texto" && (
          <>
            <label className="block font-medium mb-1">Texto:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder="Escribe tu texto"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <label className="block font-medium mb-1">Color del texto:</label>
            <input
              type="color"
              className="w-full h-10 p-1 border rounded mb-4"
              value={colorTexto}
              onChange={(e) => setColorTexto(e.target.value)}
            />
          </>
        )}

        <label className="block font-medium mb-1">Nombre del diseño:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Nombre para tu diseño"
          value={nombreDiseno}
          onChange={(e) => setNombreDiseno(e.target.value)}
        />

        <div className="flex space-x-2">
          <button
            onClick={guardarDiseno}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            <Save className="inline-block mr-2" /> Guardar diseño
          </button>
          <button
            onClick={reiniciarDiseno}
            className="bg-red-500 text-white px-4 py-2 rounded w-full"
          >
            <RefreshCcw className="inline-block mr-2" /> Reiniciar
          </button>
        </div>
      </div>

      {/* Resumen de la selección */}
      <div className="md:col-span-3 mt-6 p-4 bg-gray-200 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">
          Resumen de tu configuración:
        </h3>
        <p>
          <strong>Tipo de prenda:</strong> {tipo}
        </p>
        <p>
          <strong>Color:</strong> {color}
        </p>
        <p>
          <strong>Material:</strong> {material}
        </p>
        <p>
          <strong>Talla:</strong> {talla}
        </p>
        <p>
          <strong>Cantidad:</strong> {cantidad}
        </p>
        <p>
          <strong>Diseño:</strong>{" "}
          {modo === "imagen"
            ? usarPersonalizada
              ? "Imagen personalizada"
              : estampasFiltradas[estampaIndex]?.nombre
            : texto}
        </p>
        <p>
          <strong>Posición X:</strong> {posX}%
        </p>
        <p>
          <strong>Posición Y:</strong> {posY}%
        </p>
        <p>
          <strong>Tamaño:</strong> {tamano}px
        </p>
      </div>
    </div>
  );
}

export default Crear;
