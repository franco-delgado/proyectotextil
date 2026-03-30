import "./tareasOperario.css";

import { useNavigate } from "react-router-dom";

function TareasOperario() {
  const navigate = useNavigate();
  return (
    <>
      <div className="barraSuperior">
        <button onClick={() => navigate(-1)}>Regresar</button>
      </div>
      <table className="table">
        <thead>
          <tr className="tableHead">
            <th scope="col">MAQUINA</th>
            <th className="centerColum" scope="col">
              DETALLES DE TAREA
            </th>
            <th className="leftColum" scope="col">
              BOTONES
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="tableBody">
            <th scope="row">1</th>
            <td className="centerColum">
              Sistema de Tensión: Limpieza profunda de los discos de tensión
              superior; se detectaron restos de hilo y pelusa que causaban el
              corte inesperado del hilo.
            </td>
            <td className="leftColum">
              <button className="btn btn-primary">Iniciar</button>
              <button className="btn btn-danger">Finalizar</button>
            </td>
          </tr>
          <tr className="tableBody">
            <th scope="row">2</th>
            <td className="centerColum">
              Reemplazo de Piezas: * Cambio de la placa de aguja (estaba
              picada/rayada por impactos previos).
            </td>
            <td className="leftColum">
              <button className="btn btn-primary">Iniciar</button>
              <button className="btn btn-danger">Finalizar</button>
            </td>
          </tr>
          <tr className="tableBody">
            <th scope="row">3</th>
            <td className="centerColum">
              Lubricación y Limpieza: Limpieza del bloque de transporte y
              lubricación de los ejes principales con aceite de alta viscosidad.
            </td>
            <td className="leftColum">
              <button className="btn btn-primary">Iniciar</button>
              <button className="btn btn-danger">Finalizar</button>
            </td>
          </tr>
        </tbody>
      </table>
      ;
    </>
  );
}

export default TareasOperario;
