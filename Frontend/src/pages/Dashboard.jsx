import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Dashboard = () => {
  const { auth, logoutAuth } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Panel Principal TSDS
        </h1>
        <p className="text-gray-600 mb-6">
          Bienvenido, {auth.user?.name}. Has accedido a tu ruta protegida.
        </p>
        <button
          onClick={logoutAuth}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;