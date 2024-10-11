import { useState, useEffect } from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import "../assets/css/Materiales.css";

function Devolver() {
  const [peticiones, setPeticiones] = useState([]);

  useEffect(() => {
    const fetchPeticiones = async () => {
      try {
        const responsePedido = await fetch('http://localhost:3001/peticiones');
        const dataPedido = await responsePedido.json();

        // Filtrar las peticiones con estado "Aceptado"
        const peticionesPendientes = dataPedido.filter(peticion => peticion.estado === "Aceptado");

        // Ordenar las peticiones por fecha de devolución, de la más cercana a la más lejana
        peticionesPendientes.sort((a, b) => {
          const dateA = new Date(a.devolucion_aproximada.year, a.devolucion_aproximada.month - 1, a.devolucion_aproximada.day);
          const dateB = new Date(b.devolucion_aproximada.year, b.devolucion_aproximada.month - 1, b.devolucion_aproximada.day);
          return dateA - dateB; // Orden ascendente
        });

        setPeticiones(peticionesPendientes);
      } catch (error) {
        console.error("Error al obtener las peticiones:", error);
      }
    };

    fetchPeticiones();
  }, []);

  const formatDate = (dateObject) => {
    if (!dateObject || !dateObject.year || !dateObject.month || !dateObject.day) {
      return "No especificada";
    }
    const { year, month, day } = dateObject;
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? "Fecha inválida" : date.toLocaleDateString();
  };

  return (
    <>
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="mt-4 text-3xl font-bold tracking-tight text-green-700 sm:text-4xl">
          Devolver materiales
        </p>
      </div>
      <div className="gap-5 grid grid-cols-2 sm:grid-cols-5 container-materiales">
        {peticiones.map((item) => (
          <Card
            shadow="lg"
            key={item.id}
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                isZoomed
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.nombre_usuario}
                className="w-full object-cover h-[240px]"
                src={item.material_img}  // Usar la imagen del material
              />
            </CardBody>
            <CardFooter className="text-lg justify-between">
              <b className="uppercase">
                <span className="nombre-material ">Fecha devolucion:</span> {formatDate(item.devolucion_aproximada)}
              </b>
              <NavLink to={`/Devolver/${item.id}`}>
                <Button variant="shadow" className="button-ver">
                  Devolver
                </Button>
              </NavLink>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Devolver;
