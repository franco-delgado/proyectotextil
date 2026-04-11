import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  // 1. ¿Está el usuario logueado?
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 2. ¿Tiene el rol necesario? (Si se especificaron roles)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
    // O a una página de "No autorizado"
  }

  // Si todo está bien, renderiza los componentes hijos (las rutas)
  return <Outlet />;
};

export default ProtectedRoute;
