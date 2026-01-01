import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, Truck, ShieldCheck, ArrowRight, Palette } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden bg-gradient-to-br from-gray-50 to-primary-50">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text Content */}
            <motion.div
              className="flex-1 text-center md:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="inline-block px-4 py-2 bg-white rounded-full shadow-sm text-primary-600 font-semibold mb-6 border border-primary-100">
                ✨ Nueva Colección 2024
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold font-heading leading-tight text-gray-900 mb-6">
                Viste con <span className="text-primary-600">Estilo</span>, <br />
                Crea tu <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Propia Marca</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                Personaliza tus prendas favoritas con diseños exclusivos. Calidad premium y envíos a todo el país. ¡Haz que tu ropa hable por ti!
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => navigate("/personalizar")}
                  className="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Palette className="w-5 h-5" />
                  Empezar a Diseñar
                </button>
                <button
                  onClick={() => navigate("/productos")}
                  className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all hover:border-gray-300 flex items-center justify-center gap-2"
                >
                  Ver Catálogo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              className="flex-1 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-secondary-500 rounded-full opacity-10 blur-2xl transform rotate-6"></div>
                <img
                  src="/Img-Bases/buso-capotero-negro.png"
                  alt="Prenda destacada"
                  className="relative z-10 w-full drop-shadow-2xl transform hover:rotate-2 transition-transform duration-500"
                />
                
                {/* Floating Cards */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
                >
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Calidad</p>
                    <p className="text-sm font-bold text-gray-800">100% Garantizada</p>
                  </div>
                </motion.div>

                 <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                  className="absolute top-10 -right-5 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
                >
                  <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Diseños</p>
                    <p className="text-sm font-bold text-gray-800">Exclusivos</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4 text-gray-900">¿Por qué elegirnos?</h2>
            <p className="text-gray-600">Nos dedicamos a ofrecerte la mejor experiencia de compra y personalización.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Palette className="w-8 h-8 text-primary-600" />,
                title: "Personalización Total",
                desc: "Sube tus propios diseños o elige de nuestra galería exclusiva.",
              },
              {
                icon: <Truck className="w-8 h-8 text-secondary-500" />,
                title: "Envíos Rápidos",
                desc: "Recibe tus prendas en tiempo récord en cualquier parte del país.",
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
                title: "Calidad Premium",
                desc: "Telas de alta durabilidad y estampados que no se desvanecen.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-gray-50 hover:bg-white border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6 p-4 bg-white rounded-xl shadow-sm inline-block">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/disenos/Vegeta.png')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">¿Listo para crear algo único?</h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos que ya visten con su propio estilo.
          </p>
          <button
            onClick={() => navigate("/personalizar")}
            className="px-10 py-4 bg-white text-primary-900 rounded-full font-bold text-lg hover:bg-primary-50 transition-all shadow-2xl hover:scale-105"
          >
            Comenzar Ahora
          </button>
        </div>
      </section>
    </div>
  );
}
