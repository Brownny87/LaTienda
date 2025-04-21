import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Personalizar from "./pages/Personalizar";
import Productos from "./pages/Productos";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personalizar" element={<Personalizar />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
         {/* Aquí va el botón flotante de WhatsApp */}
      <a 
        href="https://wa.me/573105128801?text=Hola%20Brownny%20Store%2C%20quiero%20más%20información%20sobre%20las%20prendas%20personalizadas"
        className="fixed bottom-24 right-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 z-50"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.48A11.77 11.77 0 0012 0C5.37 0 .02 5.25.02 11.73c0 2.06.54 4.07 1.58 5.83L0 24l6.65-1.75a12 12 0 005.35 1.34c6.63 0 12-5.25 12-11.73 0-3.13-1.23-6.08-3.48-8.38zM12 21.64a9.68 9.68 0 01-4.9-1.3l-.35-.21-3.95 1.04 1.06-3.84-.23-.39a9.54 9.54 0 01-1.4-5.18C2.23 6.54 6.67 2.18 12 2.18c2.59 0 5.02 1 6.85 2.81a9.53 9.53 0 012.83 6.74c0 5.36-4.44 9.72-9.68 9.72z" />
          <path d="M17.28 14.22c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17-.35.22-.65.07a7.93 7.93 0 01-2.32-1.44 8.65 8.65 0 01-1.6-2.03c-.17-.3 0-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.66-1.6-.9-2.2-.24-.6-.49-.52-.67-.53H6.6c-.18 0-.47.07-.72.35-.25.27-.96.94-.96 2.3s.99 2.67 1.13 2.85c.15.18 1.94 2.97 4.72 4.16 2.77 1.18 2.77.79 3.27.74.5-.06 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
        </svg>
      </a>
        <Footer />
      </div>
    </Router>
  );
}
