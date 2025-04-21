export default function Footer() {
    return (
      <footer className="bg-gray-100 text-center p-4 mt-8">
        <p>Síguenos en:</p>
  <div className="flex justify-center space-x-4 mt-2">
    <a href="https://www.instagram.com/brownnystore" target="_blank" rel="noopener noreferrer">
      <img src="/icons/instagram.svg" alt="Instagram" className="h-6 w-6" />
    </a>
    <a href="https://www.facebook.com/brownnystore" target="_blank" rel="noopener noreferrer">
      <img src="/icons/facebook.svg" alt="Facebook" className="h-6 w-6" />
    </a>
    <a href="https://www.tiktok.com/@brownnystore" target="_blank" rel="noopener noreferrer">
      <img src="/icons/tiktok.svg" alt="TikTok" className="h-6 w-6" />
    </a>
  </div>

  <div style={{ height: "30px" }}></div>

  <p className="text-sm text-gray-500">© 2025 JB Store. Todos los derechos reservados.</p>
      </footer>
    );
  }
  