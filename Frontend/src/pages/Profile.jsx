import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";
import AuthContext from "../context/AuthProvider";
import { toast } from "react-toastify";
import { MdVisibility, MdVisibilityOff, MdEdit, MdClose, MdEmail, MdSchool, MdPsychology } from "react-icons/md";

const Profile = () => {
  const { auth, loginAuth } = useContext(AuthContext);
  const { fetchDataBackend, loading } = useFetch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const user = auth?.user || {};

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (dataForm) => {
    const response = await fetchDataBackend("/auth/profile", dataForm, "PUT");
    
    if (response && response.success) {
      loginAuth(auth.token, response.user);
      toast.success("Perfil actualizado correctamente");
      setIsEditing(false);
      reset({
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        currentPassword: "",
        newPassword: ""
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Mi Perfil</h2>
            <p className="text-gray-500 mt-1">Gestiona tu información personal y credenciales.</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              <MdEdit size={20} />
              Editar Información
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-700 to-indigo-800"></div>
            <div className="px-8 pb-8">
              <div className="relative flex justify-between items-end -mt-12 mb-6">
                <div className="w-24 h-24 bg-white rounded-2xl p-1.5 shadow-md">
                  <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-3xl font-bold text-white">
                    {user.firstName ? user.firstName.charAt(0) : "U"}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h3>
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mt-2">
                  Estudiante ESFOT
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="p-3 bg-white rounded-lg shadow-sm text-gray-500">
                    <MdEmail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Correo Institucional</p>
                    <p className="text-gray-900 font-semibold">{user.email || "No registrado"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="p-3 bg-white rounded-lg shadow-sm text-gray-500">
                    <MdSchool size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Semestre Actual</p>
                    <p className="text-gray-900 font-semibold">{user.semester ? `${user.semester}vo Semestre` : "No definido"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 md:col-span-2">
                  <div className="p-3 bg-white rounded-lg shadow-sm text-purple-500">
                    <MdPsychology size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Estilo de Aprendizaje</p>
                    <p className="text-gray-900 font-semibold">{user.learningStyle || "Aún no has realizado el test"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Actualizar Datos</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <MdClose size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Nombre</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    {...register("firstName", { required: "El nombre es obligatorio" })}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Apellido</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    {...register("lastName", { required: "El apellido es obligatorio" })}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Actualizar Contraseña</h3>
                <p className="text-sm text-gray-500 mb-6">Deja estos campos en blanco si solo deseas actualizar tus datos personales.</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Contraseña Actual</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        className="w-full rounded-lg border border-gray-300 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        {...register("currentPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Nueva Contraseña</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="w-full rounded-lg border border-gray-300 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        {...register("newPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-300 shadow-md hover:shadow-lg"
                >
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;