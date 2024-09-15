
import "../assets/css/Inicio.css";

const stats = [
  {
    name: "Instrumento, por lo común de hierro o acero.",
    value: "Herramientas",
  },
  {
    name: "Dispositivos que forman los circuitos y hacen los aparatos electrónicos.",
    value: "Equipos",
  },
  {
    name: "Abastecimiento para satisfacer las necesidades de consumo.",
    value: "Materiales de formacion",
  },
];

const links = [
  { name: "Iniciar sesión", href: "/login" },
];

const posts = [
  {
    id: 1,
    title: "SERVICIO NACIONAL DE APRENDIZAJE SENA",
    href: "#",
    description:
      "Centro de Gestión de Mercados, Logística y Tenologías de la Información - Regional Distrito Capital Dirección: Cl 52 N° 13 65 -Telefono: +(57) 601 594 1301 Conmutador Nacional (601) 5461500 - Extensiones El SENA brinda a la ciudadanía, atención presencial en las 33 Regionales y 117 Centros de Formación.",
    datetime: "2020-03-16",
    category: { title: "Análisis y Desarrollo de Software", href: "#" },
    author: {
      name: "Conozca aquí los puntos de atención",
      role: "Atención al ciudadano: Bogotá (601) 3430111 - Línea gratuita y resto del país 018000 910270. Atención al empresario: Bogotá (601) 3430101 - Línea gratuita y resto del país 018000 910682.",
      href: "#",
      imageUrl: "../../src/assets/img/logo.png",
    },
  },
];

export default function Inicio() {
  return (
    <>
      <div className="relative overflow-hidden py-24">
        <img
          alt=""
          src="" 
          className="IMG absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight text-green-700 sm:text-6xl">
                Acopio
              </h2>
              <p className="mt-6 text-lg leading-8 text-black">
                En el SENA Centro de Gestión de Mercados, Logística y Tecnologías
                de la Información, se encuentra el centro de Acopio. Un espacio de
                gestión de materiales{" "}
                <span className="font-bold">
                  (herramientas, equipos y materiales de formacion)
                </span>{" "}
                utilizados por los instructores de esta sede.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <img
                alt="Imagen del centro de Acopio"
                src="../src/assets/img/Sena.jpg" 
                className="styled-image"
              />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-green-700 sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <a key={link.name} href={link.href} className="text-green-700 hover:underline">
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </a>
              ))}
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse">
                  <dt className="text-base leading-7 text-gray-700">
                    {stat.name}
                  </dt>
                  <dd className="text-2xl font-bold leading-9 tracking-tight text-green-700">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32 w-full">
        <div className="w-full">
          <div className="relative bg-white p-4 rounded-lg max-w-[1200px] mx-auto">
            <div className="flex items-center gap-x-4 text-xs text-gray-500">
              <time dateTime={posts[0].datetime}>{posts[0].date}</time>
              <a
                href={posts[0].category.href}
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              >
                {posts[0].category.title}
              </a>
            </div>
          </div>

          <div className="relative bg-[#4caf50] p-4 rounded-lg mt-4 max-w-[1200px] mx-auto">
            <h2 className="text-base font-bold tracking-tight text-white sm:text-lg">
              {posts[0].title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-200">
              {posts[0].description}
            </p>
            <div className="relative mt-8 flex items-center gap-x-4">
              <img
                alt=""
                src={posts[0].author.imageUrl}
                className="h-10 w-10 rounded-full bg-gray-50"
              />
              <div className="text-sm leading-6">
                <p className="font-semibold text-white">
                  <a href={posts[0].author.href}>{posts[0].author.name}</a>
                </p>
                <p className="text-gray-200">{posts[0].author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
