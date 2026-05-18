import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import AuthContext from "../context/AuthProvider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { fetchDataBackend, loading } = useFetch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const { loginAuth } = useContext(AuthContext);

  const onSubmit = async (dataForm) => {
    const response = await fetchDataBackend("/auth/login", dataForm, "POST");
    
    if (response && response.token && response.user) {
      loginAuth(response.token, response.user);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen font-sans">
      <div className="w-full sm:w-1/2 min-h-screen bg-white flex justify-center items-center px-8 sm:px-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h1>
          <p className="text-gray-500 mb-8">Ingresa tus credenciales para acceder a tus rutas.</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Correo Institucional</label>
              <input
                type="email"
                placeholder="nombre.apellido@epn.edu.ec"
                className="w-full rounded-lg border border-gray-300 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                {...register("email", { 
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@epn\.edu\.ec$/,
                    message: "Usa tu correo institucional (@epn.edu.ec)"
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  {...register("password", { required: "La contraseña es obligatoria" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex justify-end">
              <Link to="/forgot" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-300 shadow-md hover:shadow-lg mt-4"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="font-bold text-blue-600 hover:underline">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>

      <div 
        className="hidden sm:flex w-1/2 min-h-screen relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-blue-900/75 flex flex-col justify-center items-center px-12 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            Tu aprendizaje, a tu propio ritmo.
          </h2>
          <p className="text-xl text-blue-100 max-w-lg">
            Conecta con rutas generadas por inteligencia artificial basadas en tu estilo de estudio y domina las materias de tu carrera.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;