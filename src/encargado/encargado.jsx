import { Link } from "react-router-dom";
import "./encargado.css";

function Encargado() {
  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div
        className="card shadow-lg p-5 text-center"
        style={{ width: "400px" }}
      >
        <h1>PROYECTO TEXTIL</h1>
        <p>
          En esta sección el encargado tiene la opción de dirigirse a las
          máquinas o a revisar el stock de repuestos disponibles.
        </p>
        <div className="btn-group" role="group">
          {/* Este Link ahora apunta a /maquinas que definiremos en App.jsx */}
          <Link to="/maquinas" className="btn btn-primary">
            MÁQUINAS
          </Link>
          <Link to="/repuestos" className="btn btn-primary">
            REPUESTOS
          </Link>
        </div>
        <div className="mt-3">
          <Link to="/" className="btn btn-link text-muted">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Encargado;
