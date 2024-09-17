
import PropTypes from "prop-types";
import { Outlet, NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import Logo from "./Logo";
import "../../src/assets/css/NavBar.css";
import Cookies from "universal-cookie";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon} from '@heroicons/react/20/solid';
import { CloudArrowUpIcon, FingerPrintIcon, PencilSquareIcon, DocumentCurrencyBangladeshiIcon, PencilIcon, InboxArrowDownIcon, CheckIcon} from '@heroicons/react/24/outline';

const solutions = [
  { name: 'Registrar Instructor', description: "Registro de instructores al sistema", href: '/login', icon: FingerPrintIcon },
  { name: 'Solicitudes', description: 'Solicitudes de materiales', href: '/pedidos', icon: PencilSquareIcon },
  { name: 'devolver material', description: 'devolver materiales aceptados', href: '/devolver', icon: InboxArrowDownIcon },
  { name: 'Agregar Materiales', description: 'Agregar nuevos materiales al sistema', href: '/agregar', icon: CloudArrowUpIcon },
  { name: 'Generar Reportes', description: 'Genera reportes de los materiales', href: '/reporte', icon: DocumentCurrencyBangladeshiIcon },
  { name: 'Editar Materiales', description: 'Editar materiales existentes', href: '/editar', icon: PencilIcon },
];
const instructorOptions = [
  { name: 'Solicitar Materiales', description: 'Solicitar nuevos materiales', href: '/materiales', icon: CloudArrowUpIcon },
  { name: 'Mis Solicitudes', description: "Ver tus solicitudes de materiales", href: '/mispedidos', icon: PencilSquareIcon },
  { name: 'Solicitudes Aceptadas', description: 'Solicitar nuevos materiales', href: '/aceptados', icon: CheckIcon },
];


function NavbarComponent({ handleLogout }) {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get("id");
  const userRole = cookies.get("rol"); // Obtén el rol del usuario desde las cookies

  return (
    <>
      <Navbar
        className="navbar"
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarBrand>
          <NavLink end to={"/"}>
            <Logo />
          </NavLink>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-5" justify="center">
          <NavbarItem>
            <NavLink color="foreground" to={"/"}>
              Inicio
            </NavLink>
          </NavbarItem>
          {isLoggedIn && userRole === "Instructor" && (

            <Popover className="relative">
              <PopoverButton className="inline-flex items-center gap-x-1 leading-6">
                <span>Materiales</span>
                <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-md -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-gray-900/5">
                  <div className="p-4">
                    {instructorOptions.map((item) => (
                      <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                        </div>
                        <div>
                          <a href={item.href} className="font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverPanel>
            </Popover>

          )}
          <NavbarItem>
            <NavLink color="foreground" to={"servicios"}>
              Servicios
            </NavLink>
          </NavbarItem>
          {isLoggedIn && userRole === "administrador" && (
            <NavbarItem>
              <Popover className="relative">
                <PopoverButton className="inline-flex items-center gap-x-1  leading-6">
                  <span>Administrar</span>
                  <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
                </PopoverButton>
                <PopoverPanel
                  transition
                  className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-md -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg  ring-gray-900/5">
                    <div className="p-4">
                      {solutions.map((item) => (
                        <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                          </div>
                          <div>
                            <a href={item.href} className="font-semibold text-gray-900">
                              {item.name}
                              <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverPanel>
              </Popover>
            </NavbarItem>
          )}
        </NavbarContent>
        <NavbarContent justify="end">
          {isLoggedIn ? (
            <NavbarItem className="lg:flex">
              <Button variant="shadow" size="lg" color="success" className="cerrar-sesion text-color" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </NavbarItem>
          ) : (
            <NavbarItem className="lg:flex">
              <NavLink to={"/login"}>
                <Button variant="shadow" size="lg" className="iniciar-sesion">
                  Iniciar Sesión
                </Button>
              </NavLink>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
      <Outlet />
    </>
  );
}

NavbarComponent.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default NavbarComponent;
