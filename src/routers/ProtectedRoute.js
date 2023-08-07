import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../custom-hooks/useAuth";
export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
