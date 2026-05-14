import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';

const Confirm = () => {
    const { fetchDataBackend } = useFetch();
    const { token } = useParams();

    const verifyToken = async () => {
        const url = `/auth/verify/${token}`;
        await fetchDataBackend(url, null, "GET");
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="flex flex-col items-center justify-center bg-white p-10 rounded-xl shadow-lg text-center max-w-md">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">Verificando Cuenta</h2>
                <p className="text-gray-600 mb-8">
                    Estamos validando tu acceso institucional. Si el token es correcto, podrás iniciar sesión y acceder a tu ruta de aprendizaje.
                </p>
                <Link to="/login" className="p-3 w-full text-center bg-blue-600 text-white rounded-xl hover:bg-blue-800 duration-300">
                    Ir al Login
                </Link>
            </div>
        </div>
    );
};

export default Confirm;