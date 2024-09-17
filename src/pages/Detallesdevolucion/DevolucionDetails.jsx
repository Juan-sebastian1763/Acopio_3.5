import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Button, CardFooter } from "@nextui-org/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

export default function DevolucionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [correoUsuario, setCorreoUsuario] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  
  // Estado para el formulario de devolución
  const [cantidadDevuelta, setCantidadDevuelta] = useState("");
  const [descripcionDevolucion, setDescripcionDevolucion] = useState("");

  useEffect(() => {
    const cookies = new Cookies();
    const userRole = cookies.get("rol");

    if (userRole === "administrador") {
      setIsAdmin(true);
    } else if (userRole === "Instructor") {
      setIsInstructor(true);
    }

    const fetchPedido = async () => {
      try {
        const responsePedido = await fetch(`http://localhost:3001/peticiones/${id}`);
        const dataPedido = await responsePedido.json();
        setPedido(dataPedido);

        const responseUsuario = await fetch(`http://localhost:3001/usuarios/${dataPedido.usuario_id}`);
        const dataUsuario = await responseUsuario.json();
        setCorreoUsuario(dataUsuario.correo);
      } catch (error) {
        console.error("Error al obtener los detalles del pedido o del usuario:", error);
        toast.error("Error al cargar los detalles del pedido.");
      }
    };

    fetchPedido();
  }, [id]);

  const handleSubmitDevolucion = async () => {
    const devolucionData = {
      cantidad: cantidadDevuelta,
      descripcion: descripcionDevolucion,
      usuario_id: pedido.usuario_id,
      nombre_usuario: pedido.nombre_usuario,
      numero_telefono: pedido.numero_telefono,
      fecha: new Date().toISOString(),
    };
  
    try {
      // Enviar datos de la devolución
      const responseDevolucion = await fetch("http://localhost:3001/devoluciondetalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(devolucionData),
      });
  
      if (responseDevolucion.ok) {
        toast.success("Devolución registrada correctamente.");
        setCantidadDevuelta("");
        setDescripcionDevolucion("");
  
        // Actualizar el estado de la petición a "Finalizado"
        const responseUpdateEstado = await fetch(`http://localhost:3001/peticiones/${pedido.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: "Finalizado" }),
        });
  
        if (responseUpdateEstado.ok) {
          toast.success("Estado de la petición actualizado a 'Finalizado'.");
  
          // Obtener el material actual antes de actualizarlo
          const responseMaterial = await fetch(`http://localhost:3001/materiales/${pedido.material_id}`);
          const material = await responseMaterial.json();
  
          // Actualizar solo la cantidad disponible del material, conservando los otros campos
          const nuevaCantidadDisponible = material.cantidad_disponible + parseInt(cantidadDevuelta, 10);
  
          const materialActualizado = {
            ...material, // Conservar todos los otros campos
            cantidad_disponible: nuevaCantidadDisponible, // Solo actualizar la cantidad disponible
          };
  
          const responseUpdateMaterial = await fetch(`http://localhost:3001/materiales/${pedido.material_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(materialActualizado),
          });
  
          if (responseUpdateMaterial.ok) {
            toast.success("Cantidad del material actualizada correctamente.");
            // Redirigir a la página anterior
            navigate(-1);  // Navega a la página anterior
          } else {
            toast.error("Error al actualizar la cantidad del material.");
          }
        } else {
          toast.error("Error al actualizar el estado de la petición.");
        }
      } else {
        toast.error("Error al registrar la devolución.");
      }
    } catch (error) {
      console.error("Error al enviar los datos de la devolución:", error);
      toast.error("Error de red al enviar los datos.");
    }
  };
  
  
  
  const formatDate = (dateObject) => {
    if (!dateObject || !dateObject.year || !dateObject.month || !dateObject.day) {
      return "No especificada";
    }
    const { year, month, day } = dateObject;
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? "Fecha inválida" : date.toLocaleDateString();
  };

  if (!pedido) {
    return <div className="text-center text-gray-600">Cargando detalles del pedido...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
        <div className="flex flex-col md:flex-row gap-6 max-w-4xl">
          {/* Card for Material Details */}
          <Card className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-100 p-4 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-gray-700">
                Pedido de: {pedido.nombre_usuario || "Usuario Desconocido"}
              </h1>
            </CardHeader>
            <CardBody className="p-4">
              {pedido.material_img && (
                <img
                  alt="Imagen del material"
                  className="w-full h-60 object-cover rounded-lg mb-4"
                  src={pedido.material_img}
                />
              )}
            </CardBody>
            <CardFooter className="p-5 flex justify-center bg-gray-100 border-t border-gray-200">
                <Button
                    color="success"
                    className="max-w-xs text-white"
                    onClick={() => navigate(-1)}
                >
                    {isInstructor ? "Regresar" : "Regresar"}
                </Button>
            </CardFooter>

          </Card>

          {/* Card for Order Details */}
          <Card className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-100 p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700">
                Detalles de la Solicitud
              </h2>
            </CardHeader>
            <CardBody className="p-4 space-y-3">
              <p className="text-gray-600"><strong>Usuario:</strong> {pedido.nombre_usuario || "No especificado"}</p>
              <p className="text-gray-600"><strong>Correo:</strong> {correoUsuario || "No especificado"}</p>
              <p className="text-gray-600"><strong>Número de Teléfono:</strong> {pedido.numero_telefono || "No especificado"}</p>
              <p className="text-gray-600"><strong>Estado:</strong> {pedido.estado || "No especificado"}</p>
              <p className="text-gray-600"><strong>Fecha de Entrega:</strong> {formatDate(pedido.entrega_aproximada)}</p>
              <p className="text-gray-600"><strong>Fecha de Devolución:</strong> {formatDate(pedido.devolucion_aproximada)}</p>
              <p className="text-gray-600"><strong>Cantidad:</strong> {pedido.cantidad || "No especificado"}</p>
            </CardBody>
          </Card>

          {/* Card for Devolution Form */}
          <Card className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-100 p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700">
                Registrar Devolución
              </h2>
            </CardHeader>
            <CardBody className="p-4 space-y-3">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Cantidad Devuelta:</label>
                <input
                  type="number"
                  value={cantidadDevuelta}
                  onChange={(e) => setCantidadDevuelta(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Cantidad devuelta"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Descripción de Devolución:</label>
                <textarea
                  value={descripcionDevolucion}
                  onChange={(e) => setDescripcionDevolucion(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Describe el estado del material al devolverlo"
                />
              </div>
            </CardBody>
            <CardFooter className="p-5 flex justify-center bg-gray-100 border-t border-gray-200">
              <Button color="success" className="text-white" onClick={handleSubmitDevolucion}>
                Enviar Devolución
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
