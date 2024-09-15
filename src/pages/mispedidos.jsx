import { useState, useEffect } from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import "../assets/css/Materiales.css";
import Cookies from "universal-cookie";

function Mispedidos() {
  const [peticiones, setPeticiones] = useState([]);
  const cookies = new Cookies();
  const usuarioId = cookies.get('id');  // Obtener el ID del usuario desde las cookies

  useEffect(() => {
    const fetchPeticiones = async () => {
      try {
        const response = await fetch('http://localhost:3001/peticiones');
        const data = await response.json();

        console.log("Datos de peticiones:", data);  // Depurar datos

        // Filtrar las peticiones con estado "Pendiente" y que pertenezcan al usuario actual
        const peticionesPendientes = data.filter(peticion => 
          peticion.estado === "Pendiente" && peticion.usuario_id === usuarioId
        );

        console.log("Peticiones filtradas:", peticionesPendientes);  // Depurar peticiones filtradas

        setPeticiones(peticionesPendientes);
      } catch (error) {
        console.error("Error al obtener las peticiones:", error);
      }
    };

    fetchPeticiones();
  }, [usuarioId]);

  return (
    <>
      <div className="mx-auto  max-w-2xl lg:text-center">
        <p className="mt-4 text-3xl font-bold tracking-tight text-green-800 sm:text-4xl">
          Mis Solicitudes
        </p>
      </div>
      <div className="gap-5 grid grid-cols-2 sm:grid-cols-5 container-materiales">
        {peticiones.length > 0 ? (
          peticiones.map((item) => (
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
                  <span className="nombre-material"></span> {item.nombre_usuario}
                </b>
                <NavLink to={`/pedidos/${item.id}`}>
                  <Button variant="shadow" className="button-ver">
                    Ver Solicitud
                  </Button>
                </NavLink>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No hay solicitudes pendientes.</p>
        )}
      </div>
    </>
  );
}

export default Mispedidos;
