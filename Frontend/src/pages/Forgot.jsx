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
    <div className="flex flex-col sm:flex-row h-screen">
      <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center">
        <div className="md:w-4/5 sm:w-full px-4">
          <h1 className="text-3xl font-semibold mb-6 text-center uppercase text-gray-800">Recuperar Contraseña</h1>
          
          <form onSubmit={handleSubmit(sendEmail)}>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold">Correo Institucional</label>
              <input
                type="email"
                placeholder="nombre.apellido@epn.edu.ec"
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                {...register("email", { required: "El correo electrónico es obligatorio" })}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-3 mt-6">
              <button
                disabled={loading}
                className="bg-blue-600 text-white py-2 w-full rounded-xl hover:bg-blue-800 duration-300 disabled:bg-blue-300"
              >
                {loading ? "Enviando enlace..." : "Recuperar acceso"}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t pt-4 text-sm flex justify-between items-center">
            <p className="text-gray-600">¿Ya la recordaste?</p>
            <Link to="/login" className="py-2 px-5 bg-gray-100 text-gray-600 border rounded-xl hover:scale-105 duration-300">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 h-1/3 sm:h-screen bg-blue-50 hidden sm:flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">No te preocupes</h2>
          <p className="text-gray-600">Te enviaremos un enlace seguro a tu correo institucional de la EPN para restablecer tu contraseña.</p>
        </div>
      </div>
    </div>
  );
};

export default Forgot;