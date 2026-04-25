import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import "./deson210.css";

function Individualesop() {
  const { nombreMaquina } = useParams();

  const [miMaquina, setMiMaquina] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- NUEVOS ESTADOS PARA AUTOCOMPLETADO ---
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSug, setMostrarSug] = useState(false);

  const [inputs, setInputs] = useState({
    fecha: "",
    mantenimiento: "",
    repuestos: "",
    observaciones: "",
    prfecha: "",
    operario: "",
  });

  useEffect(() => {
    if (nombreMaquina) {
      fetchMiMaquina();
    }
  }, [nombreMaquina]);

  async function fetchMiMaquina() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("maquina_individual")
        .select("*")
        .eq("nombre_maquina", nombreMaquina)
        .order("id", { ascending: false });

      if (error) throw error;
      setMiMaquina(data || []);
    } catch (error) {
      console.error("Error al cargar historial:", error.message);
    } finally {
      setLoading(false);
    }
  }

  // --- HANDLE CHANGE ADAPTADO CON BUSQUEDA ---
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });

    // Lógica de autocompletado para el campo 'repuestos'
    if (name === "repuestos") {
      if (value.trim().length > 1) {
        const { data, error } = await supabase
          .from("repuestos") // Tu tabla de repuestos general
          .select("nombre")
          .ilike("nombre", `%${value}%`)
          .limit(5);

        if (!error && data) {
          setSugerencias(data);
          setMostrarSug(true);
        }
      } else {
        setMostrarSug(false);
      }
    }
  };

  const seleccionarSugerencia = (nombre) => {
    setInputs({ ...inputs, repuestos: nombre });
    setMostrarSug(false);
  };

  const guardarRegistro = async () => {
    if (
      !inputs.fecha.trim() ||
      !inputs.operario.trim() ||
      !inputs.repuestos.trim()
    ) {
      return alert(
        "Por favor, completa al menos la fecha, el operario y los repuestos.",
      );
    }

    try {
      const datosAGuardar = {
        ...inputs,
        nombre_maquina: nombreMaquina,
      };

      const { error: insertError } = await supabase
        .from("maquina_individual")
        .insert([datosAGuardar]);

      if (insertError) throw insertError;

      // 2. DESCONTAR EL STOCK EN LA TABLA REPUESTOS
      // Buscamos el repuesto por nombre y restamos 1 a la columna 'cantidad'
      const { data: repuestoData, error: fetchError } = await supabase
        .from("repuestos")
        .select("cantidad")
        .eq("nombre", inputs.repuestos)
        .single();
      if (fetchError) {
        console.error("No se encontró el repuesto para descontar stock");
      } else {
        const nuevaCantidad = parseInt(repuestoData.cantidad) - 1;

        if (nuevaCantidad < 0) {
          alert("Aviso: El stock de este repuesto ha quedado en negativo.");
        }

        const { error: updateError } = await supabase
          .from("repuestos")
          .update({ cantidad: nuevaCantidad })
          .eq("nombre", inputs.repuestos);

        if (updateError)
          console.error("Error al actualizar stock:", updateError.message);
      }

      alert(`¡Registro guardado para la máquina ${nombreMaquina}!`);

      setInputs({
        fecha: "",
        mantenimiento: "",
        repuestos: "",
        observaciones: "",
        prfecha: "",
        operario: "",
      });

      await fetchMiMaquina();
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("No se pudo guardar: " + error.message);
    }
  };

  return (
    <>
      <div className="barraSuperior">
        <Link to="/maquinas/maquinasop" className="back">
          REGRESAR
        </Link>
      </div>
      <div className="contenIn">
        <h1>PROYECTO TEXTIL</h1>
        <h3 style={{ textTransform: "uppercase" }}>Máquina: {nombreMaquina}</h3>
        <p>Historial de mantenimiento</p>

        <div className="contenTablaDESO">
          <table className="tableDESON">
            <thead>
              <tr>
                <th>FECHA</th>
                <th>MANTENIMIENTO</th>
                <th>REPUESTOS</th>
                <th>OBSERVACIONES</th>
                <th>PRÓX. FECHA</th>
                <th>OPERARIO</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">Cargando...</td>
                </tr>
              ) : miMaquina.length > 0 ? (
                miMaquina.map((item) => (
                  <tr key={item.id}>
                    <td style={{ color: "blue" }}>{item.fecha}</td>
                    <td>{item.mantenimiento}</td>
                    <td>{item.repuestos}</td>
                    <td>{item.observaciones}</td>
                    <td>{item.prfecha}</td>
                    <td>{item.operario}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No hay registros previos.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="contenInputsIn">
            <div className="inputsIn">
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
                placeholder="Mantenimiento"
                value={inputs.mantenimiento}
                onChange={handleChange}
              />

              {/* CONTENEDOR RELATIVO PARA EL AUTOCOMPLETADO */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                }}
              >
                <input
                  type="text"
                  name="repuestos"
                  placeholder="Buscar Repuesto..."
                  value={inputs.repuestos}
                  onChange={handleChange}
                  onBlur={() => setTimeout(() => setMostrarSug(false), 250)}
                  autoComplete="off"
                />
                {mostrarSug && sugerencias.length > 0 && (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      zIndex: 100,
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {sugerencias.map((sug, i) => (
                      <li
                        key={i}
                        onClick={() => seleccionarSugerencia(sug.nombre)}
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                          borderBottom: "1px solid #eee",
                          color: "#333",
                          fontSize: "14px",
                          transition: "background 0.2s",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#f0f0f0")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "white")
                        }
                      >
                        {sug.nombre}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

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
                placeholder="Próxima fecha"
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
      </div>
    </>
  );
}

export default Individualesop;
