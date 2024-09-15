import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
} from "@nextui-org/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PedidosDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [correoUsuario, setCorreoUsuario] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si es administrador

  useEffect(() => {
    // Obtener datos del usuario logueado desde el almacenamiento local o contexto
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")); // Suponiendo que guardas los datos del usuario logueado en el localStorage

    if (usuarioLogueado?.rol === "administrador") {
      setIsAdmin(true); // Verificar si el usuario logueado es administrador
    }

    const fetchPedido = async () => {
      try {
        const responsePedido = await fetch(
          `http://localhost:3001/peticiones/${id}`
        );
        const dataPedido = await responsePedido.json();
        setPedido(dataPedido);

        const responseUsuario = await fetch(
          `http://localhost:3001/usuarios/${dataPedido.usuario_id}`
        );
        const dataUsuario = await responseUsuario.json();
        setCorreoUsuario(dataUsuario.correo);
      } catch (error) {
        console.error(
          "Error al obtener los detalles del pedido o del usuario:",
          error
        );
        toast.error("Error al cargar los detalles del pedido.");
      }
    };

    fetchPedido();
  }, [id]);

  const handleAceptarPedido = async () => {
    try {
      const response = await fetch(`http://localhost:3001/peticiones/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...pedido, estado: "Aceptado" }),
      });

      if (response.ok) {
        setPedido((prevPedido) => ({ ...prevPedido, estado: "Aceptado" }));
        toast.success("Pedido aceptado correctamente. Redirigiendo...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/pedidos");
        }, 3000);
      } else {
        toast.error("Error al actualizar el pedido.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      toast.error("Error de red al procesar la solicitud.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No especificada";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Fecha inválida" : date.toLocaleDateString();
  };

  if (!pedido) {
    return (
      <div className="text-center text-gray-600">
        Cargando detalles del pedido...
      </div>
    );
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
              <Link to="/pedidos">
                <Button color="success" className="max-w-xs">
                  Regresar a Pedidos
                </Button>
              </Link>
              {/* Mostrar el botón de Aceptar Pedido solo si es administrador */}
              {isAdmin && (
                <Button
                  variant="shadow"
                  className="text-color ml-4"
                  size="lg"
                  onClick={handleAceptarPedido}
                  disabled={pedido.estado === "Aceptado"}
                >
                  Aceptar Pedido
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Card for Order Details */}
          <Card className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-100 p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700">
                Detalles del Pedido
              </h2>
            </CardHeader>
            <CardBody className="p-4 space-y-3">
              <p className="text-gray-600">
                <strong>Usuario:</strong>{" "}
                {pedido.nombre_usuario || "No especificado"}
              </p>
              <p className="text-gray-600">
                <strong>Correo:</strong> {correoUsuario || "No especificado"}
              </p>
              <p className="text-gray-600">
                <strong>Número de Teléfono:</strong>{" "}
                {pedido.numero_telefono || "No especificado"}
              </p>
              <p className="text-gray-600">
                <strong>Estado:</strong> {pedido.estado || "No especificado"}
              </p>
              <p className="text-gray-600">
                <strong>Fecha de Entrega:</strong>{" "}
                {formatDate(pedido.entrega_aproximada)}
              </p>
              <p className="text-gray-600">
                <strong>Fecha de Devolución:</strong>{" "}
                {formatDate(pedido.devolucion_aproximada)}
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default PedidosDetalle;
