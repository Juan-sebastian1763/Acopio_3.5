import { useState, useEffect } from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import "../assets/css/Materiales.css";

function Materiales() {
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    // Llama a la API para obtener los materiales desde db.json
    fetch("/src/api/db.json")
      .then((response) => response.json())
      .then((data) => setMateriales(data.materiales))
      .catch((error) => console.error("Error al cargar materiales:", error));
  }, []);

  return (
    <>
            <div className="mx-auto  max-w-2xl lg:text-center">
              <p className="mt-4 text-3xl font-bold tracking-tight text-green-800 sm:text-4xl">
            Solicitar Material
          </p>
          </div>
      <div className="mt-4 gap-5 grid grid-cols-2 sm:grid-cols-5 container-materiales">
        {materiales.map((item) => (
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
                alt={item.nombre}
                className="w-full object-cover h-[240px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-lg justify-between">
              <b className="uppercase">
                <span className="nombre-material"></span> {item.nombre}
              </b>
              <NavLink to={`/materiales/${item.id}`}>
                <Button variant="shadow" className="button-ver">
                  Ver Material
                </Button>
              </NavLink>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Materiales;
