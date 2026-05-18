import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";

const Forgot = () => {
  const { fetchDataBackend, loading } = useFetch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const sendEmail = async (dataForm) => {
    await fetchDataBackend("/auth/forgot-password", dataForm, "POST");
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen font-sans">
      <div className="w-full sm:w-1/2 min-h-screen bg-white flex justify-center items-center px-8 sm:px-16 py-12">
        <div className="w-full max-w-md">
          <Link to="/login" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-8 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Volver al inicio
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recuperar Contraseña</h1>
          <p className="text-gray-500 mb-8">
            Ingresa tu correo institucional y te enviaremos instrucciones seguras para restablecer tu acceso.
          </p>
          
          <form onSubmit={handleSubmit(sendEmail)} className="space-y-5">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-300 shadow-md hover:shadow-lg mt-4"
            >
              {loading ? "Enviando enlace..." : "Recuperar acceso"}
            </button>
          </form>
        </div>
      </div>

      <div 
        className="hidden sm:flex w-1/2 min-h-screen relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=2068&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-blue-900/80 flex flex-col justify-center items-center px-12 text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-8 border border-white/20">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            Tranquilidad y seguridad.
          </h2>
          <p className="text-xl text-blue-100 max-w-lg">
            Sabemos que la vida universitaria es agitada. Te ayudamos a recuperar tu cuenta de forma rápida para que puedas seguir estudiando.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forgot;