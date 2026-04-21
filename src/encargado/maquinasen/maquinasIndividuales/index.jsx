import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import "./DESON210/deson210.css";

function Individuales() {
  const { nombreMaquina } = useParams();

  const [miMaquina, setMiMaquina] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({
    fecha: "",
    mantenimiento: "",
    repuestos: "",
    observaciones: "",
    prfecha: "",
    operario: "",
  });

  // Solo cargamos el historial al entrar
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

      // Si el error es porque la columna no existe, revisa el Dashboard de Supabase
      if (error) throw error;

      setMiMaquina(data || []);
    } catch (error) {
      console.error("Error al cargar historial:", error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const guardarRegistro = async () => {
    // Validación mínima
    if (!inputs.fecha.trim() || !inputs.operario.trim()) {
      return alert("Por favor, completa al menos la fecha y el operario.");
    }

    try {
      // Aquí es donde ocurre la magia:
      // Se guarda el nombre de la máquina JUNTO con los inputs del formulario
      const datosAGuardar = {
        ...inputs,
        nombre_maquina: nombreMaquina,
      };

      const { error } = await supabase
        .from("maquina_individual")
        .insert([datosAGuardar]);

      if (error) throw error;

      alert(`¡Registro guardado para la máquina ${nombreMaquina}!`);

      // Limpiamos los campos para un nuevo ingreso
      setInputs({
        fecha: "",
        mantenimiento: "",
        repuestos: "",
        observaciones: "",
        prfecha: "",
        operario: "",
      });

      // Refrescamos la tabla para ver el nuevo registro
      await fetchMiMaquina();
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("No se pudo guardar: " + error.message);
    }
  };

  const eliminarMaquina = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      try {
        const { error } = await supabase
          .from("maquina_individual")
          .delete()
          .eq("id", id);

        if (error) throw error;
        setMiMaquina(miMaquina.filter((m) => m.id !== id));
      } catch (error) {
        alert("Error al eliminar: " + error.message);
      }
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
        <h3 style={{ textTransform: "uppercase" }}>Máquina: {nombreMaquina}</h3>

        <div className="contenTablaDESO">
          <p>Historial de mantenimiento</p>
          <table className="tableDESON">
            <thead>
              <tr>
                <th>FECHA</th>
                <th>MANTENIMIENTO</th>
                <th>REPUESTOS</th>
                <th>OBSERVACIONES</th>
                <th>PRÓX. FECHA</th>
                <th>OPERARIO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">Cargando...</td>
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
                    <td>
                      <button
                        onClick={() => eliminarMaquina(item.id)}
                        className="btnEliminar"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    No hay registros previos para esta máquina. Ingrese el
                    primero abajo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
    </>
  );
}

export default Individuales;
