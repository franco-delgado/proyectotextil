import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import "./maquinas.css";
import Deson210 from "./maquinasIndividuales/DESON210/DESON210"; // Asegúrate que la ruta del import sea correcta

// --- 1. Definición del Portal (Fuera del componente principal) ---
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

  // --- ESTADOS ---
  const [misMaquinas, setMisMaquinas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [inputs, setInputs] = useState({
    marca: "",
    modelo: "",
    serie: "",
    Ninventario: "",
    estado: "",
    lugar: "",
    observacion: "",
    tipo_maquina: "",
  });

  // --- 2. CARGAR DATOS AL INICIAR ---
  useEffect(() => {
    fetchMaquinas();
  }, []);

  async function fetchMaquinas() {
    try {
      const { data, error } = await supabase
        .from("proyecto_textil")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      setMisMaquinas(data || []);
    } catch (error) {
      console.error("Error al cargar datos:", error.message);
    }
  }

  // --- 3. MANEJO DE CAMBIOS EN INPUTS ---
  const handleChangeMaquina = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="barraSuperior">
        <button onClick={() => navigate("../encargado")}>Regresar</button>
      </div>

      <div className="conten">
        <h1>PROYECTO TEXTIL</h1>

        <div className="table-container">
          <p>Gestión de Maquinaria en Tiempo Real</p>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>MARCA</th>
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
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => {
                      if (item.marca?.toUpperCase() === "DESON") {
                        navigate("/maquinas/maquinasIndividuales/DESON210");
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
                  <td>{item.tipo_maquina}</td>
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
      </div>
    </>
  );
}

export default Maquinas;

// PEGA ESTO AL FINAL DE TU ARCHIVO maquinas.jsx (fuera de cualquier función)
