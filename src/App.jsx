import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Encargado from "./encargado/encargado";
import Operario from "./operario/operario";
import Maquinas from "./maquinas/maquinas"; // Asegúrate que la ruta del import sea correcta
import Repuestos from "./repuestos/repuestos";
import TareasOperario from "./tareasOperario/tareasOperario";

function App() {
  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <Routes>
        {/* VISTA PRINCIPAL (EL HOME) */}
        <Route
          path="/"
          element={
            <div
              className="card shadow-lg p-5 text-center"
              style={{ width: "400px" }}
            >
              <h1 className="mb-4 text-primary fw-bold">PROYECTO TEXTIL</h1>
              <p>En esta seccion debe elegir el usuario correspondiente</p>
              <div className="d-grid gap-3">
                {/* BOTÓN ENCARGADO MODIFICADO */}
                <Link
                  to="/encargado"
                  className="btn btn-primary btn-lg shadow-sm"
                >
                  ENCARGADO
                </Link>

                <Link
                  to="/operario"
                  className="btn btn-outline-secondary btn-lg shadow-sm"
                >
                  OPERARIO
                </Link>
              </div>
              <footer className="mt-4 text-muted small">
                Sistema de Gestión v1.0
              </footer>
            </div>
          }
        />

        {/* RUTA PARA LA VENTANA ENCARGADO */}
        <Route path="/encargado" element={<Encargado />} />
        {/* RUTA PARAOPERARIO */}
        <Route path="/operario" element={<Operario />} />
        {/* Pantalla de la sección máquinas */}
        <Route path="/maquinas" element={<Maquinas />} />
        {/* Pantalla de la sección repuestos */}
        <Route path="/repuestos" element={<Repuestos />} />
        <Route path="/tareasOperario" element={<TareasOperario />} />
      </Routes>
    </div>
  );
}

export default App;
