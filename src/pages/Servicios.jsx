import {
  RectangleStackIcon,
  ClipboardDocumentCheckIcon,
  InboxArrowDownIcon,
  DocumentCurrencyPoundIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Gestión de Inventario",
    description:
      "El sistema de información permite al administrador gestionar el inventario de manera centralizada y eficiente.",
    icon: RectangleStackIcon,
  },
  {
    name: "Solicitud y Préstamo de Materiales",
    description:
      "Los instructores pueden consultar la disponibilidad de materiales y realizar solicitudes directamente a través del sistema.",
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: "Registro y Gestión de Instructores ",
    description:
      "El sistema permite el registro de nuevos instructores y la gestión de sus perfiles.",
    icon: InboxArrowDownIcon,
  },
  {
    name: "Generación de Reportes",
    description:
      "El sistema proporciona herramientas para generar reportes detallados sobre el estado del inventario, el historial de solicitudes y préstamos, y el uso de materiales.",
    icon: DocumentCurrencyPoundIcon,
  },
];


const Servicios = () => {
  return (
    <div className=" py-24 sm:py-32 relative ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto  max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-700">
            Acopio
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-green-700 sm:text-4xl">
            Nuestros Servicios
          </p>
          <p className="mt-6 text-lg leading-8 text-black">
            El centro de Acopio del SENA es un espacio dedicado a la gestión de
            materiales, herramientas, componentes electrónicos y suministros
            utilizados por los instructores. Este sistema de
            información permite ofrecer una variedad de servicios
            diseñados para mejorar la eficiencia y efectividad de la gestión de
            inventarios.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-green-700">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <feature.icon
                      aria-hidden="true"
                      className="h-6 w-6 text-withe"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-black">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
