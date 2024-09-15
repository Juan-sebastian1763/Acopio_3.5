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
    <div className="flex flex-col lg:flex-row gap-8 p-6">
      {/* Card para la imagen del material */}
      <Card className="w-full lg:w-1/2 max-w-md mx-auto shadow-lg rounded-lg">
        <CardHeader className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            {material.nombre}
          </h1>
        </CardHeader>
        <CardBody className="p-4 flex justify-center">
          <Image
            isZoomed
            alt="Imagen del material"
            className="object-cover rounded-xl"
            src={material.img}
            width={450}
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

      {/* Card para los detalles del material */}
      <Card className="w-full lg:w-1/2 max-w-md mx-auto shadow-lg rounded-lg">
        <CardHeader className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Acerca de este Material:
          </h2>
        </CardHeader>
        <CardBody className="p-4">
          <p className="text-lg mb-2">
            <span className="font-semibold">Descripción:</span>{" "}
            {material.descripcion}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Cantidad Disponible:</span>{" "}
            {material.cantidad_disponible}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Estado:</span>{" "}
            <span className="font-medium">{material.estado}</span>
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Tipo de material:</span>{" "}
            {material.tipo}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Color:</span> {material.color}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

export default MaterialesDetails;
