import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import "./maquinas.css";
// Si vas a usar navegación por ruta, quizás no necesites el import de Individualesop aquí,
// a menos que lo uses dentro del ModalPortal.

const ModalPortal = ({ children, onClose }) => {
  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>
          Cerrar Ventana ×
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

function Maquinas() {
  const navigate = useNavigate();
  const [misMaquinas, setMisMaquinas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    fetchMaquinas();
  }, []);

  async function fetchMaquinas() {
    try {
      const { data, error } = await supabase
        .from("proyecto_textil") // Tabla principal de máquinas
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      setMisMaquinas(data || []);
    } catch (error) {
      console.error("Error al cargar datos:", error.message);
    }
  }

  return (
    <>
      <div className="barraSuperior">
        {/* Cambié la ruta de regreso para que sea relativa o directa al panel de operario */}
        <button onClick={() => navigate(-1)}>Regresar</button>
      </div>

      <div className="conten">
        <h1>PROYECTO TEXTIL - OPERARIOS</h1>

        <div className="table-container">
          <p>Gestión de Maquinaria en Tiempo Real</p>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>MARCA (VER DETALLE)</th>
                <th>MODELO</th>
                <th>SERIE</th>
                <th>N° INV.</th>
                <th>ESTADO</th>
                <th>LUGAR</th>
                <th>TIPO</th>
              </tr>
            </thead>
            <tbody>
              {misMaquinas.map((item) => (
                <tr key={item.id}>
                  <th
                    scope="row"
                    style={{
                      cursor: "pointer",
                      color: "#007bff",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      // IMPORTANTE: Esta ruta debe ser la misma que usas en el panel de encargado
                      // para que ambos vean el mismo historial.
                      navigate(`/maquinas/maquinasIndividuales/${item.marca}`);
                    }}
                  >
                    {item.marca}
                  </th>
                  <td>{item.modelo}</td>
                  <td>{item.serie}</td>
                  <td>{item.Ninventario}</td>
                  <td>{item.estado}</td>
                  <td>{item.lugar}</td>
                  <td>{item.tipo_maquina}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Maquinas;
