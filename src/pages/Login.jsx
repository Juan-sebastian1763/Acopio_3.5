import { useState, useEffect } from "react";
import { Tabs, Tab, Input, Button, Card, CardBody } from "@nextui-org/react";
import "../assets/css/Login.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js"; // Importa crypto-js para MD5

const cookies = new Cookies();
const baseUrl = 'http://localhost:3001/usuarios';

function Login() {
  const [selected, setSelected] = useState("login");
  const [nombre, setNombre] = useState(""); 
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false); // Nuevo estado para controlar la alerta
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es administrador
  const navigate = useNavigate();
  
  useEffect(() => {
    const userRol = cookies.get('rol');
    if (userRol === 'administrador') {
      setIsAdmin(true);
      setSelected("sign-up"); // Cambiar la pestaña seleccionada automáticamente
    }
  }, []);

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Encriptar la contraseña con MD5
    const contraseñaEncriptada = CryptoJS.MD5(contraseña).toString();

    const nuevoUsuario = {
      correo,
      contraseña: contraseñaEncriptada,
      nombre,
      rol: "Instructor", // Asigna automáticamente el rol de "Instructor"
    };

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (response.ok) {
        setShowAlert(true); // Mostrar la alerta
        setTimeout(() => {
          navigate("/login"); // Redirige al inicio de sesión después de 2 segundos
        }, 2000);
      } else {
        setError("Error al registrar el usuario");
      }
    } catch (error) {
      console.error("Error en la conexión con la API", error);
      setError("Error en la conexión con la API");
    }
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    // Encriptar la contraseña con MD5
    const contraseñaEncriptada = CryptoJS.MD5(contraseña).toString();

    try {
      const response = await fetch(`${baseUrl}?correo=${correo}`);
      const usuarios = await response.json();

      // Filtrar el usuario por correo
      const usuario = usuarios.find(user => user.correo === correo);

      // Verificar contraseña si el usuario existe
      if (usuario && usuario.contraseña === contraseñaEncriptada) {
        cookies.set('id', usuario.id, { path: "/" });
        cookies.set('correo', usuario.correo, { path: "/" });
        cookies.set('usuario', usuario.usuario, { path: "/" });
        cookies.set('rol', usuario.rol, { path: "/" }); // Almacena el rol en las cookies

        setShowAlert(true); // Mostrar la alerta
        setTimeout(() => {
          navigate("/"); // Redirige a la página de inicio después de 2 segundos
        }, 2000);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.log(error);
      setError('Error en la conexión con la API');
    }
  };

  if (showAlert) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-xl text-black font-semibold">¡Éxito!</h2>
          <p className="mt-2 text-black">Operación realizada correctamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full login">
      <h1 className="title-app"></h1>
      <Card className="max-w-full w-[480px] h-[520px] login-form">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            {!isAdmin && (
              <Tab key="login" title="Inicio de sesión">
                <form className="flex flex-col gap-8 mt-6" onSubmit={iniciarSesion}>
                  {error && <p className="text-red-500">{error}</p>}
                  <Input
                    isRequired
                    label="Correo electrónico"
                    placeholder="Ingresa tu correo electrónico"
                    type="email"
                    size="lg"
                    className="hover:border-[#109e49] focus:border-[#109e49] focus:ring-[#109e49]"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  <Input
                    isRequired
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    type="password"
                    size="lg"
                    className="hover:border-[#109e49] focus:border-[#109e49] focus:ring-[#109e49]"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                  />
                  <div className="flex gap-2 justify-end mt-4">
                    <Button
                      fullWidth
                      color="success"
                      size="lg"
                      className="boton-iniciar-sesion"
                      type="submit"
                    >
                      Iniciar Sesión
                    </Button>
                  </div>
                </form>
              </Tab>
            )}
            {isAdmin && (
              <Tab key="sign-up" title="Registro de instructor">
                <form className="flex flex-col gap-6 mt-6" onSubmit={handleRegistro}>
                  {error && <p className="text-red-500">{error}</p>}
                  <Input
                    variant="light"
                    isRequired
                    label="Nombre"
                    placeholder="Ingresa tu nombre completo"
                    type="text"
                    size="lg"
                    className="input"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <Input
                    isRequired
                    label="Correo Electrónico"
                    placeholder="Ingresa tu correo electrónico"
                    type="email"
                    size="lg"
                    className="input"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  <Input
                    isRequired
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    type="password"
                    size="lg"
                    className="input"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                  />
                  <div className="flex gap-2 justify-end mt-4">
                    <Button
                      fullWidth
                      color="success"
                      size="lg"
                      className="boton-registrarse"
                      type="submit"
                    >
                      Registrar
                    </Button>
                  </div>
                </form>
              </Tab>
            )}
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
