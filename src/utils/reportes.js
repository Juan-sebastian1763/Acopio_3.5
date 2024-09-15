// src/utils/reportes.js

// Función para obtener el inventario de materiales
export const obtenerInventario = (materiales) => {
    return materiales.map(material => ({
      nombre: material.nombre,
      cantidad_disponible: material.cantidad_disponible,
      estado: material.estado,
      tipo: material.tipo
    }));
  };
  
  // Función para obtener estadísticas de los materiales
  export const obtenerEstadisticasMateriales = (materiales) => {
    const estadisticas = {
      total: materiales.length,
      porTipo: {},
      porEstado: {}
    };
  
    materiales.forEach(material => {
      if (!estadisticas.porTipo[material.tipo]) {
        estadisticas.porTipo[material.tipo] = 0;
      }
      estadisticas.porTipo[material.tipo]++;
  
      if (!estadisticas.porEstado[material.estado]) {
        estadisticas.porEstado[material.estado] = 0;
      }
      estadisticas.porEstado[material.estado]++;
    });
  
    return estadisticas;
  };
  
  // Función para obtener las peticiones agrupadas por estado
  export const obtenerPeticionesPorEstado = (peticiones) => {
    const estados = peticiones.reduce((acc, peticion) => {
      if (!acc[peticion.estado]) {
        acc[peticion.estado] = 0;
      }
      acc[peticion.estado]++;
      return acc;
    }, {});
  
    return estados;
  };
  
  // Función para obtener las peticiones agrupadas por usuario
  export const obtenerPeticionesPorUsuario = (peticiones, usuarios) => {
    const peticionesPorUsuario = usuarios.reduce((acc, usuario) => {
      acc[usuario.nombre] = peticiones.filter(peticion => peticion.usuario_id === usuario.id).length;
      return acc;
    }, {});
    
    return peticionesPorUsuario;
  };
  