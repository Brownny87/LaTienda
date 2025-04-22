export default function Productos() {
  const items = [
    {
      title: "Colección Verano",
      img: "/LaTienda/Data-img/Productos/11.png",
      link: "/colecciones/verano",
    },
    {
      title: "Edición Limitada",
      img: "/LaTienda/Data-img/Productos/12.png",
      link: "/colecciones/limitada",
    },
    {
      title: "Lo más vendido",
      img: "/LaTienda/Data-img/Productos/13.png",
      link: "/colecciones/popular",
    },
    {
      title: "Diseña el tuyo",
      img: "/LaTienda/Data-img/Productos/14.png",
      link: "/personalizar",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Productos disponibles
      </h1>
      <p className="text-center mb-10">
        Explora las categorías que tenemos para ti:
      </p>

      <div className="grid grid-cols-2 gap-6">
        {items.map((item, index) => (
          <a href={item.link} key={index}>
            <div className="cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="bg-white p-4 text-center font-semibold">
                {item.title}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
