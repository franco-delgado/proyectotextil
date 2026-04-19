import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../../supabaseClient";
import "./deson210.css";

// Eliminé la función externa y moví todo a Deson210 para que la tabla y el form compartan datos
function Deson210() {
  // 1. ESTADO DE LA PLANILLA (Aquí se guardan los datos que ves en la tabla)
  const [miMaquina, setMiMaquina] = useState([
    /*  {
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
    },*/
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

  useEffect(() => {
    fetchMiMaquina();
  }, []);

  async function fetchMiMaquina() {
    try {
      const { data, error } = await supabase
        .from("maquina_individual")
        .select("*");
      //        .order("id", { ascending: true });

      if (error) throw error;
      setMiMaquina(data || []);
    } catch (error) {
      console.error("Error al cargar datos:", error.message);
    }
  }

  // 3. FUNCIÓN PARA CAPTURAR CAMBIOS (Corregido: ahora usa 'inputs')
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // 4. FUNCIÓN PARA GUARDAR Y ACTUALIZAR PLANILLA
  const guardarRegistro = async () => {
    if (inputs.fecha.trim() === "") {
      return alert("Por favor, completa al menos la fecha");
    }

    try {
      // Creamos un objeto limpio con solo los datos que la tabla espera
      const datosAGuardar = {
        fecha: inputs.fecha,
        mantenimiento: inputs.mantenimiento,
        repuestos: inputs.repuestos,
        observaciones: inputs.observaciones,
        prfecha: inputs.prfecha,
        operario: inputs.operario,
      };

      const { error } = await supabase
        .from("maquina_individual")
        .insert([datosAGuardar]); // Enviamos el objeto limpio

      if (error) throw error;

      alert("¡Datos guardados con éxito!");
      await fetchMiMaquina();

      // Limpiar inputs...
      setInputs({
        fecha: "",
        mantenimiento: "",
        repuestos: "",
        observaciones: "",
        prfecha: "",
        operario: "",
      });
    } catch (error) {
      // ESTO ES CLAVE: Aquí verás exactamente qué columna falla
      console.error("Error detallado:", error);
      alert("Error al guardar: " + error.message);
    }
  };

  // --- 5. ELIMINAR UNA SOLA FILA ---
  const eliminarMaquina = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar esta máquina?",
    );
    if (confirmar) {
      try {
        const { error } = await supabase
          .from("maquina_individual")
          .delete()
          .eq("id", id); // Filtra por el ID único de la fila

        if (error) throw error;

        // Actualizar el estado local para que desaparezca de la vista inmediatamente
        setMiMaquina(miMaquina.filter((maquina) => maquina.id !== id));
      } catch (error) {
        alert("Error al eliminar: " + error.message);
      }
    }
  };

  /*  const handleHeaderClick = (e) => {
    const th = e.target.closest("th");
    if (th) {
      alert("Columna seleccionada: " + th.innerText);
    }
  };*/

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

        <div className="contenTablaDESO">
          <p>
            En esta seccion vemos cada una de las maquinas de manera individual
          </p>
          <table className="tableDESON">
            <thead>
              <tr>
                <th scope="col">FECHA QUE SE REALIZO</th>
                <th scope="col">TIPO DE MANTENIMIENTO</th>
                <th scope="col">REPUESTOS QUE SE CAMBIARON</th>
                <th scope="col">OBSERVACIONES</th>
                <th scope="col">PROXIMA FECHA</th>
                <th scope="col">OPERARIO</th>
                <th style={{ textAlign: "center" }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {miMaquina.map((item) => (
                <tr key={item.id}>
                  <th
                    scope="row"
                    onClick={() =>
                      console.log(`Fila: ${item.id}, Fecha: ${item.fecha}`)
                    }
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {item.fecha}
                  </th>
                  <td>{item.mantenimiento}</td>
                  <td>{item.repuestos}</td>
                  <td>{item.observaciones}</td>
                  <td>{item.prfecha}</td>
                  <td>{item.operario}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() => eliminarMaquina(item.id)}
                      className="btnEliminar"
                    >
                      Eliminar
                    </button>
                  </td>
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
