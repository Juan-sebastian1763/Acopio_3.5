import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';

export default function AgregarMaterial() {
  const [formData, setFormData] = useState({
    identificador: '', // Nuevo campo
    situacion: '', // Nuevo campo
    nombre: '',
    tipo: '',
    cantidad_disponible: '',
    estado: '',
    descripcion: '',
    color: '',
    img: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        img: URL.createObjectURL(file) // Previsualización de la imagen
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/materiales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Material agregado exitosamente');
        setFormData({
          identificador: '',
          situacion: '',
          nombre: '',
          tipo: '',
          cantidad_disponible: '',
          estado: '',
          descripcion: '',
          color: '',
          img: ''
        });
      } else {
        console.error('Error al agregar material');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className='flex flex-col w-full login'>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className='text-center'>
            <h2 className="text-base font-semibold leading-7 text-green-700">
              ACOPIO
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-green-700 sm:text-4xl">
              Agregar Nuevo Material
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Rellena los campos para agregar un nuevo material a la base de datos.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Identificador */}
            <div className="sm:col-span-4">
              <label htmlFor="identificador" className="block text-sm font-medium leading-6 text-gray-900">
                Identificador
              </label>
              <div className="mt-2">
                <input
                  id="identificador"
                  name="identificador"
                  type="text"
                  value={formData.identificador}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Identificador único del material"
                />
              </div>
            </div>

            {/* Situación */}
            <div className="sm:col-span-4">
              <label htmlFor="situacion" className="block text-sm font-medium leading-6 text-gray-900">
                Situación
              </label>
              <div className="mt-2">
                <input
                  id="situacion"
                  name="situacion"
                  type="text"
                  value={formData.situacion}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Situación del material"
                />
              </div>
            </div>

            {/* Nombre */}
            <div className="sm:col-span-4">
              <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Nombre del material"
                />
              </div>
            </div>

           {/* Tipo (Select) */}
           <div className="sm:col-span-4">
              <label htmlFor="tipo" className="block text-sm font-medium leading-6 text-gray-900">
                Tipo
              </label>
              <div className="mt-2">
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="herramientas">Herramientas</option>
                  <option value="electronicos">Equipos</option>
                  <option value="suministros">Materiales de formación</option>
                </select>
              </div>
            </div>

            {/* Cantidad Disponible */}
            <div className="sm:col-span-4">
              <label htmlFor="cantidad_disponible" className="block text-sm font-medium leading-6 text-gray-900">
                Cantidad Disponible
              </label>
              <div className="mt-2">
                <input
                  id="cantidad_disponible"
                  name="cantidad_disponible"
                  type="number"
                  value={formData.cantidad_disponible}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Cantidad disponible"
                />
              </div>
            </div>

            {/* Estado (Select) */}
            <div className="sm:col-span-4">
              <label htmlFor="estado" className="block text-sm font-medium leading-6 text-gray-900">
                Estado
              </label>
              <div className="mt-2">
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                >
                  <option value="">Seleccione un estado</option>
                  <option value="nuevo">Nuevo</option>
                  <option value="usado">Usado</option>
                  <option value="deteriorado">Deteriorado</option>
                </select>
              </div>
            </div>

            {/* Descripción */}
            <div className="col-span-full">
              <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">
                Descripción
              </label>
              <div className="mt-2">
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Descripción del material"
                />
              </div>
            </div>

            {/* Color */}
            <div className="sm:col-span-4">
              <label htmlFor="color" className="block text-sm font-medium leading-6 text-gray-900">
                Color
              </label>
              <div className="mt-2">
                <input
                  id="color"
                  name="color"
                  type="text"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Color del material"
                />
              </div>
            </div>

            {/* Imagen */}
            <div className="col-span-full">
  <label htmlFor="img" className="block text-sm font-medium leading-6 text-gray-900">
    Imagen
  </label>
  <div className="mt-2 flex items-center gap-x-2"> {/* Cambié gap-x-3 a gap-x-2 */}
    <PhotoIcon aria-hidden="true" className="h-8 w-8 text-gray-300" /> {/* Cambié a h-8 y w-8 */}
    <input
      type="file"
      id="img"
      name="img"
      accept="image/*"
      onChange={handleFileChange}
      className="text-sm" 
    />
    {formData.img && (
      <img src={formData.img} alt="Preview" className="h-12 w-12 object-cover" /> 
    )}
  </div>
</div>

          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="submit" className="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Guardar Material
          </button>
        </div>
      </form>
    </div>
  );
}
