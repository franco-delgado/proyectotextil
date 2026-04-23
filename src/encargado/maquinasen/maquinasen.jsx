import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import "./maquinasen.css";
//import Deson210 from "./maquinasIndividuales/DESON210/DESON210";

import individuales from "./maquinasIndividuales";

// --- 1. Definición del Portal para Modales ---
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

function Maquinasen() {
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

  // --- 4. GUARDAR NUEVA MÁQUINA ---
  const guardarMaquina = async () => {
    if (inputs.marca.trim() === "" || inputs.modelo.trim() === "") {
      return alert("Por favor, completa al menos la marca y el modelo");
    }

    try {
      const { error } = await supabase.from("proyecto_textil").insert([inputs]);

      if (error) throw error;

      // Refrescar lista y limpiar formulario
      await fetchMaquinas();
      setInputs({
        marca: "",
        modelo: "",
        serie: "",
        Ninventario: "",
        estado: "",
        lugar: "",
        observacion: "",
        tipo_maquina: "",
      });
    } catch (error) {
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
          .from("proyecto_textil")
          .delete()
          .eq("id", id); // Filtra por el ID único de la fila

        if (error) throw error;

        // Actualizar el estado local para que desaparezca de la vista inmediatamente
        setMisMaquinas(misMaquinas.filter((maquina) => maquina.id !== id));
      } catch (error) {
        alert("Error al eliminar: " + error.message);
      }
    }
  };

  // --- 6. VACIAR TODA LA TABLA ---
  const limpiarTablaBD = async () => {
    const confirmar = window.confirm(
      "¿ESTÁS SEGURO? Se borrarán TODOS los datos.",
    );
    if (confirmar) {
      try {
        const { error } = await supabase
          .from("proyecto_textil")
          .delete()
          .neq("id", 0);

        if (error) throw error;
        setMisMaquinas([]);
      } catch (error) {
        alert("Error al vaciar: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="barraSuperior">
        <button onClick={() => navigate("../encargado")}>Regresar</button>
      </div>

      <div className="conten">
        <h1>PROYECTO TEXTIL</h1>

        <div className="tableContainer">
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
                <th style={{ textAlign: "center" }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {misMaquinas.map((item) => (
                <tr key={item.id}>
                  <th
                    scope="row"
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => {
                      // Eliminamos el IF y usamos el valor de item.marca (o item.id si prefieres)
                      // Usamos Template Literals (las comillas invertidas ``) para insertar la variable
                      navigate(
                        `/maquinasen/maquinasIndividuales/${item.marca}`,
                      );
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

          {modalAbierto && (
            <ModalPortal onClose={() => setModalAbierto(false)}>
              <individuales />
            </ModalPortal>
          )}
        </div>

        {/* Formulario de Carga */}
        <div className="contenInputsen">
          <div className="inputsen">
            <input
              type="text"
              name="marca"
              placeholder="Marca"
              value={inputs.marca}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="modelo"
              placeholder="Modelo"
              value={inputs.modelo}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="serie"
              placeholder="Serie"
              value={inputs.serie}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="Ninventario"
              placeholder="N° Inv"
              value={inputs.Ninventario}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              value={inputs.estado}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="lugar"
              placeholder="Lugar"
              value={inputs.lugar}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="observacion"
              placeholder="Observación"
              value={inputs.observacion}
              onChange={handleChangeMaquina}
            />
            <input
              type="text"
              name="tipo_maquina"
              placeholder="Tipo"
              value={inputs.tipo_maquina}
              onChange={handleChangeMaquina}
            />
          </div>

          <div className="contenGuardar">
            <button className="guardar" onClick={guardarMaquina}>
              GUARDAR DATOS
            </button>

            <button className="btnVaciar" onClick={limpiarTablaBD}>
              VACIAR BASE DE DATOS
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Maquinasen;
