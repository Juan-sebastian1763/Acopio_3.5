import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DatePicker,
  Button,
  CircularProgress,
  Card,
  CardBody,
  Image,
} from "@nextui-org/react";
import Cookies from "universal-cookie";

function AdquisicionMateriales() {
  const { id } = useParams();
  const cookies = new Cookies();
  const userId = cookies.get("id");
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    deliveryDate: null,
    returnDate: null,
    quantity: 1, // Inicializamos la cantidad en 1
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  // Cargar el material basado en el ID de los params
  useEffect(() => {
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

  const handleDateChange = (name, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  // Manejar el cambio en la cantidad y validar según la cantidad disponible
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= material.cantidad_disponible) {
      setFormData((prevData) => ({
        ...prevData,
        quantity: value,
      }));
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name.trim()) {
      formErrors.name = "El nombre es obligatorio.";
    }

    if (!formData.phoneNumber.trim()) {
      formErrors.phoneNumber = "El número de teléfono es obligatorio.";
    } else if (!/^\d{7,14}$/.test(formData.phoneNumber)) {
      formErrors.phoneNumber =
        "El número de teléfono debe contener solo dígitos y tener entre 7 y 14 caracteres.";
    }

    if (!formData.deliveryDate) {
      formErrors.deliveryDate = "La fecha de entrega es obligatoria.";
    }

    if (!formData.returnDate) {
      formErrors.returnDate = "La fecha de devolución es obligatoria.";
    } else if (formData.returnDate <= formData.deliveryDate) {
      formErrors.returnDate =
        "La fecha de devolución debe ser posterior a la fecha de entrega.";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    const requestData = {
      usuario_id: userId,
      nombre_usuario: formData.name,
      numero_telefono: formData.phoneNumber,
      entrega_aproximada: formData.deliveryDate,
      devolucion_aproximada: formData.returnDate,
      material_id: id,
      material_img: material.img,
      cantidad: formData.quantity,
      estado: "Pendiente",
    };

    try {
      const response = await fetch("http://localhost:3001/peticiones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setShowAlert(true);
        setTimeout(() => {
          navigate("/materiales");
        }, 2000);
      } else {
        console.error("Error al realizar la solicitud");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  if (!material)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" aria-label="Loading..." />
      </div>
    );

  if (showAlert) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-xl text-black font-semibold">
            Solicitud Realizada
          </h2>
          <p className="mt-2 text-black">
            Tu solicitud ha sido enviada exitosamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 flex-row gap-8">
      <Card className="w-full max-w-md">
        <CardBody className="p-6 flex flex-col items-center">
          <Image
            alt={material.nombre}
            className="object-cover w-full max-w-sm h-80 rounded-xl mb-6"
            src={material.img}
          />
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{material.nombre}</h2>
            <p className="text-lg mb-2">
              <span className="font-semibold">Cantidad Disponible:</span>{" "}
              {material.cantidad_disponible}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Estado:</span> {material.estado}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Tipo de material:</span>{" "}
              {material.tipo}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Color:</span> {material.color}
            </p>
          </div>
        </CardBody>
      </Card>

      <Card className="w-full max-w-md">
        <CardBody className="p-6">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Solicitud de Material
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Nombre:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su nombre"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Número de Teléfono:
              </label>
              <input
                type="text"
                name="phoneNumber"
                onChange={handleInputChange}
                value={formData.phoneNumber}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su número de teléfono"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Entrega aproximada del material
              </label>
              <DatePicker
                label="Fecha de Entrega"
                value={formData.deliveryDate}
                onChange={(date) => handleDateChange("deliveryDate", date)}
                className="max-w-[284px]"
              />
              {errors.deliveryDate && (
                <p className="text-red-500 text-sm">{errors.deliveryDate}</p>
              )}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Devolución aproximada del material
              </label>
              <DatePicker
                label="Fecha de Devolución"
                value={formData.returnDate}
                onChange={(date) => handleDateChange("returnDate", date)}
                className="max-w-[284px]"
              />
              {errors.returnDate && (
                <p className="text-red-500 text-sm">{errors.returnDate}</p>
              )}
            </div>
            {/* Campo de cantidad */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Cantidad:
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleQuantityChange}
                min="1"
                max={material.cantidad_disponible}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="text-center">
              <Button type="submit" color="success" size="lg">
                Enviar Solicitud
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default AdquisicionMateriales;
