import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import { Home } from "./pages/Home";
import Materiales from "./pages/Materiales";
import NavbarComponent from "./components/NavbarComponent";
import Servicios from "./pages/Servicios";
import MaterialesDetails from "./pages/Detallesmateriales/MaterialesDetails";
import DevolucionDetails from "./pages/Detallesdevolucion/DevolucionDetails";
import AdquisicionMateriales from "./pages/Adquisicion/AdquisicionMaterial";
import Cookies from "universal-cookie";
import Administrar from "./pages/administrar";
import Pedidos from "./pages/pedidos";
import PedidosDetalle from "./pages/Detallespedidos/PedidosDetalle"; // Importa la nueva vista
import Agregar from "./pages/agregar";
import  Reporte from "./pages/reporte";
import Mispedidos from "./pages/mispedidos";
import Editar from "./pages/editar";
import EditarMateriales from "./pages/EditarMateriales";
import Devolver from "./pages/devover";
import Aceptado from "./pages/aceptados";

function App() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();
  const userLoggedIn = !!cookies.get("id");

  // Mostrar cookies en la consola
  console.log("ID del usuario: " + cookies.get("id"));
  console.log("Correo del usuario: " + cookies.get("correo"));
  console.log("Rol del usuario: " + cookies.get("rol")); // Obtener y mostrar el rol

  const handleLogout = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("correo", { path: "/" });
    cookies.remove("rol", { path: "/" });
    navigate("/login");
  };
  

  // Redirigir al login si el usuario no está logueado y no está en las rutas públicas
  if (userLoggedIn && location.pathname === "/login") {
    navigate("/");
  }

  return (
    <>
      <div className="fondo container-app">
        <NavbarComponent handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="materiales" element={<Materiales />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="pedidos/:id" element={<PedidosDetalle />} />
          <Route path="administrar" element={<Administrar />} />
          <Route path="editar" element={<Editar />} />
          <Route path="devolver" element={<Devolver />} />
          <Route path="devolver/:id" element={<DevolucionDetails />} />
          <Route path="agregar" element={<Agregar />} />
          <Route path="reporte" element={<Reporte />} />
          <Route path="materiales/:id/editarmateriales" element={<EditarMateriales />} />
          <Route path="materiales/:id" element={<MaterialesDetails />} />
          <Route path="materiales/:id/adquirir" element={<AdquisicionMateriales />} />
          <Route path="mispedidos" element={<Mispedidos />} /> 
          <Route path="aceptados" element={<Aceptado />} /> 
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
