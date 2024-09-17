import jsPDF from "jspdf"; 
import autoTable from 'jspdf-autotable';
import "../assets/css/Inicio.css";

// Función para obtener los datos desde la API
const obtenerDatosReporte = async () => {
  let url = "/src/api/db.json";
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};

// Función para generar el reporte de materiales
const generarPDFMateriales = (doc, data) => {
  const body = data.materiales.map(material => [material.id, material.nombre, material.descripcion]);
  autoTable(doc, {
    head: [['ID', 'Nombre', 'Descripción']],
    body: body,
  });
};

// Función para generar el reporte de solicitudes
const generarPDFSolicitudes = (doc, data) => {
  const body = data.peticiones.map(peticion => {
    const material = data.materiales.find(material => material.id === peticion.material_id);
    return [
      peticion.id,
      peticion.nombre_usuario,
      peticion.estado,
      material ? material.nombre : 'Desconocido' // Añade el nombre del material si existe
    ];
  });

  autoTable(doc, {
    head: [['ID', 'Usuario', 'Estado', 'Material Solicitado']],
    body: body,
  });
};

// Función para generar el reporte de inventario
const generarPDFInventario = (doc, data) => {
  const body = data.materiales.map(material => [material.id, material.nombre, material.cantidad_disponible]);
  autoTable(doc, {
    head: [['ID', 'Nombre', 'Cantidad Disponible']],
    body: body,
  });
};

// Función para generar el reporte de instructores
const generarPDFInstructores = (doc, data) => {
  const body = data.usuarios.map(usuario => [usuario.id, usuario.nombre, usuario.rol]);
  autoTable(doc, {
    head: [['ID', 'Nombre', 'Rol']],
    body: body,
  });
};

// Nueva función para generar el reporte de materiales devueltos
const generarPDFMaterialesDevueltos = (doc, data) => {
  // Verificamos si 'devoluciondetalle' existe y es un array
  if (!data.devoluciondetalle || !Array.isArray(data.devoluciondetalle)) {
    console.error("devoluciondetalle no existe o no es un array");
    return;  // Salir si no existen los datos
  }

  // Mapeamos los datos para construir el cuerpo del reporte
  const body = data.devoluciondetalle.map(devolucion => [
    devolucion.nombre_usuario || 'N/A', // Si no hay nombre, ponemos 'N/A'
    devolucion.descripcion,
    devolucion.numero_telefono || 'N/A', // Si no hay teléfono, ponemos 'N/A'
    devolucion.fecha ? new Date(devolucion.fecha).toLocaleDateString() : 'N/A' // Si no hay fecha, ponemos 'N/A'
  ]);

  // Generamos la tabla en el PDF
  autoTable(doc, {
    head: [['Nombre de Usuario', 'Descripción', 'Teléfono', 'Fecha']],
    body: body,
  });
};


// Función principal para generar el PDF según el tipo de reporte seleccionado
const generarPDF = async (tipoReporte) => {
  try {
    const data = await obtenerDatosReporte();
    console.log("Datos obtenidos:", data); // Verifica si "devoluciondetalle" está aquí
    const doc = new jsPDF();
    doc.text(`Reporte de ${tipoReporte}`, 20, 10);

    switch (tipoReporte) {
      case "Materiales":
        generarPDFMateriales(doc, data);
        break;
      case "Solicitudes":
        generarPDFSolicitudes(doc, data);
        break;
      case "Inventario":
        generarPDFInventario(doc, data);
        break;
      case "Instructores":
        generarPDFInstructores(doc, data);
        break;
      case "Materiales Devueltos":
        console.log("Generando reporte de Materiales Devueltos", data.devoluciondetalle); // Verificar si este campo existe
        generarPDFMaterialesDevueltos(doc, data);
        break;
      default:
        console.error("Tipo de reporte no reconocido");
        return;
    }

    doc.save(`${tipoReporte}.pdf`);
  } catch (error) {
    console.error("Error al generar el reporte:", error);
  }
};


// Componente para mostrar los botones de reporte
const Reporte = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white py-24">
      <div className="text-center max-w-2xl">
        <p className="mt-2 text-3xl font-bold tracking-tight text-green-800 sm:text-4xl">
          Generar Reportes
        </p>
        <p className="text-lg leading-8 text-black mb-10">
          En esta sección puedes generar reportes detallados sobre inventario, solicitudes, materiales, materiales devueltos e instructores del centro de acopio.
          Selecciona el tipo de reporte y descarga un PDF con la información correspondiente.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button 
          className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600" 
          onClick={() => generarPDF('Inventario')}
        >
          Inventario
        </button>
        <button 
          className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600" 
          onClick={() => generarPDF('Solicitudes')}
        >
          Solicitudes
        </button>
        <button 
          className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600" 
          onClick={() => generarPDF('Materiales')}
        >
          Materiales
        </button>
        <button 
          className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600" 
          onClick={() => generarPDF('Instructores')}
        >
          Instructores
        </button>
        <button 
          className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600" 
          onClick={() => generarPDF('Materiales Devueltos')} // El texto debe coincidir con el caso en el switch
        >
          Materiales Devueltos
        </button>


      </div>
    </div>
  );
};

export default Reporte;
