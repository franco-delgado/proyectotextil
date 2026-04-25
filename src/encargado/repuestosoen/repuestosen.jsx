import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import "./repuestos.css";

function Repuestos() {
  const [repuestos, setRepuestos] = useState([]);
  const [inputs, setInputs] = useState({
    nombre: "",
    codigo: "",
    tipo: "",
    cantidad: "",
    marca: "",
  });
  // --- 2. FUNCIÓN PARA OBTENER DATOS (READ) ---
  const fetchRepuestos = async () => {
    const { data, error } = await supabase
      .from("repuestos") // Nombre de tu tabla en Supabase
      .select("*");

    if (error) {
      console.error("Error cargando repuestos:", error);
    } else {
      setRepuestos(data);
    }
  };
  // Cargar los datos al iniciar el componente
  useEffect(() => {
    fetchRepuestos();
  }, []);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const guardarRegistro = async () => {
    if (inputs.nombre === "" || inputs.codigo === "")
      return alert("Por favor, completa los campos");

    // Insertamos en la base de datos
    const { data, error } = await supabase
      .from("repuestos")
      .insert([
        {
          nombre: inputs.nombre,
          codigo: inputs.codigo,
          tipo: inputs.tipo,
          cantidad: parseInt(inputs.cantidad) || 0, // Aseguramos que sea número si tu DB lo requiere
          marca: inputs.marca,
        },
      ])
      .select(); // El .select() devuelve el objeto creado

    if (error) {
      alert("Hubo un error al guardar: " + error.message);
    } else {
      // Actualizamos la tabla localmente con el nuevo dato sin recargar la página
      setRepuestos([...repuestos, ...data]);

      // Limpiamos los inputs
      setInputs({
        nombre: "",
        codigo: "",
        tipo: "",
        cantidad: "",
        marca: "",
      });
      alert("Registro guardado con éxito");
    }
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
        <p>En esta seccion vemos cada una de las maquinas</p>
        <div className="tableContainer">
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
                <tr key={item.id || index}>
                  <th
                    scope="row"
                    onClick={() => console.log(`Clic en: ${item.nombre}`)}
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
      </div>
    </>
  );
}

export default Repuestos;
