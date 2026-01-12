import { useState, useEffect, useRef } from "react";
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
  Layers,
  Trash2,
  Plus,
  Minimize2,
  Maximize2,
  Move,
  GripHorizontal,
  LayoutTemplate,
  X
} from "lucide-react";
import { motion, useDragControls } from "framer-motion";

function Personalizar() {
  // --- ESTADOS ---
  // Prenda
  const [tipo, setTipo] = useState("camiseta");
  const [color, setColor] = useState("blanco");
  const [material, setMaterial] = useState("algodon");
  const [talla, setTalla] = useState("M");
  const [cantidad, setCantidad] = useState(1);

  // Capas (Diseños múltiples)
  const [capas, setCapas] = useState([]); // { id, tipo: 'imagen'|'texto', contenido, x, y, tamano, rotacion, vista, ... }
  const [capaSeleccionada, setCapaSeleccionada] = useState(null);

  // UI State
  const [vista, setVista] = useState("frente"); // frente, espalda, manga
  const [modo, setModo] = useState("imagen"); // Para alternar paneles de herramientas
  const [textoInput, setTextoInput] = useState("");
  const [colorTexto, setColorTexto] = useState("#000000");

  // General
  const [nombreDiseno, setNombreDiseno] = useState("");
  const [precioTotal, setPrecioTotal] = useState(0);

  // Mobile Floating Controls State
  const [isMobileControlsMinimized, setIsMobileControlsMinimized] = useState(false);
  const [docking, setDocking] = useState({ mode: 'vertical', anchor: 'bottom-right' }); // anchor: 'top'|'bottom'|'bottom-right'|'custom'
  const [resetKey, setResetKey] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Para posición libre
  const movementInterval = useRef(null);
  const dragControls = useDragControls();

  const handleReset = () => {
    setDocking({ mode: 'vertical', anchor: 'bottom-right' });
    setPosition({ x: 0, y: 0 });
    setResetKey(prev => prev + 1);
    setIsMobileControlsMinimized(false);
  };

  const handleDragEnd = (event, info) => {
    const { y, x } = info.point;
    const height = window.innerHeight;
    
    // Zonas de snap (15% superior o inferior)
    const snapThreshold = 100;
    
    if (y < snapThreshold) {
        if (docking.anchor !== 'top') {
            setDocking({ mode: 'horizontal', anchor: 'top' });
            setResetKey(prev => prev + 1);
        }
    } else if (y > height - snapThreshold) {
        if (docking.anchor !== 'bottom') {
            setDocking({ mode: 'horizontal', anchor: 'bottom' });
            setResetKey(prev => prev + 1);
        }
    } else {
        // Si no está en zona de snap, dejarlo libre
        // Si veníamos de un modo anclado (horizontal o vertical-esquina), cambiamos a 'custom'
        // y guardamos la posición donde se soltó
        if (docking.anchor !== 'custom') {
            setDocking({ mode: 'vertical', anchor: 'custom' });
            setPosition({ x, y });
            // Forzamos re-render para aplicar position fixed top/left
            setResetKey(prev => prev + 1);
        }
        // Si ya estábamos en 'custom', no necesitamos hacer nada, el drag de framer motion
        // mantiene la posición visual, pero podríamos guardar el estado si quisiéramos persistencia
    }
  };

  // --- DATOS ---
  const tipos = [
    { id: "camiseta", label: "Camiseta", basePrice: 35000 },
    { id: "buso", label: "Buso", basePrice: 65000 },
    { id: "buso-capotero", label: "Buso Capotero", basePrice: 75000 },
  ];

  const colores = [
    { id: "blanco", hex: "#FFFFFF", border: "border-gray-200" },
    { id: "negro", hex: "#000000", border: "border-gray-800" },
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

    // Sumar precio de cada capa
    capas.forEach(capa => {
      if (capa.tipo === 'imagen') {
        precio += 5000; // Precio base por estampa
        if (capa.tamano > 150) precio += 2000; // Extra por tamaño grande
      } else if (capa.tipo === 'texto') {
        precio += 2000; // Precio por texto
      }
    });
    
    // Multiplicar por cantidad
    setPrecioTotal(precio * cantidad);
  }, [tipo, capas, cantidad]);

  // Actualizar inputs cuando cambia la selección
  useEffect(() => {
    if (capaSeleccionada !== null) {
      const capa = capas.find(c => c.id === capaSeleccionada);
      if (capa && capa.tipo === 'texto') {
        setTextoInput(capa.contenido);
        setColorTexto(capa.color);
        setModo("texto");
      } else if (capa) {
        setModo("imagen");
      }
    }
  }, [capaSeleccionada, capas]);

  // --- FUNCIONES ---
  
  // Agregar capa de imagen (galería)
  const agregarEstampa = (nombreEstampa) => {
    const nuevaCapa = {
      id: Date.now(),
      tipo: 'imagen',
      contenido: `/LaTienda/Disenos/${nombreEstampa}.png`,
      x: 50,
      y: 40,
      tamano: 100,
      rotacion: 0,
      vista: vista
    };
    setCapas([...capas, nuevaCapa]);
    setCapaSeleccionada(nuevaCapa.id);
    setIsMobileControlsMinimized(false);
  };

  // Agregar capa de imagen (subida)
  const handleImagenPersonalizada = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const nuevaCapa = {
        id: Date.now(),
        tipo: 'imagen',
        contenido: url,
        esPersonalizada: true,
        x: 50,
        y: 40,
        tamano: 100,
        rotacion: 0,
        vista: vista
      };
      setCapas([...capas, nuevaCapa]);
      setCapaSeleccionada(nuevaCapa.id);
      setIsMobileControlsMinimized(false);
    }
  };

  // Agregar capa de texto
  const agregarTexto = () => {
    const nuevaCapa = {
      id: Date.now(),
      tipo: 'texto',
      contenido: "Tu Texto",
      x: 50,
      y: 40,
      tamano: 20, // font size
      rotacion: 0,
      color: "#000000",
      fuente: "sans-serif",
      vista: vista
    };
    setCapas([...capas, nuevaCapa]);
    setCapaSeleccionada(nuevaCapa.id);
    setTextoInput("Tu Texto");
    setIsMobileControlsMinimized(false);
  };

  // Actualizar capa actual
  const actualizarCapa = (cambios) => {
    if (capaSeleccionada === null) return;
    setCapas(capas.map(c => c.id === capaSeleccionada ? { ...c, ...cambios } : c));
  };

  const eliminarCapa = (id) => {
    setCapas(capas.filter(c => c.id !== id));
    if (capaSeleccionada === id) setCapaSeleccionada(null);
  };

  const reiniciarDiseno = () => {
    setCapas([]);
    setCapaSeleccionada(null);
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
    setCapas(prevCapas => {
        const index = prevCapas.findIndex(c => c.id === capaSeleccionada);
        if (index === -1) return prevCapas;
  
        const capa = prevCapas[index];
        const step = 1; // Paso más pequeño para movimiento fluido
        let { x, y } = capa;
  
        // Invertir controles horizontales si estamos en vista de espalda
        const isBack = vista === 'espalda';
        const horizontalStep = isBack ? -step : step;

        switch(direction) {
          case 'up': y = Math.max(10, y - step); break;
          case 'down': y = Math.min(90, y + step); break;
          case 'left': x = Math.max(10, x - horizontalStep); break;
          case 'right': x = Math.min(90, x + horizontalStep); break;
        }
        
        const newCapas = [...prevCapas];
        newCapas[index] = { ...capa, x, y };
        return newCapas;
    });
  };

  const startMoving = (direction) => {
    if (movementInterval.current) return;
    move(direction); // Movimiento inicial
    movementInterval.current = setInterval(() => {
        move(direction);
    }, 50); // 50ms para movimiento fluido
  };

  const stopMoving = () => {
    if (movementInterval.current) {
        clearInterval(movementInterval.current);
        movementInterval.current = null;
    }
  };

  const getImagenBase = () => {
    if (color !== "blanco" && color !== "negro") {
        return `/LaTienda/Img-Bases/${tipo}-blanco.png`;
    }
    return `/LaTienda/Img-Bases/${tipo}-${color}.png`;
  };

  // Obtener propiedades de la capa seleccionada para los controles
  const capaActiva = capas.find(c => c.id === capaSeleccionada) || { tamano: 100, rotacion: 0 };

  // Render del Joystick (Reutilizable)
  const renderJoystick = () => {
    const btnSize = docking.mode === 'horizontal' ? 'w-8 h-8' : 'w-10 h-10';
    const iconSize = docking.mode === 'horizontal' ? 16 : 18;
    
    return (
    <div className={`grid grid-cols-3 ${docking.mode === 'horizontal' ? 'gap-1 p-1' : 'gap-2 p-2'} bg-gray-50 rounded-full shadow-inner border border-gray-200 select-none ${docking.mode === 'horizontal' ? 'scale-90' : 'scale-90 sm:scale-100'}`}>
      <div className={btnSize}></div>
      <button 
        onMouseDown={() => startMoving('up')} 
        onMouseUp={stopMoving} 
        onMouseLeave={stopMoving}
        onTouchStart={(e) => { e.preventDefault(); startMoving('up'); }}
        onTouchEnd={stopMoving}
        className={`${btnSize} bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center hover:bg-indigo-50 active:bg-indigo-100 text-gray-600 active:scale-95 transition-transform`}
      >
        <ArrowUp size={iconSize}/>
      </button>
      <div className={btnSize}></div>
      
      <button 
        onMouseDown={() => startMoving('left')} 
        onMouseUp={stopMoving} 
        onMouseLeave={stopMoving}
        onTouchStart={(e) => { e.preventDefault(); startMoving('left'); }}
        onTouchEnd={stopMoving}
        className={`${btnSize} bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center hover:bg-indigo-50 active:bg-indigo-100 text-gray-600 active:scale-95 transition-transform`}
      >
        <ArrowLeft size={iconSize}/>
      </button>
      <div className={`${btnSize} bg-gray-200 rounded-full flex items-center justify-center`}>
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
      </div>
      <button 
        onMouseDown={() => startMoving('right')} 
        onMouseUp={stopMoving} 
        onMouseLeave={stopMoving}
        onTouchStart={(e) => { e.preventDefault(); startMoving('right'); }}
        onTouchEnd={stopMoving}
        className={`${btnSize} bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center hover:bg-indigo-50 active:bg-indigo-100 text-gray-600 active:scale-95 transition-transform`}
      >
        <ArrowRight size={iconSize}/>
      </button>
      
      <div className={btnSize}></div>
      <button 
        onMouseDown={() => startMoving('down')} 
        onMouseUp={stopMoving} 
        onMouseLeave={stopMoving}
        onTouchStart={(e) => { e.preventDefault(); startMoving('down'); }}
        onTouchEnd={stopMoving}
        className={`${btnSize} bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center hover:bg-indigo-50 active:bg-indigo-100 text-gray-600 active:scale-95 transition-transform`}
      >
        <ArrowDown size={iconSize}/>
      </button>
      <div className={btnSize}></div>
    </div>
  )};

  // Render de Sliders (Reutilizable)
  const renderSliders = () => (
    <div className="bg-gray-50 p-3 rounded-lg space-y-3 w-full">
      <div className="flex items-center space-x-2">
         <ZoomOut size={16} className="text-gray-400 flex-shrink-0"/>
         <input 
           type="range" 
           min={capaActiva.tipo === 'texto' ? "10" : "50"} 
           max={capaActiva.tipo === 'texto' ? "100" : "300"} 
           value={capaActiva.tamano} 
           onChange={(e) => actualizarCapa({ tamano: Number(e.target.value) })} 
           className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-indigo-600 min-w-[100px]"
         />
         <ZoomIn size={16} className="text-gray-400 flex-shrink-0"/>
      </div>
      <div className="flex items-center space-x-2">
         <RotateCw size={16} className="text-gray-400 flex-shrink-0"/>
         <input 
           type="range" 
           min="0" 
           max="360" 
           value={capaActiva.rotacion} 
           onChange={(e) => actualizarCapa({ rotacion: Number(e.target.value) })} 
           className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-indigo-600 min-w-[100px]"
         />
         <span className="text-xs text-gray-500 w-8 text-right flex-shrink-0">{capaActiva.rotacion}°</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-10"> {/* Padding extra en móvil para controles */}
      <div className="bg-white shadow-sm border-b mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Personalizador</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* COLUMNA 1: CONFIGURACIÓN DE PRENDA (3 columnas) */}
        <div className="md:col-span-3 space-y-4 order-3 md:order-1">
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
          
          {/* LISTA DE CAPAS */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center text-gray-700">
                  <Layers className="mr-2" size={20}/> Capas
                </h2>
                <span className="text-xs text-gray-500">{capas.length} elementos</span>
             </div>
             
             {capas.length === 0 ? (
               <p className="text-sm text-gray-400 italic text-center py-4">No hay diseños agregados</p>
             ) : (
               <div className="space-y-2 max-h-40 overflow-y-auto">
                 {capas.map((c, i) => (
                   <div 
                     key={c.id}
                     onClick={() => { setCapaSeleccionada(c.id); setIsMobileControlsMinimized(false); }}
                     className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${capaSeleccionada === c.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100 hover:bg-gray-50'}`}
                   >
                     <div className="flex items-center truncate">
                       {c.tipo === 'imagen' ? <ImageIcon size={14} className="mr-2 text-gray-500"/> : <Type size={14} className="mr-2 text-gray-500"/>}
                       <span className="text-sm font-medium text-gray-700 truncate w-32">
                         {c.tipo === 'texto' ? c.contenido : `Estampado ${i + 1}`}
                       </span>
                     </div>
                     <button 
                       onClick={(e) => { e.stopPropagation(); eliminarCapa(c.id); }}
                       className="text-red-400 hover:text-red-600 p-1"
                     >
                       <Trash2 size={14}/>
                     </button>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>

        {/* COLUMNA 2: VISUALIZADOR (6 columnas) */}
        <div className="md:col-span-6 flex flex-col items-center order-1 md:order-2">
          
          {/* Selector de Vista 3D */}
          <div className="flex space-x-2 mb-4 overflow-x-auto w-full pb-2 px-1 justify-center no-scrollbar">
             <button 
               onClick={() => setVista('frente')}
               className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${vista === 'frente' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
             >
               Adelante
             </button>
             <button 
               onClick={() => setVista('espalda')}
               className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${vista === 'espalda' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
             >
               Espalda
             </button>
             <button 
               onClick={() => setVista('manga_der')}
               className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${vista === 'manga_der' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
             >
               Manga Derecha
             </button>
             <button 
               onClick={() => setVista('manga_izq')}
               className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${vista === 'manga_izq' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
             >
               Manga Izquierda
             </button>
          </div>

          <div className="relative w-full aspect-[4/5] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex items-center justify-center perspective-1000">
             {/* Contenedor 3D Rotable */}
             <motion.div
                className="relative w-full h-full flex items-center justify-center"
                animate={{ 
                  rotateY: vista === 'espalda' ? 180 : 
                           vista === 'manga_der' ? -25 :
                           vista === 'manga_izq' ? 25 : 0,
                  scale: (vista === 'manga_der' || vista === 'manga_izq') ? 1.5 : 1
                }}
                transition={{ duration: 0.6, type: "spring" }}
                style={{ transformStyle: "preserve-3d" }}
             >
                 {/* Prenda Base */}
                 <img
                    src={getImagenBase()}
                    alt="Prenda"
                    className="w-full h-full object-contain z-10 p-8 pointer-events-none select-none"
                    style={{
                      filter: (color !== "blanco" && color !== "negro") ? `sepia(1) hue-rotate(${color === 'azul' ? '180deg' : '-50deg'}) saturate(3)` : 'none',
                      transform: vista === 'espalda' ? 'scaleX(-1)' : 'none' // Espejo para espalda
                    }}
                 />

                 {/* Capas de Diseño */}
                 <div className="absolute inset-0 z-20 overflow-hidden" style={{ transform: `translateZ(${vista === 'espalda' ? -1 : 1}px)` }}>
                    {capas.filter(c => c.vista === vista).map((capa) => (
                      <div key={capa.id} className="absolute inset-0">
                        {capa.tipo === 'imagen' ? (
                          <motion.img
                            src={capa.contenido}
                            className="absolute"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{
                              top: `${capa.y}%`,
                              left: `${capa.x}%`,
                              width: `${capa.tamano}px`,
                              transform: `translate(-50%, -50%) rotate(${capa.rotacion}deg) ${vista === 'espalda' ? 'rotateY(180deg)' : ''}`, // Corregir espejo en espalda
                              cursor: 'pointer',
                              pointerEvents: 'auto'
                            }}
                            onClick={(e) => { e.stopPropagation(); setCapaSeleccionada(capa.id); setIsMobileControlsMinimized(false); }}
                          />
                        ) : (
                          <motion.div
                            className="absolute text-center font-bold whitespace-nowrap"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{
                              top: `${capa.y}%`,
                              left: `${capa.x}%`,
                              fontSize: `${capa.tamano}px`,
                              color: capa.color,
                              fontFamily: capa.fuente,
                              transform: `translate(-50%, -50%) rotate(${capa.rotacion}deg) ${vista === 'espalda' ? 'rotateY(180deg)' : ''}`, // Corregir espejo en espalda
                              cursor: 'pointer',
                              pointerEvents: 'auto'
                            }}
                            onClick={(e) => { e.stopPropagation(); setCapaSeleccionada(capa.id); setIsMobileControlsMinimized(false); }}
                          >
                            {capa.contenido}
                          </motion.div>
                        )}
                      </div>
                    ))}
                 </div>
             </motion.div>
          </div>
          
          <p className="mt-4 text-sm text-gray-500">
            Vista actual: <span className="font-bold uppercase text-indigo-600">{vista}</span>
          </p>
        </div>

        {/* COLUMNA 3: CONTROLES DE DISEÑO (3 columnas) */}
        <div className="md:col-span-3 space-y-4 order-2 md:order-3">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            
            {/* Selector de Herramienta (Agregar) */}
            <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
              <button 
                onClick={() => setModo("imagen")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${modo === 'imagen' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
              >
                <ImageIcon size={16} className="inline mr-1"/> Imágenes
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
                <p className="text-xs font-semibold text-gray-500 uppercase">Agregar Estampado</p>
                <div className="grid grid-cols-4 gap-2">
                   {estampas.map((est, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => agregarEstampa(est.nombre)}
                        className="aspect-square rounded-lg border border-gray-200 hover:border-indigo-500 cursor-pointer overflow-hidden transition-colors"
                        title={est.label}
                      >
                        <img src={`/LaTienda/Disenos/${est.nombre}.png`} className="w-full h-full object-cover"/>
                      </div>
                   ))}
                </div>
                {/* Upload */}
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:bg-gray-50 transition cursor-pointer group">
                  <input type="file" onChange={handleImagenPersonalizada} className="absolute inset-0 opacity-0 cursor-pointer"/>
                  <Upload size={20} className="mx-auto text-gray-400 group-hover:text-indigo-500 mb-1"/>
                  <span className="text-xs text-gray-500 font-medium">Subir imagen propia</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase">Editar Texto</p>
                {capaSeleccionada && capaActiva.tipo === 'texto' ? (
                   <>
                    <input 
                      type="text" 
                      value={textoInput} 
                      onChange={(e) => {
                        setTextoInput(e.target.value);
                        actualizarCapa({ contenido: e.target.value });
                      }}
                      placeholder="Escribe aquí..." 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Color:</span>
                      <input 
                        type="color" 
                        value={colorTexto} 
                        onChange={(e) => {
                          setColorTexto(e.target.value);
                          actualizarCapa({ color: e.target.value });
                        }}
                        className="flex-1 h-8 rounded cursor-pointer"
                      />
                    </div>
                   </>
                ) : (
                   <button 
                     onClick={agregarTexto}
                     className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium flex items-center justify-center"
                   >
                     <Plus size={16} className="mr-1"/> Agregar Texto Nuevo
                   </button>
                )}
              </div>
            )}

            <hr className="my-4 border-gray-100 hidden md:block"/>

            {/* JOYSTICK Y TAMAÑO (Desktop: visible, Mobile: hidden) */}
            <div className={`hidden md:block ${!capaSeleccionada ? "opacity-50 pointer-events-none filter grayscale" : ""}`}>
              <div className="flex justify-between items-center mb-3">
                 <label className="block text-sm font-medium text-gray-600">Ajustes de Capa</label>
                 {!capaSeleccionada && <span className="text-xs text-red-400">Selecciona un diseño</span>}
              </div>
              
              <div className="flex justify-center mb-4">
                {renderJoystick()}
              </div>

              {renderSliders()}
              
              {capaSeleccionada && (
                <button 
                    onClick={() => eliminarCapa(capaSeleccionada)}
                    className="w-full mt-4 py-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
                >
                    <Trash2 size={16} className="mr-2"/> Eliminar Capa
                </button>
              )}
            </div>
          </div>
          
          {/* PANEL DE GUARDADO Y PRECIO */}
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

      {/* CONTROLES FLOTANTES MÓVIL (Draggable y Collapsible) */}
      {capaSeleccionada && (
        <motion.div
            key={resetKey}
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            initial={docking.anchor === 'custom' ? { x: position.x, y: position.y } : { x: 0, y: 0 }}
            style={docking.anchor === 'custom' ? { left: 0, top: 0, bottom: 'auto', right: 'auto' } : {}}
            className={`fixed md:hidden z-50 flex ${
                docking.anchor === 'top' ? 'top-4 left-4 right-4 flex-col items-center' :
                docking.anchor === 'bottom' ? 'bottom-4 left-4 right-4 flex-col items-center' :
                docking.anchor === 'custom' ? 'flex-col items-end' : // Custom position controlled by initial/style
                'bottom-20 right-4 flex-col items-end'
            }`}
        >
            {/* Header del panel flotante - DRAG HANDLE */}
            <div 
                onPointerDown={(e) => dragControls.start(e)}
                className="bg-white border border-gray-200 rounded-full shadow-md p-1 mb-2 flex items-center space-x-1 cursor-grab active:cursor-grabbing touch-none select-none"
            >
                {/* Drag Handle Icon */}
                <div className="px-2 py-1 text-gray-400 hover:text-gray-600 border-r border-gray-100 mr-1 flex items-center">
                    <GripHorizontal size={16} />
                </div>

                <button 
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={handleReset} 
                    className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-50" 
                    title="Restablecer posición"
                >
                    <LayoutTemplate size={14} />
                </button>
                <button 
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.stopPropagation(); setIsMobileControlsMinimized(!isMobileControlsMinimized); }}
                    className="p-1.5 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                >
                    {isMobileControlsMinimized ? <Maximize2 size={14}/> : <Minimize2 size={14}/>}
                </button>
                <button 
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.stopPropagation(); setCapaSeleccionada(null); }}
                    className="p-1.5 bg-red-50 rounded-full text-red-500 hover:bg-red-100"
                >
                    <X size={14}/>
                </button>
            </div>

            {/* Contenido del panel */}
            {!isMobileControlsMinimized ? (
                <div className={`bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-2xl border border-gray-200 animate-in slide-in-from-bottom-5 fade-in duration-300 ${
                    docking.mode === 'horizontal' ? 'w-[90vw] max-w-md flex flex-row items-center gap-3' : 'w-64 flex flex-col'
                }`}>
                    {docking.mode === 'horizontal' ? (
                        <>
                            {/* Lado Izquierdo: Sliders + Eliminar */}
                            <div className="flex-1 flex flex-col gap-2 min-w-0">
                                {renderSliders()}
                                <button 
                                    onClick={() => eliminarCapa(capaSeleccionada)}
                                    className="p-2 rounded-lg bg-red-50 text-red-600 text-xs font-bold flex items-center justify-center hover:bg-red-100 active:bg-red-200"
                                >
                                    <Trash2 size={14} className="mr-1"/> Eliminar
                                </button>
                            </div>
                            
                            {/* Lado Derecho: Joystick */}
                            <div className="flex-shrink-0">
                                {renderJoystick()}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center mb-4">
                                {renderJoystick()}
                            </div>
                            {renderSliders()}
                            <button 
                                onClick={() => eliminarCapa(capaSeleccionada)}
                                className="w-full mt-3 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-bold flex items-center justify-center hover:bg-red-100 active:bg-red-200"
                            >
                                <Trash2 size={14} className="mr-1"/> Eliminar Capa
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <div className="bg-white p-2 rounded-full shadow-lg border border-gray-200">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs">
                        {capas.find(c => c.id === capaSeleccionada)?.tipo === 'imagen' ? <ImageIcon size={16}/> : <Type size={16}/>}
                    </div>
                </div>
            )}
        </motion.div>
      )}

    </div>
  );
}

export default Personalizar;