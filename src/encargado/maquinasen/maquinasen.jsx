import React, { useState, useEffect } from "react"; // 1. Agregamos useEffect
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient"; // 2. Importamos el cliente (ajusta la ruta si es necesario)

import "./maquinasen.css";
import Deson210 from "./maquinasIndividuales/DESON210/DESON210";

// --- 1. Definición del Portal ---
const ModalPortal = ({ children, onClose }) => {
  return createPortal(
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>
          Cerrar Ventana ×
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

function Maquinasen() {
  // Estado para la lista de máquinas (ahora empieza vacío)
  const [misMaquinas, setMisMaquinas] = useState([]);

  const [inputs, setInputs] = useState({
    marca: "",
    modelo: "",
    serie: "",
    Ninventario: "",
    estado: "",
    lugar: "",
    observacion: "",
    tipo: "",
  });

  const [modalAbierto, setModalAbierto] = useState(false);
  const navigate = useNavigate();

  // --- 3. CARGAR DATOS DESDE SUPABASE ---
  useEffect(() => {
    fetchMaquinas();
  }, []);

  async function fetchMaquinas() {
    const { data, error } = await supabase
      .from("maquinas") // Asegúrate de que tu tabla en Supabase se llame "maquinas"
      .select("*");

    if (error) {
      console.error("Error cargando máquinas:", error);
    } else {
      setMisMaquinas(data || []);
    }
  }

  const handleChangeMaquina = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // --- 4. GUARDAR EN SUPABASE ---
  const guardarMaquina = async () => {
    if (inputs.marca === "" || inputs.modelo === "")
      return alert("Por favor, completa al menos la marca y el modelo");

    // Insertamos en la base de datos real
    const { error } = await supabase.from("maquinas").insert([inputs]);

    if (error) {
      alert("Error al guardar en la base de datos");
      console.error(error);
    } else {
      // Si se guardó bien, refrescamos la lista y limpiamos inputs
      fetchMaquinas();
      setInputs({
        marca: "",
        modelo: "",
        serie: "",
        Ninventario: "",
        estado: "",
        lugar: "",
        observacion: "",
        tipo: "",
      });
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
        <button onClick={() => navigate("../encargado")}>Regresar</button>
      </div>

      <div className="conten">
        <h1>PROYECTO TEXTIL</h1>
        <div className="table-container">
          <p>
            En esta sección vemos cada una de las máquinas (Datos en Tiempo
            Real)
          </p>
          <table className="table table-hover">
            <thead>
              <tr onClick={handleHeaderClick} style={{ cursor: "pointer" }}>
                <th scope="col">MARCA</th>
                <th scope="col">MODELO</th>
                <th scope="col">SERIE</th>
                <th scope="col">N° INVENTARIO</th>
                <th scope="col">ESTADO</th>
                <th scope="col">LUGAR FISICO</th>
                <th scope="col">OBSERVACIONES</th>
                <th scope="col">TIPO DE MAQUINA</th>
              </tr>
            </thead>
            <tbody>
              {misMaquinas.map((item, index) => (
                <tr key={item.id || index}>
                  {" "}
                  {/* Usamos el id de la DB si existe */}
                  <th
                    scope="row"
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => {
                      if (item.marca === "DESON") {
                        navigate("/maquinasen/maquinasIndividuales/DESON210");
                      } else {
                        console.log("Ruta no definida para este modelo");
                      }
                    }}
                  >
                    {item.marca}
                  </th>
                  <td>{item.modelo}</td>
                  <td>{item.serie}</td>
                  <td>{item.Ninventario}</td>
                  <td>{item.estado}</td>
                  <td>{item.lugar}</td>
                  <td>{item.observacion}</td>
                  <td>{item.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {modalAbierto && (
            <ModalPortal onClose={() => setModalAbierto(false)}>
              <Deson210 />
            </ModalPortal>
          )}
        </div>

        {/* Sección de Inputs para cargar nuevas máquinas */}
        <div className="contenInputs">
          <div className="inputs">
            <input
              type="text"
              name="marca"
              placeholder="marca"
              value={inputs.marca}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="modelo"
              placeholder="modelo"
              value={inputs.modelo}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="serie"
              placeholder="serie"
              value={inputs.serie}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="Ninventario"
              placeholder="Ninventario"
              value={inputs.Ninventario}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="estado"
              placeholder="estado"
              value={inputs.estado}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="lugar"
              placeholder="lugar"
              value={inputs.lugar}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="observacion"
              placeholder="observacion"
              value={inputs.observacion}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="tipo"
              placeholder="tipo"
              value={inputs.tipo}
              onChange={handleChangeMaquina}
            />
          </div>
          <div className="contenGuardar">
            <button className="guardar" onClick={guardarMaquina}>
              GUARDAR DATOS EN LA NUBE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Maquinasen;

// Estilos del Modal (se mantienen iguales)
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "95%",
    height: "90%",
    borderRadius: "12px",
    overflowY: "auto",
    position: "relative",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    padding: "20px",
  },
  closeBtn: {
    padding: "8px 16px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
