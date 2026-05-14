import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ESFOT Mentoring</h1>
          <nav>
            <Link to="/login" className="px-4 py-2 hover:bg-blue-700 rounded transition-colors">
              Iniciar Sesión
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center text-center p-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Potencia tu Ruta de Aprendizaje en TSDS
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Conecta con mentores, descubre recursos clave y alcanza tus objetivos académicos dentro de la Escuela de Formación de Tecnólogos.
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors font-medium"
            >
              Comenzar ahora
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 text-sm">
        <p>&copy; {new Date().getFullYear()} Escuela Politécnica Nacional - ESFOT. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Landing;