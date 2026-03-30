import { Link } from "react-router-dom";
import "./repuestos.css";

const misRepuestos = [];
misRepuestos[1] = {
  nombre: "DESON",
  tipo: "DS-3020H",
  cantidad: "210",
  marca: "1A",
};
misRepuestos[2] = {
  nombre: "DESON",
  tipo: "DS-3020H",
  cantidad: "210",
  marca: "1A",
};
misRepuestos[3] = {
  nombre: "DESON",
  tipo: "DS-3020H",
  cantidad: "210",
  marca: "1A",
};

function Repuestos() {
  return (
    <>
      <div className="barraSuperior">
        <Link to="/encargado" className="back">
          REGRESAR
        </Link>
      </div>
      <div className="conten">
        <h1>PROYECTO TEXTIL</h1>
        <div className="table-container">
          <p>En esta seccion vemos cada una de las maquinas</p>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">NOMBRE</th>
                <th scope="col">tipo</th>
                <th scope="col">cantidad</th>
                <th scope="col">MARCA</th>
              </tr>
            </thead>
            <tbody>
              {misRepuestos.map((item, index) => (
                <tr key={(item = index)}>
                  <th
                    scope="row"
                    /* Usamos index + 1 para que la alerta muestre 1, 2, 3... correlativamente */
                    onClick={() =>
                      console.log(
                        `Clic en la fila número: ${index} (nombre: ${item.nombre})`,
                      )
                    }
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {/* Aquí mostramos la nombre, el ID existe en la lógica pero no se ve */}
                    {item.nombre}
                  </th>
                  <td>{item.tipo}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Repuestos;
