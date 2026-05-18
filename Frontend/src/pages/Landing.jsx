import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <div className="text-2xl font-bold text-blue-800 tracking-tight">TSDS Learning</div>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-600 font-semibold hover:text-blue-700 transition-colors">
            Iniciar sesión
          </Link>
          <Link to="/register" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
            Regístrate
          </Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-8">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Transforma tu forma de aprender en la <span className="text-blue-600">ESFOT</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Un sistema inteligente que analiza tu estilo de estudio y genera rutas de aprendizaje personalizadas impulsadas por Inteligencia Artificial para dominar el desarrollo de software.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300">
              Comenzar mi ruta ahora
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-blue-700 text-lg font-bold rounded-xl shadow-md border border-gray-200 hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300">
              Ya tengo una cuenta
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Impulsado por IA</h3>
            <p className="text-gray-600">Contenido adaptado dinámicamente según tus fortalezas y debilidades semestrales.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Estilos de Aprendizaje</h3>
            <p className="text-gray-600">Evaluación inicial para determinar si aprendes mejor de forma visual, auditiva o práctica.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Enfoque Académico</h3>
            <p className="text-gray-600">Material basado estrictamente en la malla curricular y los sílabos oficiales vigentes.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;