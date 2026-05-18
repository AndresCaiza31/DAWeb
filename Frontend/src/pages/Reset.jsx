import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";

const Reset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const { fetchDataBackend, loading } = useFetch();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const newPasswordValue = watch("newPassword");

  const updatePassword = async (dataForm) => {
    const payload = { newPassword: dataForm.newPassword };
    await fetchDataBackend(`/auth/reset-password/${token}`, payload, "POST");
    
    setTimeout(() => {
      navigate("/login");
    }, 2500);
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen font-sans">
      <div className="w-full sm:w-1/2 min-h-screen bg-white flex justify-center items-center px-8 sm:px-16 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nueva Contraseña</h1>
          <p className="text-gray-500 mb-8">
            Asegúrate de crear una contraseña fuerte y que no hayas utilizado antes.
          </p>

          <form onSubmit={handleSubmit(updatePassword)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Nueva Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full rounded-lg border border-gray-300 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  {...register("newPassword", { 
                    required: "La nueva contraseña es obligatoria",
                    minLength: {
                      value: 8,
                      message: "La contraseña debe tener mínimo 8 caracteres"
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
                </button>
              </div>
              {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Confirmar Contraseña</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repite la contraseña"
                  className="w-full rounded-lg border border-gray-300 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  {...register("confirmPassword", { 
                    required: "Debes confirmar tu contraseña",
                    validate: value => value === newPasswordValue || "Las contraseñas no coinciden"
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-300 shadow-md hover:shadow-lg mt-6"
            >
              {loading ? "Actualizando..." : "Actualizar Contraseña"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            <Link to="/login" className="font-bold text-blue-600 hover:underline">
              Cancelar y volver al inicio
            </Link>
          </div>
        </div>
      </div>

      <div 
        className="hidden sm:flex w-1/2 min-h-screen relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614064641936-a592654c07cb?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-blue-900/80 flex flex-col justify-center items-center px-12 text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-8 border border-white/20">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            Acceso protegido.
          </h2>
          <p className="text-xl text-blue-100 max-w-lg">
            Las contraseñas de nuestra plataforma están protegidas mediante algoritmos de encriptación avanzados para garantizar la integridad de tu información académica.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reset;