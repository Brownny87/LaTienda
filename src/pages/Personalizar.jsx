import { useState, useEffect } from "react";
import {
  Save,
  RefreshCcw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Image as ImageIcon,
  Type,
  Upload,
  Shirt,
  Palette,
  ShoppingCart,
  DollarSign
} from "lucide-react";
import { motion } from "framer-motion";

function Personalizar() {
  // --- ESTADOS ---
  // Prenda
  const [tipo, setTipo] = useState("camiseta");
  const [color, setColor] = useState("blanco");
  const [material, setMaterial] = useState("algodon");
  const [talla, setTalla] = useState("M");
  const [cantidad, setCantidad] = useState(1);

  // Diseño
  const [estampaIndex, setEstampaIndex] = useState(0);
  const [imagenPersonalizada, setImagenPersonalizada] = useState(null);
  const [usarPersonalizada, setUsarPersonalizada] = useState(false);
  const [imagenLink, setImagenLink] = useState("");
  
  // Posición y Transformación
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(40);
  const [tamano, setTamano] = useState(100);
  const [rotacion, setRotacion] = useState(0);

  // Contenido (Texto/Imagen)
  const [modo, setModo] = useState("imagen");
  const [texto, setTexto] = useState("");
  const [colorTexto, setColorTexto] = useState("#000000");
  const [fuenteTexto, setFuenteTexto] = useState("sans-serif");

  // General
  const [nombreDiseno, setNombreDiseno] = useState("");
  const [precioTotal, setPrecioTotal] = useState(0);

  // --- DATOS ---
  const tipos = [
    { id: "camiseta", label: "Camiseta", basePrice: 35000 },
    { id: "buso", label: "Buso", basePrice: 65000 },
    { id: "buso-capotero", label: "Buso Capotero", basePrice: 75000 },
  ];

  const colores = [
    { id: "blanco", hex: "#FFFFFF", border: "border-gray-200" },
    { id: "negro", hex: "#000000", border: "border-gray-800" },
    { id: "azul", hex: "#1E3A8A", border: "border-blue-900" },
    { id: "rojo", hex: "#DC2626", border: "border-red-600" },
  ];

  const materiales = ["algodon", "poliester", "mezcla"];
  const tallas = ["S", "M", "L", "XL", "XXL"];

  const estampas = [
    { nombre: "estampa1", label: "Floral" },
    { nombre: "estampa2", label: "Abstracto" },
    { nombre: "estampa3", label: "Naturaleza" },
    { nombre: "estampa4", label: "Retro" },
  ];

  // --- EFECTOS ---
  // Calcular precio dinámico
  useEffect(() => {
    const prendaSeleccionada = tipos.find(t => t.id === tipo);
    let precio = prendaSeleccionada ? prendaSeleccionada.basePrice : 0;

    // Adicionales
    if (tamano > 150) precio += 5000; // Estampado grande
    if (usarPersonalizada) precio += 2000; // Personalización propia
    
    // Multiplicar por cantidad
    setPrecioTotal(precio * cantidad);
  }, [tipo, tamano, usarPersonalizada, cantidad]);

  // --- FUNCIONES ---
  const handleImagenPersonalizada = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagenPersonalizada(url);
      setUsarPersonalizada(true);
      setModo("imagen");
    }
  };

  const reiniciarDiseno = () => {
    setPosX(50);
    setPosY(40);
    setTamano(100);
    setRotacion(0);
    setImagenPersonalizada(null);
    setUsarPersonalizada(false);
    setTexto("");
    setNombreDiseno("");
  };

  const guardarDiseno = () => {
    if (!nombreDiseno) {
      alert("Por favor dale un nombre a tu diseño para guardarlo.");
      return;
    }
    alert(`¡Diseño "${nombreDiseno}" guardado! Precio estimado: $${precioTotal.toLocaleString()}`);
  };

  // Joystick handlers
  const move = (direction) => {
    const step = 2; // % de movimiento
    switch(direction) {
      case 'up': setPosY(prev => Math.max(10, prev - step)); break;
      case 'down': setPosY(prev => Math.min(90, prev + step)); break;
      case 'left': setPosX(prev => Math.max(10, prev - step)); break;
      case 'right': setPosX(prev => Math.min(90, prev + step)); break;
    }
  };

  const getImagenBase = () => {
    if (color !== "blanco" && color !== "negro") {
        return `/LaTienda/Img-Bases/${tipo}-blanco.png`;
    }
    return `/LaTienda/Img-Bases/${tipo}-${color}.png`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-white shadow-sm border-b mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Personalizador</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* COLUMNA 1: CONFIGURACIÓN DE PRENDA (3 columnas) */}
        <div className="md:col-span-3 space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
              <Shirt className="mr-2" size={20}/> Prenda Base
            </h2>
            
            <div className="space-y-4">
              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Tipo</label>
                <select 
                  value={tipo} 
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {tipos.map(t => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {colores.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setColor(c.id)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        color === c.id ? "ring-2 ring-indigo-500 ring-offset-2 scale-110" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Talla y Material */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Talla</label>
                  <select 
                    value={talla} 
                    onChange={(e) => setTalla(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    {tallas.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Material</label>
                  <select 
                    value={material} 
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    {materiales.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              {/* Cantidad */}
              <div>
                 <label className="block text-sm font-medium text-gray-600 mb-2">Cantidad</label>
                 <div className="flex items-center border border-gray-200 rounded-lg w-32 bg-gray-50">
                    <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-l-lg">-</button>
                    <span className="flex-1 text-center font-medium">{cantidad}</span>
                    <button onClick={() => setCantidad(cantidad + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-r-lg">+</button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA 2: VISUALIZADOR (6 columnas) */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div className="relative w-full aspect-[4/5] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex items-center justify-center">
             {/* Prenda Base */}
             <motion.img
                key={`${tipo}-${color}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={getImagenBase()}
                alt="Prenda"
                className="w-full h-full object-contain z-10 p-8"
                style={{
                  filter: (color !== "blanco" && color !== "negro") ? `sepia(1) hue-rotate(${color === 'azul' ? '180deg' : '-50deg'}) saturate(3)` : 'none'
                }}
             />

             {/* Capa de Diseño */}
             <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {modo === "imagen" && (usarPersonalizada || estampas[estampaIndex]) && (
                  <motion.img
                    src={usarPersonalizada ? imagenPersonalizada : `/LaTienda/Disenos/${estampas[estampaIndex].nombre}.png`}
                    className="absolute"
                    style={{
                      top: `${posY}%`,
                      left: `${posX}%`,
                      width: `${tamano}px`,
                      transform: `translate(-50%, -50%) rotate(${rotacion}deg)`,
                    }}
                  />
                )}
                {modo === "texto" && texto && (
                  <div
                    className="absolute text-center font-bold whitespace-nowrap"
                    style={{
                      top: `${posY}%`,
                      left: `${posX}%`,
                      fontSize: `${tamano / 3}px`,
                      color: colorTexto,
                      fontFamily: fuenteTexto,
                      transform: `translate(-50%, -50%) rotate(${rotacion}deg)`,
                    }}
                  >
                    {texto}
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* COLUMNA 3: CONTROLES DE DISEÑO (3 columnas) */}
        <div className="md:col-span-3 space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            
            {/* Selector de Modo */}
            <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
              <button 
                onClick={() => setModo("imagen")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${modo === 'imagen' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
              >
                <ImageIcon size={16} className="inline mr-1"/> Imagen
              </button>
              <button 
                onClick={() => setModo("texto")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${modo === 'texto' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
              >
                <Type size={16} className="inline mr-1"/> Texto
              </button>
            </div>

            {modo === "imagen" ? (
              <div className="space-y-4">
                {/* Galería */}
                <div className="grid grid-cols-4 gap-2">
                   {estampas.map((est, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => { setEstampaIndex(idx); setUsarPersonalizada(false); }}
                        className={`aspect-square rounded-lg border-2 cursor-pointer overflow-hidden ${!usarPersonalizada && estampaIndex === idx ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-200'}`}
                      >
                        <img src={`/LaTienda/Disenos/${est.nombre}.png`} className="w-full h-full object-cover"/>
                      </div>
                   ))}
                </div>
                {/* Upload */}
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:bg-gray-50 transition cursor-pointer">
                  <input type="file" onChange={handleImagenPersonalizada} className="absolute inset-0 opacity-0 cursor-pointer"/>
                  <Upload size={20} className="mx-auto text-gray-400 mb-1"/>
                  <span className="text-xs text-gray-500 font-medium">Subir imagen</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <input 
                  type="text" 
                  value={texto} 
                  onChange={(e) => setTexto(e.target.value)} 
                  placeholder="Escribe aquí..." 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input 
                  type="color" 
                  value={colorTexto} 
                  onChange={(e) => setColorTexto(e.target.value)} 
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
            )}

            <hr className="my-4 border-gray-100"/>

            {/* JOYSTICK Y TAMAÑO */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-3 text-center">Ajustar Posición</label>
              
              <div className="flex justify-center mb-4">
                <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 rounded-full shadow-inner border border-gray-200">
                  <div className="w-10 h-10"></div>
                  <button onClick={() => move('up')} className="w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center hover:bg-indigo-50 active:bg-indigo-100 text-gray-600">
                    <ArrowUp size={18}/>
                  </button>
                  <div className="w-10 h-10"></div>
                  
                  <button onClick={() => move('left')} className="w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center hover:bg-indigo-50 active:bg-indigo-100 text-gray-600">
                    <ArrowLeft size={18}/>
                  </button>
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  </div>
                  <button onClick={() => move('right')} className="w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center hover:bg-indigo-50 active:bg-indigo-100 text-gray-600">
                    <ArrowRight size={18}/>
                  </button>
                  
                  <div className="w-10 h-10"></div>
                  <button onClick={() => move('down')} className="w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center hover:bg-indigo-50 active:bg-indigo-100 text-gray-600">
                    <ArrowDown size={18}/>
                  </button>
                  <div className="w-10 h-10"></div>
                </div>
              </div>

              {/* Controles slider compactos */}
              <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                   <ZoomOut size={16} className="text-gray-400"/>
                   <input type="range" min="50" max="300" value={tamano} onChange={(e) => setTamano(Number(e.target.value))} className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-indigo-600"/>
                   <ZoomIn size={16} className="text-gray-400"/>
                </div>
                <div className="flex items-center space-x-2">
                   <RotateCw size={16} className="text-gray-400"/>
                   <input type="range" min="0" max="360" value={rotacion} onChange={(e) => setRotacion(Number(e.target.value))} className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-indigo-600"/>
                   <span className="text-xs text-gray-500 w-8 text-right">{rotacion}°</span>
                </div>
              </div>

            </div>
          </div>
          
          {/* PANEL DE GUARDADO Y PRECIO (Ahora aquí abajo) */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mt-4">
             <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Nombre del Diseño</label>
                <input type="text" value={nombreDiseno} onChange={(e) => setNombreDiseno(e.target.value)} placeholder="Ej: Camiseta Cumpleaños" className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"/>
             </div>

             <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Total Estimado</span>
                <span className="text-xl font-bold text-green-600">${precioTotal.toLocaleString()}</span>
             </div>

             <div className="grid grid-cols-2 gap-3">
               <button onClick={reiniciarDiseno} className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium flex items-center justify-center">
                 <RefreshCcw size={16} className="mr-1"/> Reiniciar
               </button>
               <button onClick={guardarDiseno} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center justify-center shadow-sm">
                 <Save size={16} className="mr-1"/> Guardar
               </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Personalizar;