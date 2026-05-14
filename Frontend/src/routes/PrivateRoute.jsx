import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const PrivateRoute = () => {
  const { auth } = useContext(AuthContext);

  return auth.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;