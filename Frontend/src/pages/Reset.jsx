import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";

const Reset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const { fetchDataBackend, loading } = useFetch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const updatePassword = async (dataForm) => {
    await fetchDataBackend(`/auth/reset-password/${token}`, dataForm, "POST");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Nueva Contraseña
        </h2>
        <p className="text-center text-sm text-gray-600">
          Ingresa tu nueva contraseña para acceder a la plataforma.
        </p>

        <form onSubmit={handleSubmit(updatePassword)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Nueva Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="****************"
                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:border-blue-500"
                {...register("newPassword", { required: "La nueva contraseña es obligatoria" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
              </button>
            </div>
            {errors.newPassword && <p className="text-red-600 text-sm mt-1">{errors.newPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {loading ? "Actualizando..." : "Actualizar Contraseña"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-blue-600 hover:underline">
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reset;