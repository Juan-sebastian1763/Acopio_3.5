import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  CardFooter,
} from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import "../../assets/css/materiales/materialesDetails.css"

function MaterialesDetails() {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    // Llama a la API para obtener los materiales desde src/api/db.json
    fetch("/src/api/db.json")
      .then((response) => response.json())
      .then((data) => {
        const materialEncontrado = data.materiales.find(
          (material) => String(material.id) === String(id)
        );
        setMaterial(materialEncontrado);
      })
      .catch((error) => console.error("Error al cargar el material:", error));
  }, [id]);

  if (!material) {
    return (
      <div className="flex justify-center items-center h-screen">
        Material no encontrado (ID: {id})
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-6 max-w-4xl">
        {/* Contenedor para la imagen del material */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Card className="w-full max-w-lg shadow-lg rounded-lg">
            <CardHeader className="p-4 text-center">
              <h1 className="text-2xl font-bold text-gray-800 p-4 titles uppercase">
                {material.nombre}
              </h1>
            </CardHeader>
            <CardBody className="p-4 flex justify-center">
              <Image
                isZoomed
                alt="Imagen del material"
                className="object-cover rounded-xl"
                src={material.img}
                width={380}
                height={380}
              />
            </CardBody>
            <CardFooter className="p-4 flex justify-center">
              <Link to={`/materiales/${id}/adquirir`}>
                <Button
                  variant="shadow"
                  color="success"
                  className="text-white"
                  size="lg"
                >
                  Adquirir
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Contenedor para los detalles del material */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Card className="w-full max-w-lg shadow-lg rounded-lg">
            <CardHeader className="p-4">
              <h2 className="text-xl font-bold text-gray-800 p-4 titles">
                ACERCA DE ESTE MATERIAL:
              </h2>
            </CardHeader>
            <CardBody className="p-4">
              <p className="text-lg mb-2 p-4">
                <span className="font-semibold label-description">
                  Identificador:
                </span>{" "}
                {material.id}
              </p>
              <p className="text-lg mb-2 p-4">
                <span className="font-semibold label-description">
                  Descripción:
                </span>{" "}
                {material.descripcion}
              </p>
              <p className="text-lg mb-2 p-4">
                <span className="font-semibold label-description">
                  Cantidad Disponible:
                </span>{" "}
                {material.cantidad_disponible}
              </p>
              <p className="text-lg mb-2 p-4">
                <span className="font-semibold label-description">Estado:</span>{" "}
                <span className="font-medium">{material.estado}</span>
              </p>
              <p className="text-lg mb-2 p-4">
                <span className="font-semibold label-description">
                  Tipo de material:
                </span>{" "}
                {material.tipo}
              </p>
              <p className="text-lg mb-2 p-4">
                <span className="font-semibold label-description">Color:</span>{" "}
                {material.color}
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MaterialesDetails;