import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Esta función simula la selección de un perfil
  const handleLogin = (perfil) => {
    if (perfil === "encargado") {
      login({ nombre: "Franco", role: "encargado" });
      navigate("/encargado"); // Redirigir a su panel principal
    } else if (perfil === "operario") {
      login({ nombre: "Operario 1", role: "operario" });
      navigate("/operario");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Sistema de Gestión Textil</h1>
      <h3>Seleccione su perfil para ingresar:</h3>

      <div style={styles.buttonGroup}>
        <button
          onClick={() => handleLogin("encargado")}
          style={styles.buttonEncargado}
        >
          Ingresar como Encargado
        </button>

        <button
          onClick={() => handleLogin("operario")}
          style={styles.buttonOperario}
        >
          Ingresar como Operario
        </button>
      </div>
    </div>
  );
};

// Estilos básicos rápidos
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  buttonGroup: { display: "flex", gap: "20px", marginTop: "20px" },
  buttonEncargado: {
    padding: "15px 30px",
    backgroundColor: "#2c3e50",
    color: "white",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
  },
  buttonOperario: {
    padding: "15px 30px",
    backgroundColor: "#27ae60",
    color: "white",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
  },
};

export default Login;
