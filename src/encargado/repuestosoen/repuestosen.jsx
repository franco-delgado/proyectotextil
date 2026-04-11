import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./repuestos.css";

function Repuestos() {
  const [repuestos, setRepuestos] = useState([
    {
      nombre: "DESON",
      codigo: "12345",
      tipo: "DS-3020H",
      cantidad: "210",
      marca: "1A",
    },
    {
      nombre: "DESON",
      codigo: "12345",
      tipo: "DS-3020H",
      cantidad: "210",
      marca: "1A",
    },
    {
      nombre: "DESON",
      codigo: "12345",
      tipo: "DS-3020H",
      cantidad: "210",
      marca: "1A",
    },
  ]);

  const [inputs, setInputs] = useState({
    nombre: "",
    codigo: "",
    tipo: "",
    cantidad: "",
    marca: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const guardarRegistro = () => {
    if (inputs.nombre === "") return alert("Por favor, completa los campos");
    setRepuestos([...repuestos, inputs]);
    setInputs({
      nombre: "",
      codigo: "",
      tipo: "",
      cantidad: "",
      marca: "",
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
        <Link to="/encargado" className="back">
          REGRESAR
        </Link>
      </div>
      <div className="conten">
        <h1>PROYECTO TEXTIL</h1>
        <div className="table-container">
          <p>En esta seccion vemos cada una de las maquinas</p>
          <table className="table table-hover">
            <thead>
              <tr onClick={handleHeaderClick} style={{ cursor: "pointer" }}>
                <th scope="col">NOMBRE</th>
                <th scope="col">CODIGO</th>
                <th scope="col">tipo</th>
                <th scope="col">cantidad</th>
                <th scope="col">MARCA</th>
              </tr>
            </thead>
            <tbody>
              {repuestos.map((item, index) => (
                <tr key={index}>
                  <th
                    scope="row"
                    /* Usamos index + 1 para que la alerta muestre 1, 2, 3... correlativamente */
                    onClick={() =>
                      console.log(
                        `Clic en la fila número: ${index} (nombre: ${item.nombre})`,
                      )
                    }
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {/* Aquí mostramos la nombre, el ID existe en la lógica pero no se ve */}
                    {item.nombre}
                  </th>
                  <td>{item.codigo}</td>
                  <td>{item.tipo}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="contenInputs">
          <div className="inputs">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del repuesto"
              value={inputs.nombre}
              onChange={handleChange}
            />
            <input
              type="text"
              name="codigo"
              placeholder="Código"
              value={inputs.codigo}
              onChange={handleChange}
            />
            <input
              type="text"
              name="tipo"
              placeholder="Tipo"
              value={inputs.tipo}
              onChange={handleChange}
            />
            <input
              type="text"
              name="cantidad"
              placeholder="Cantidad"
              value={inputs.cantidad}
              onChange={handleChange}
            />
            <input
              type="text"
              name="marca"
              placeholder="Marca"
              value={inputs.marca}
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

export default Repuestos;
