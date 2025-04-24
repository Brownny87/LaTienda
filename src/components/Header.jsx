import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/" className="hover:underline">
            JB Store
          </Link>
        </h1>

        {/* Menú de navegación en pantallas grandes */}
        <nav className="space-x-4 hidden md:flex">
          <Link to="/" className="hover:underline" aria-label="Ir al inicio">
            Inicio
          </Link>
          <Link
            to="/personalizar"
            className="hover:underline"
            aria-label="Ir a la página de personalización"
          >
            Personalizar
          </Link>
          <Link
            to="/productos"
            className="hover:underline"
            aria-label="Ver productos"
          >
            Productos
          </Link>
          <Link
            to="/checkout"
            className="hover:underline"
            aria-label="Ir a la página de checkout"
          >
            Checkout
          </Link>

          {/* Enlaces de Login y Register */}
          <Link
            to="/login"
            className="hover:underline"
            aria-label="Iniciar sesión"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
            aria-label="Registrarse"
          >
            Registrarse
          </Link>
        </nav>

        {/* Botón de menú hamburguesa para dispositivos móviles */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Abrir menú de navegación"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Menú de navegación en pantallas pequeñas */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white">
          <Link
            to="/"
            className="block p-2 text-white hover:bg-gray-700"
            aria-label="Ir al inicio"
          >
            Inicio
          </Link>
          <Link
            to="/personalizar"
            className="block p-2 text-white hover:bg-gray-700"
            aria-label="Ir a la página de personalización"
          >
            Personalizar
          </Link>
          <Link
            to="/productos"
            className="block p-2 text-white hover:bg-gray-700"
            aria-label="Ver productos"
          >
            Productos
          </Link>
          <Link
            to="/checkout"
            className="block p-2 text-white hover:bg-gray-700"
            aria-label="Ir a la página de checkout"
          >
            {/* Enlaces de Login y Register en el menú móvil */}
            <Link
              to="/login"
              className="block p-2 text-white hover:bg-gray-700"
              aria-label="Iniciar sesión"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="block p-2 bg-purple-600 text-white hover:bg-purple-700"
              aria-label="Registrarse"
            >
              Registrarse
            </Link>
            Checkout
          </Link>
        </div>
      )}
    </header>
  );
}
