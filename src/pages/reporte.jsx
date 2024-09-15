import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import "../assets/css/Inicio.css";

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

const generarPDFMateriales = (doc, data) => {
  const body = data.materiales.map(material => [material.id, material.nombre, material.descripcion]);
  autoTable(doc, {
    head: [['ID', 'Nombre', 'Descripción']],
    body: body,
  });
};

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

const generarPDFInventario = (doc, data) => {
  const body = data.materiales.map(material => [material.id, material.nombre, material.cantidad_disponible]);
  autoTable(doc, {
    head: [['ID', 'Nombre', 'Cantidad Disponible']],
    body: body,
  });
};

const generarPDFInstructores = (doc, data) => {
  const body = data.usuarios.map(usuario => [usuario.id, usuario.nombre, usuario.rol]);
  autoTable(doc, {
    head: [['ID', 'Nombre', 'Rol']],
    body: body,
  });
};

const generarPDF = async (tipoReporte) => {
  try {
    const data = await obtenerDatosReporte();
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
      default:
        console.error("Tipo de reporte no reconocido");
        return;
    }

    doc.save(`${tipoReporte}.pdf`);
  } catch (error) {
    console.error("Error al generar el reporte:", error);
    // Aquí podrías agregar una notificación visual de error
  }
};

const Reporte = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white py-24">
      <div className="text-center max-w-2xl">
        <p className="mt-2 text-3xl font-bold tracking-tight text-green-800 sm:text-4xl">
          Generar Reportes
        </p>
        <p className="text-lg leading-8 text-black mb-10">
          En esta sección puedes generar reportes detallados sobre inventario, solicitudes, materiales e instructores del centro de acopio.
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
      </div>
    </div>
  );
};

export default Reporte;
