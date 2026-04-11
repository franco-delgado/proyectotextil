import "./tareasOperario.css";

import { useNavigate } from "react-router-dom";

function TareasOperario() {
  const navigate = useNavigate();
  return (
    <>
      <div className="barraSuperior">
        <button onClick={() => navigate(-1)}>Regresar</button>
      </div>

      <div className="conten">
        <h1>PROYECTO TEXTIL</h1>
        <div className="table-container">
          <p>En esta seccion vemos cada una de las maquinas</p>
          <table className="table">
            <thead>
              <tr className="lineHead">
                <th scope="col">MAQUINA</th>
                <th className="centerColum" scope="col">
                  DETALLES DE TAREA
                </th>
                <th className=" rightColum" scope="col">
                  BOTONES
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="lineBody">
                <th className="leftColum" scope="row">
                  1
                </th>
                <td className="centerColum">
                  Sistema de Tensión: Limpieza profunda de los discos de tensión
                  superior; se detectaron restos de hilo y pelusa que causaban
                  el corte inesperado del hilo.
                </td>
                <td className=" rightColum">
                  <button className="btn btn-primary">COMPLETADA</button>
                </td>
              </tr>
              <tr className="lineBody">
                <th className="leftColum" scope="row">
                  2
                </th>
                <td className="centerColum">
                  Reemplazo de Piezas: * Cambio de la placa de aguja (estaba
                  picada/rayada por impactos previos).
                </td>
                <td className=" rightColum">
                  <button className="btn btn-primary">COMPLETADA</button>
                </td>
              </tr>
              <tr className="lineBody">
                <th className="leftColum" scope="row">
                  3
                </th>
                <td className="centerColum">
                  Lubricación y Limpieza: Limpieza del bloque de transporte y
                  lubricación de los ejes principales con aceite de alta
                  viscosidad.
                </td>
                <td className=" rightColum">
                  <button className="btn btn-primary">COMPLETADA</button>
                </td>
              </tr>
            </tbody>
          </table>
          ;
        </div>
      </div>
    </>
  );
}

export default TareasOperario;
