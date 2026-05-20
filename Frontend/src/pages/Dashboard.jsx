import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { auth, logoutAuth } = useContext(AuthContext);

  const userData = {
    firstName: auth?.user?.firstName || "Usuario",
    role: "Estudiante",
    semester: auth?.user?.semester || 5,
    learningStyle: auth?.user?.learningStyle || null,
  };

  const handleLogout = () => {
    logoutAuth();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* --- SIDEBAR (BARRA LATERAL) --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-20 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center h-20 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-blue-800 tracking-tight">TSDS <span className="text-blue-500">Learning</span></h1>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-blue-700 bg-blue-50 rounded-xl font-semibold text-left transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Mi Panel
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:text-blue-700 hover:bg-gray-50 rounded-xl font-medium text-left transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            Rutas de Estudio
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:text-blue-700 hover:bg-gray-50 rounded-xl font-medium text-left transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            Mi Perfil
          </button>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <h2 className="text-xl font-bold text-gray-800 hidden sm:block">Panel de Control</h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white flex items-center justify-center font-bold shadow-md cursor-pointer hover:shadow-lg transition-shadow">
              {userData.firstName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Área scrolleable central */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 lg:p-10">

          <div className="max-w-6xl mx-auto space-y-8">

            {/* Saludo */}
            <div>
              <h3 className="text-3xl font-extrabold text-gray-900">¡Hola, {userData.firstName}! 👋</h3>
              <p className="text-gray-500 mt-1 text-lg">Aquí está tu progreso académico en la ESFOT.</p>
            </div>

            {/* BANNER DE ACCIÓN */}
            {!userData.learningStyle && (
              <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-800 rounded-2xl shadow-xl p-8 sm:p-10 text-white transform transition-all hover:scale-[1.01] duration-300">
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="max-w-xl">
                    <span className="inline-block px-3 py-1 bg-blue-500/30 border border-blue-400/50 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
                      Paso Obligatorio
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-bold mb-3">Descubre tu Estilo de Aprendizaje</h4>
                    <p className="text-blue-100 text-lg leading-relaxed">
                      Para que la Inteligencia Artificial pueda generar rutas de estudio perfectas para ti, necesitamos saber cómo procesas mejor la información. Toma solo 2 minutos.
                    </p>
                  </div>
                  <button className="whitespace-nowrap w-full sm:w-auto px-8 py-4 bg-white text-blue-900 font-bold rounded-xl shadow-lg hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300">
                    Realizar Test Ahora
                  </button>
                </div>
                <svg className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/4 w-96 h-96 text-white opacity-5" fill="currentColor" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
                <svg className="absolute bottom-0 left-0 transform -translate-x-1/3 translate-y-1/3 w-64 h-64 text-white opacity-5" fill="currentColor" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              </div>
            )}

            {/* TARJETAS DE MÉTRICAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Semestre Actual</p>
                  <p className="text-2xl font-bold text-gray-900">{userData.semester}vo</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Rutas Completadas</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Estilo de Aprendizaje</p>
                  <p className="text-lg font-bold text-gray-900">{userData.learningStyle || 'Por definir'}</p>
                </div>
              </div>
            </div>

            {/* SECCIÓN DE RUTAS RECIENTES */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Aún no tienes rutas de aprendizaje</h4>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Completa tu test de estilo de aprendizaje para que la Inteligencia Artificial pueda crear tu primera ruta de estudio basada en la malla de la ESFOT.
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;