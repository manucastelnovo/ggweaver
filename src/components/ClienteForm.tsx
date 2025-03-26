"use client";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function ClienteForm() {
  const [tipoPersona, setTipoPersona] = useState("Fisica");

  const handleTipoPersonaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTipoPersona(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(JSON.stringify(data, null, 2));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      if (!binaryStr) return;
      // Lee el libro de trabajo Excel
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      // Lee la primera hoja
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      // Convierte la hoja a JSON
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log("Datos del Excel:", data);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-black">
            Formulario de Captura de Datos del Cliente
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos del Cliente */}
            <fieldset className="p-4 border border-gray-700 rounded-md">
              <legend className="text-lg font-medium text-black">
                Datos del Cliente
              </legend>

              <div className="mt-4">
                <label
                  htmlFor="nombre_apellido"
                  className="block text-sm font-medium text-black"
                >
                  Nombre y Apellido
                </label>
                <div className="mt-2">
                  <input
                    id="nombre_apellido"
                    name="nombre_apellido"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="cedula_identidad"
                  className="block text-sm font-medium text-black"
                >
                  Cédula de Identidad
                </label>
                <div className="mt-2">
                  <input
                    id="cedula_identidad"
                    name="cedula_identidad"
                    type="text"
                    pattern="\d*"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="edad"
                  className="block text-sm font-medium text-black"
                >
                  Edad
                </label>
                <div className="mt-2">
                  <input
                    id="edad"
                    name="edad"
                    type="number"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="tipo_persona"
                  className="block text-sm font-medium text-black"
                >
                  Tipo de Persona
                </label>
                <div className="mt-2">
                  <select
                    id="tipo_persona"
                    name="tipo_persona"
                    defaultValue={"Fisica"}
                    onChange={handleTipoPersonaChange}
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 border border-gray-400 outline-white/10  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  >
                    <option value="Fisica">Fisica</option>
                    <option value="Juridica">Juridica</option>
                  </select>
                </div>
              </div>

              {tipoPersona === "Fisica" && (
                <div className="mt-4">
                  <label
                    htmlFor="perfil_comercial"
                    className="block text-sm font-medium text-black"
                  >
                    Perfil Comercial
                  </label>
                  <div className="mt-2">
                    <select
                      defaultValue={"Asalariado"}
                      id="perfil_comercial"
                      name="perfil_comercial"
                      required={tipoPersona === "Fisica"}
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                    >
                      <option value="">Seleccione</option>
                      <option value="Asalariado">Asalariado</option>
                      <option value="Independiente">Independiente</option>
                    </select>
                  </div>
                </div>
              )}
            </fieldset>

            {/* Datos de Evaluacion */}
            <fieldset className="p-4 border border-gray-700 rounded-md">
              <legend className="text-lg font-medium text-black">
                Datos de Evaluación
              </legend>

              <div className="mt-4">
                <label
                  htmlFor="ingresos"
                  className="block text-sm font-medium text-black"
                >
                  Ingresos
                </label>
                <div className="mt-2">
                  <input
                    id="ingresos"
                    name="ingresos"
                    type="number"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="antiguedad_laboral"
                  className="block text-sm font-medium text-black"
                >
                  Antigüedad Laboral
                </label>
                <div className="mt-2">
                  <select
                    id="antiguedad_laboral"
                    name="antiguedad_laboral"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  >
                    <option value="">Seleccione</option>
                    <option value="6 meses a un año">6 meses a un año</option>
                    <option value="1 a 2 años">1 a 2 años</option>
                    <option value="3 a 5 años">3 a 5 años</option>
                    <option value="Más de 5 años">Más de 5 años</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="posee_bienes"
                  className="block text-sm font-medium text-black"
                >
                  Posee Bienes
                </label>
                <div className="mt-2">
                  <select
                    id="posee_bienes"
                    name="posee_bienes"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  >
                    <option value="">Seleccione</option>
                    <option value="No">No</option>
                    <option value="Vehículo">Vehículo</option>
                    <option value="Inmueble">Inmueble</option>
                    <option value="Vehículo e Inmueble">
                      Vehículo e Inmueble
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="empresa"
                  className="block text-sm font-medium text-black"
                >
                  Empresa
                </label>
                <div className="mt-2">
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="faja_scoring_inforconf"
                  className="block text-sm font-medium text-black"
                >
                  Faja Scoring Inforconf
                </label>
                <div className="mt-2">
                  <input
                    id="faja_scoring_inforconf"
                    name="faja_scoring_inforconf"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </fieldset>

            {/* Datos Operacion */}
            <fieldset className="p-4 border border-gray-700 rounded-md">
              <legend className="text-lg font-medium text-black">
                Datos Operación
              </legend>

              <div className="mt-4">
                <label
                  htmlFor="producto"
                  className="block text-sm font-medium text-black"
                >
                  Producto
                </label>
                <div className="mt-2">
                  <select
                    id="producto"
                    name="producto"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  >
                    <option value="">Seleccione</option>
                    <option value="producto1">producto1</option>
                    <option value="producto2">producto2</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="monto_solicitado"
                  className="block text-sm font-medium text-black"
                >
                  Monto Solicitado
                </label>
                <div className="mt-2">
                  <input
                    id="monto_solicitado"
                    name="monto_solicitado"
                    type="number"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="cuota"
                  className="block text-sm font-medium text-black"
                >
                  Cuota
                </label>
                <div className="mt-2">
                  <input
                    id="cuota"
                    name="cuota"
                    type="number"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="plazo_meses"
                  className="block text-sm font-medium text-black"
                >
                  Plazo (Meses)
                </label>
                <div className="mt-2">
                  <input
                    id="plazo_meses"
                    name="plazo_meses"
                    type="number"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="tipo_garantia"
                  className="block text-sm font-medium text-black"
                >
                  Tipo de Garantía
                </label>
                <div className="mt-2">
                  <select
                    id="tipo_garantia"
                    name="tipo_garantia"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  >
                    <option value="">Seleccione</option>
                    <option value="ASF">ASF</option>
                    <option value="Hipotecaria">Hipotecaria</option>
                    <option value="Prendaria">Prendaria</option>
                    <option value="Codeudoría">Codeudoría</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* input para cargar excel? */}
            <fieldset className="p-4 border border-gray-700 rounded-md">
              <label className="block text-lg font-medium text-black">
                Cargar Excel
              </label>
              <input
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-gray-400 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
              />
            </fieldset>

            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Enviar Solicitud
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
