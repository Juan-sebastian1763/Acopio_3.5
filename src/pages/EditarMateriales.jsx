import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";

import "../assets/css/materiales/editarMateriales.css";

function EditarMateriales() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identificador: "",
    descripcion: "",
    estado: "",
    cantidad: "",
    tipo_material: "",
    color: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    fetchMaterial();
  }, [id]);

  const fetchMaterial = async () => {
    try {
      const response = await fetch(`http://localhost:3001/materiales/${id}`);
      if (response.ok) {
        const data = await response.json();
        setMaterial(data);
        resetFormData();
      } else {
        console.error("Error al cargar el material");
      }
    } catch (error) {
      console.error("Error al cargar el material:", error);
    }
  };

  const resetFormData = () => {
    setFormData({
      identificador: data?.identificador || "",
      descripcion: "",
      estado: "",
      cantidad: "",
      tipo_material: "",
      color: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const cantidadSolicitada = parseInt(formData.cantidad) || material.cantidad_disponible;
  
    const updatedMaterial = {
      ...material,
      identificador: formData.identificador || material.identificador,
      descripcion: formData.descripcion || material.descripcion,
      estado: formData.estado || material.estado,
      cantidad_disponible: cantidadSolicitada,
      tipo: formData.tipo_material || material.tipo,
      color: formData.color || material.color,
    };
  
    try {
      const response = await fetch(`http://localhost:3001/materiales/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMaterial),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        setMaterial(updatedData);
        setUpdateSuccess(true);
        setShowAlert(true);
  
        // Redirigir a la página anterior después de la actualización exitosa
        setTimeout(() => {
          navigate(-1);  // Regresa a la página anterior
        }, 2000);  // Tiempo de espera para mostrar el mensaje de éxito
  
      } else {
        console.error('Error al actualizar el material');
        setUpdateSuccess(false);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error de red:', error);
      setUpdateSuccess(false);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };
  

  if (!material) {
    return (
      <div className="progress-fall">
        <CircularProgress color="success" aria-label="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen cards-container">
      <Card className="card">
        <CardHeader className="flex-col">
          <p className="uppercase font-bold name-material">{material.nombre}</p>
        </CardHeader>
        <CardBody className="overflow-visible">
        <Image
         alt="Card background"
         className="object-cover rounded-xl imagen-material"
         src={material.img}
         height={250}  // Cambié el tamaño a 250px para que sea más pequeña
         width={250}
         />
          <p className="cantidad-disponible">
            <span className="properties">Cantidad Disponible:</span> {material.cantidad_disponible}
          </p>
          <p>
            <span className="properties">Identificador:</span> {material.identificador}
          </p>
          <p>
            <span className="properties">Descripción:</span> {material.descripcion}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    onChange={handleInputChange}
                    value={formData.descripcion}
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
                  <label htmlFor="tipo_material" className="block text-sm font-medium text-gray-700 mb-2">Tipo de Material</label>
                  <select
                    id="tipo_material"
                    name="tipo_material"
                    value={formData.tipo_material}
                    onChange={handleInputChange}
                    className="mt-1 block w-full text-gray-400 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-700 focus:border-green-700 sm:text-lg"
                  >
                    <option value="">Seleccione un tipo</option>
                    <option value="suministro">Suministro</option>
                    <option value="electronico">Electrónico</option>
                    <option value="fisico">Físico</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <input
                    type="text"
                    name="color"
                    onChange={handleInputChange}
                    value={formData.color}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                    placeholder="Ingrese color"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Button
                  type="submit"
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-green-700 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={loading}
                >
                  {loading ? "Actualizando..." : "Actualizar material"}
                </Button>
                <Link to={"/editar"} className="text-sm font-semibold leading-6 text-gray-900">
                  Regresar
                </Link>
              </div>
            </form>
          </div>
        </CardFooter>
      </Card>
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-xl text-black font-semibold">
              {updateSuccess ? "Actualización exitosa" : "Error en la actualización"}
            </h2>
            <p className="mt-2 text-black">
              {updateSuccess
                ? "El material ha sido actualizado correctamente."
                : "Hubo un problema al actualizar el material. Por favor, intente de nuevo."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditarMateriales;