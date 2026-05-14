import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.endsWith('@epn.edu.ec')) {
      setMessage('Debes utilizar tu correo institucional válido (@epn.edu.ec).');
      setIsError(true);
      return;
    }

    try {
      const response = await loginUser(formData);
      
      localStorage.setItem('token', response.token);
      
      setMessage('Inicio de sesión exitoso. Preparando tu entorno...');
      setIsError(false);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.error || 'Error al iniciar sesión');
      setIsError(true);
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">HOLA DE NUEVO</h2>
          <p className="text-sm text-gray-500 text-center mb-8">Ingresa tus credenciales para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1">Correo Institucional</label>
              <input
                name="email"
                type="email"
                placeholder="nombre.apellido@epn.edu.ec"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1">Contraseña</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="****************"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 transition-colors mt-4"
            >
              Iniciar sesión
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-md text-center text-sm font-medium ${isError ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'}`}>
              {message}
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <span className="text-sm text-gray-600">¿No tienes una cuenta?</span>
            <button 
              type="button"
              onClick={() => navigate('/register')}
              className="px-4 py-2 border border-gray-400 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-[#f4f8fc] items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <h2 className="text-4xl font-bold text-[#1e3a8a] mb-4">Plataforma TSDS</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Retoma tu ruta de aprendizaje y sigue avanzando hacia tus objetivos académicos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;