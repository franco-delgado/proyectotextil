import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./deson210.css";

// Eliminé la función externa y moví todo a Deson210 para que la tabla y el form compartan datos
function Deson210() {
  // 1. ESTADO DE LA PLANILLA (Aquí se guardan los datos que ves en la tabla)
  const [maquina, setMaquina] = useState([
    {
      fecha: "22/12/2025",
      mantenimiento: "servi rutinario",
      repuestos: "correa A327",
      observaciones: "detalles mas especificos",
      prfecha: "20/03/2026",
      operario: "Adolfo",
    },
    {
      fecha: "20/03/2026",
      mantenimiento: "servi rutinario",
      repuestos: " ",
      observaciones: "detalles mas especificos",
      prfecha: "20/09/2026",
      operario: "Adolfo",
    },
  ]);

  // 2. ESTADO DE LOS INPUTS
  const [inputs, setInputs] = useState({
    fecha: "",
    mantenimiento: "",
    repuestos: "",
    observaciones: "",
    prfecha: "",
    operario: "",
  });

  // 3. FUNCIÓN PARA CAPTURAR CAMBIOS (Corregido: ahora usa 'inputs')
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // 4. FUNCIÓN PARA GUARDAR Y ACTUALIZAR PLANILLA
  const guardarRegistro = () => {
    if (inputs.fecha === "")
      return alert("Por favor, completa al menos la fecha");

    // Agregamos el nuevo registro al array del estado
    setMaquina([...maquina, inputs]);

    // Limpiamos los campos
    setInputs({
      fecha: "",
      mantenimiento: "",
      repuestos: "",
      observaciones: "",
      prfecha: "",
      operario: "",
    });
  };

  const handleHeaderClick = (e) => {
    const th = e.target.closest("th");
    if (th) {
      alert("Columna seleccionada: " + th.innerText);
    }
  };

  return (
    <>
      <div className="barraSuperior">
        <Link to="/maquinasen/maquinasen" className="back">
          REGRESAR
        </Link>
      </div>
      <div className="conten">
        <h1>PROYECTO TEXTIL</h1>
        <h3>DESON210</h3>

        <div className="contenTabla">
          <p>
            En esta seccion vemos cada una de las maquinas de manera individual
          </p>
          <table className="table">
            <thead>
              <tr onClick={handleHeaderClick} style={{ cursor: "pointer" }}>
                <th scope="col">FECHA QUE SE REALIZO</th>
                <th scope="col">TIPO DE MANTENIMIENTO</th>
                <th scope="col">REPUESTOS QUE SE CAMBIARON</th>
                <th scope="col">OBSERVACIONES</th>
                <th scope="col">PROXIMA FECHA</th>
                <th scope="col">OPERARIO</th>
              </tr>
            </thead>
            <tbody>
              {maquina.map((item, index) => (
                <tr key={index}>
                  <th
                    scope="row"
                    onClick={() => console.log(`Fila: ${index}`)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {item.fecha}
                  </th>
                  <td>{item.mantenimiento}</td>
                  <td>{item.repuestos}</td>
                  <td>{item.observaciones}</td>
                  <td>{item.prfecha}</td>
                  <td>{item.operario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SECCIÓN DEL FORMULARIO (Inyectado directamente aquí) */}
        <div className="contenInputs">
          <div className="inputs">
            <input
              type="text"
              name="fecha"
              placeholder="Fecha Actual"
              value={inputs.fecha}
              onChange={handleChange}
            />
            <input
              type="text"
              name="mantenimiento"
              placeholder="Tipo de mantenimiento"
              value={inputs.mantenimiento}
              onChange={handleChange}
            />
            <input
              type="text"
              name="repuestos"
              placeholder="Repuestos"
              value={inputs.repuestos}
              onChange={handleChange}
            />
            <input
              type="text"
              name="observaciones"
              placeholder="Observaciones"
              value={inputs.observaciones}
              onChange={handleChange}
            />
            <input
              type="text"
              name="prfecha"
              placeholder="Proxima fecha"
              value={inputs.prfecha}
              onChange={handleChange}
            />
            <input
              type="text"
              name="operario"
              placeholder="Operario"
              value={inputs.operario}
              onChange={handleChange}
            />
          </div>
          <div className="contenGuardar">
            <button className="guardar" onClick={guardarRegistro}>
              GUARDAR DATOS
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Deson210;
