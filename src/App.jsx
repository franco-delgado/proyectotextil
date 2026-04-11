import "./App.css";
/*NUEVO*/
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
// Importación de páginas
import Login from "./pages/login";
//ENCARGADO
import Encargado from "./encargado/encargado";
import Maquinasen from "./encargado/maquinasen/maquinasen";
import Repuestosen from "./encargado/repuestosoen/repuestosen";
import Deson210en from "./encargado/maquinasen/maquinasIndividuales/DESON210/DESON210";
//OPERARIO
import Operario from "./operario/operario";
import Maquinasop from "./operario/maquinas/maquinasop"; // Asegúrate que la ruta del import sea correcta
import Repuestosop from "./operario/repuestos/repuestos";
import TareasOperario from "./tareasOperario/tareasOperario";
import Deson210op from "./operario/maquinas/maquinasIndividuales/DESON210/DESON210";

/* FIN NUEVO */
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* 1. RUTA PÚBLICA */}
        <Route path="/" element={<Login />} />

        {/* 2. RUTAS EXCLUSIVAS PARA OPERARIOS */}
        <Route element={<ProtectedRoute allowedRoles={["operario"]} />}>
          <Route path="/operario" element={<Operario />} />
          <Route path="/TareasOperario" element={<TareasOperario />} />
          <Route path="/maquinas/maquinasop" element={<Maquinasop />} />
          <Route path="/repuestos/repuestos" element={<Repuestosop />} />
          {/* Si el operario también ve máquinas, se queda aquí */}
          <Route
            path="/maquinas/maquinasIndividuales/DESON210"
            element={<Deson210op />}
          />
        </Route>

        {/* 3. RUTAS EXCLUSIVAS PARA ENCARGADOS / ADMIN */}
        <Route
          element={<ProtectedRoute allowedRoles={["encargado", "admin"]} />}
        >
          <Route path="/encargado" element={<Encargado />} />
          <Route path="/maquinasen/maquinasen" element={<Maquinasen />} />
          <Route path="/repuestosen/repuestosen" element={<Repuestosen />} />
          <Route
            path="/maquinasen/maquinasIndividuales/DESON210"
            element={<Deson210en />}
          />
          {/* El encargado suele tener su propia vista de máquinas o acceso total */}
          {/* Si las páginas de máquinas son diferentes para el encargado, dejalas acá */}
        </Route>

        {/* 4. ERROR 404 / ACCESO DENEGADO */}
        <Route
          path="*"
          element={<div>Esta página no existe o no tienes permiso.</div>}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
