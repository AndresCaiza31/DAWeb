import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { fetchDataBackend, loading } = useFetch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (dataForm) => {
    await fetchDataBackend("/auth/register", dataForm, "POST");
    navigate("/login");
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen font-sans">
      {/* LADO IZQUIERDO: Formulario */}
      <div className="w-full sm:w-1/2 min-h-screen bg-white flex justify-center items-center px-8 sm:px-16 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crea tu cuenta</h1>
          <p className="text-gray-500 mb-8">Únete a la comunidad de la ESFOT y optimiza tu estudio.</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Nombre</label>
                <input
                  type="text"
                  placeholder="Ej. Juan"
                  className="w-full rounded-lg border border-gray-300 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  {...register("firstName", { required: "El nombre es obligatorio" })}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Apellido</label>
                <input
                  type="text"
                  placeholder="Ej. Pérez"
                  className="w-full rounded-lg border border-gray-300 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  {...register("lastName", { required: "El apellido es obligatorio" })}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Correo Institucional</label>
              <input
                type="email"
                placeholder="nombre.apellido@epn.edu.ec"
                className="w-full rounded-lg border border-gray-300 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                  placeholder="Mínimo 8 caracteres"
                  className="w-full rounded-lg border border-gray-300 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  {...register("password", { 
                    required: "La contraseña es obligatoria",
                    minLength: { value: 8, message: "Mínimo 8 caracteres" }
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
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <p className="text-xs text-gray-500 leading-relaxed py-2">
              Al registrarte, aceptas que el sistema procesará tus datos académicos para generar rutas de aprendizaje personalizadas.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-300 shadow-md hover:shadow-lg mt-2"
            >
              {loading ? "Creando cuenta..." : "Registrarse ahora"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="font-bold text-blue-600 hover:underline">
              Inicia sesión aquí
            </Link>
          </div>
        </div>
      </div>

      {/* LADO DERECHO: Imagen Decorativa */}
      <div 
        className="hidden sm:flex w-1/2 min-h-screen relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-blue-900/75 flex flex-col justify-center items-center px-12 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            Potenciamos tu talento académico.
          </h2>
          <p className="text-xl text-blue-100 max-w-lg">
            Únete a cientos de estudiantes de la ESFOT que ya están optimizando su tiempo de estudio con inteligencia artificial adaptada a sus necesidades.
          </p>
          <div className="mt-10 flex gap-4">
             {/* Un pequeño detalle decorativo de stats para que se vea más profesional */}
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <p className="text-white font-bold text-2xl">100%</p>
                <p className="text-blue-200 text-xs uppercase tracking-widest">Personalizado</p>
             </div>
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <p className="text-white font-bold text-2xl">AI</p>
                <p className="text-blue-200 text-xs uppercase tracking-widest">Powered</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;