import React, { useState } from "react"; // Agregamos { useState } aquí
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./maquinas.css";
import Deson210 from "./maquinasIndividuales/DESON210/DESON210";

// --- 1. Definición del Portal (Fuera del componente principal) ---
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

const misMaquinas = [];
misMaquinas[1] = {
  marca: "DESON",
  modelo: "DS-3020H",
  serie: "210",
  Ninventario: "1A",
  estado: "EN PRODUCCION",
  lugar: "LIEA",
  observacion: "EXCELENTE",
  tipo: "PLANA",
};
misMaquinas[2] = {
  marca: "CONSEW",
  modelo: "DS-3066J",
  serie: "410",
  Ninventario: "8B",
  estado: "EN MANTENIMIENTO",
  lugar: "LIEA-J",
  observacion: "--------",
  tipo: "CINTURERA",
};
misMaquinas[3] = {
  marca: "DESON",
  modelo: "DS-3020H",
  serie: "210",
  Ninventario: "1A",
  estado: "EN PRODUCCION",
  lugar: "LIEA",
  observacion: "EXCELENTE",
  tipo: "PLANA",
};
misMaquinas[4] = {
  marca: "DESON",
  modelo: "DS-3020H",
  serie: "210",
  Ninventario: "1A",
  estado: "EN PRODUCCION",
  lugar: "LIEA",
  observacion: "EXCELENTE",
  tipo: "PLANA",
};

function Maquinas() {
  const [modalAbierto, setModalAbierto] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      <div className="barraSuperior">
        <button onClick={() => navigate(-1)}>Regresar</button>
      </div>
      ;
      <div className="conten">
        <h1>PROYECTO TEXTIL</h1>
        <div className="table-container">
          <p>En esta seccion vemos cada una de las maquinas</p>
          <table className="table table-hover">
            <thead>
              <tr>
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
                <tr key={index}>
                  <th
                    scope="row"
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => {
                      // Validamos la marca
                      if (item.marca === "DESON") {
                        setModalAbierto(true); // ACTIVAMOS LA VENTANA
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

          {/* Lógica del Portal: Si mostrarDetalle es true, abre la ventana */}
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
  header: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#f8f9fa",
    position: "sticky",
    top: 0,
    zIndex: 100,
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
