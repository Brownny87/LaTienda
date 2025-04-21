export default function Header() {
    return (
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">
  <a href="/" className="hover:underline">JB Store</a>
</h1>
          <nav className="space-x-4">
            <a href="/" className="hover:underline">Inicio</a>
            <a href="/personalizar" className="hover:underline">Personalizar</a>
            <a href="/productos" className="hover:underline">Productos</a>
            <a href="/checkout" className="hover:underline">Checkout</a>
          </nav>
        </div>
      </header>
    );
  }
  