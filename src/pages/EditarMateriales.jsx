import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";

import "../assets/css/materiales/editarMateriales.css";

function EditarMateriales() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [formData, setFormData] = useState({
    identificador: "",
    descripción: "",
    estado: "",
    cantidad: "",
    situación: "",
    deliveryDate: null,
    returnDate: null
  });
  const [showAlert, setShowAlert] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const cantidadSolicitada = parseInt(formData.cantidad);
    const cantidadDisponible = parseInt(material.cantidad_disponible);
  
    // Validar que la cantidad solicitada no exceda la cantidad disponible
    if (cantidadSolicitada > cantidadDisponible) {
      alert("La cantidad solicitada excede la cantidad disponible.");
      return;
    }
  
    const requestData = {
      identificador: formData.identificador,
      descripción: formData.descripción,
      estado: formData.estado,
      cantidad: formData.cantidad,
      situación: formData.situación,
      material_id: id,
      material_img: material.img, 
    };
  
    try {
      // Realizar la solicitud de material
      const response = await fetch('http://localhost:3001/peticiones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        // Actualizar la cantidad disponible en el material
        const nuevaCantidadDisponible = cantidadDisponible - cantidadSolicitada;
        const updateMaterialResponse = await fetch(`http://localhost:3001/materiales/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...material,
            cantidad_disponible: nuevaCantidadDisponible
          }),
        });

        if (updateMaterialResponse.ok) {
          setShowAlert(true);
          setTimeout(() => {
            navigate('/materiales'); // Redirige a la página de solicitudes después de 2 segundos
          }, 2000);
        } else {
          console.error('Error al actualizar la cantidad disponible');
        }
      } else {
        console.error('Error al realizar la solicitud');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };
  
  if (!material)
    return (
      <div className="progress-fall">
        <CircularProgress color="success" aria-label="Loading..." />
      </div>
    );

  if (showAlert) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-xl text-black font-semibold">Edición realizada</h2>
          <p className="mt-2 text-black">Tu edición ha sido realizada exitosamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen cards-container">
      <Card className="card">
        <CardHeader className="flex-col">
          <p className="uppercase font-bold name-material">{material.nombre}</p>
          <h4 className="text-large">Estado: {material.estado}</h4>
        </CardHeader>
        <CardBody className="overflow-visible">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={material.img}
            height={490}
            width={450}
          />
          <p className="cantidad-disponible">
            <span className="properties">Cantidad Disponible:</span> {material.cantidad_disponible}
          </p>
          <p>
            <span className="properties">Estado:</span> {material.estado}
          </p>
          <p>
            <span className="properties">Tipo de material: </span> {material.tipo}
          </p>
          <p>
            <span className="properties">Color:</span> {material.color}
          </p>
        </CardBody>
        <CardFooter>
          <div className="max-w-4xl mx-auto p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Identificador</label>
                  <input
                    type="text"
                    name="identificador"
                    onChange={handleInputChange}
                    value={formData.identificador}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                    placeholder="Ingrese Identificador"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <input
                    type="text"
                    name="descripción"
                    onChange={handleInputChange}
                    value={formData.descripción}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                    placeholder="Ingrese Descripción Nueva"
                  />
                </div>
                <div>
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className="mt-1 block w-full text-gray-400 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-700 focus:border-green-700 sm:text-lg"
                  >
                    <option value="">Seleccione un estado</option>
                    <option value="nuevo">Nuevo</option>
                    <option value="usado">Usado</option>
                    <option value="dañado">Dañado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
                  <input
                    type="text"
                    name="cantidad"
                    onChange={handleInputChange}
                    value={formData.cantidad}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                    placeholder="Ingrese Cantidad"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Situación</label>
                  <input
                    type="text"
                    name="situación"
                    onChange={handleInputChange}
                    value={formData.situación}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                    placeholder="Ingrese si se devuelve o no"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Button
                  type="submit"
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-green-700 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Actualizar material
                </Button>
                <Link to={"/"} className="text-sm font-semibold leading-6 text-gray-900">
                  Regresar
                </Link>
              </div>
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default EditarMateriales;
