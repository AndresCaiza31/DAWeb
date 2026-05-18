import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Confirm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');

  const verifyAccount = async () => {
    if (loading || status === 'success') return;
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:3000/api/auth/verify/${token}`);
      setStatus('success');
      toast.success(response.data.message || 'Cuenta verificada correctamente');
      
      setTimeout(() => {
        navigate('/login');
      }, 2500);

    } catch (error) {
      setStatus('error');
      toast.error(error.response?.data?.error || error.response?.data?.message || 'Token inválido o expirado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen font-sans">
      <div className="w-full sm:w-1/2 min-h-screen bg-white flex justify-center items-center px-8 sm:px-16 py-12">
        <div className="w-full max-w-md text-center">
          
          {status === 'idle' && (
            <>
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Verificación de Cuenta</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Estás a un solo paso de acceder a tu entorno de aprendizaje en la ESFOT. Haz clic en el botón para confirmar tu correo institucional.
              </p>
              <button
                onClick={verifyAccount}
                disabled={loading}
                className={`w-full text-white font-bold py-3.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
                  loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Verificando credenciales...' : 'Verificar mi cuenta'}
              </button>
            </>
          )}

          {status === 'success' && (
            <div className="animate-fade-in-up">
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Todo listo!</h2>
              <p className="text-gray-500">Tu cuenta ha sido verificada correctamente.</p>
              <p className="text-sm text-blue-600 font-semibold mt-6 animate-pulse">
                Redirigiendo al inicio de sesión...
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="animate-fade-in-up">
              <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Enlace inválido</h2>
              <p className="text-gray-500 mb-8">
                Es posible que ya hayas verificado tu cuenta previamente o que este enlace haya caducado.
              </p>
              <Link
                to="/login"
                className="inline-block w-full bg-gray-100 text-gray-700 font-bold py-3.5 rounded-lg hover:bg-gray-200 transition-all duration-300 border border-gray-200"
              >
                Ir al Inicio de Sesión
              </Link>
            </div>
          )}

        </div>
      </div>

      <div 
        className="hidden sm:flex w-1/2 min-h-screen relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-blue-900/80 flex flex-col justify-center items-center px-12 text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-8 border border-white/20">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            Valida tu identidad.
          </h2>
          <p className="text-xl text-blue-100 max-w-lg">
            Mantenemos un entorno seguro exclusivo para la comunidad politécnica, asegurando que cada ruta de aprendizaje llegue al estudiante correcto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirm;