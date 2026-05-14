import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setAuth({ token, user });
    }
  }, []);

  const loginAuth = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ token, user });
  };

  const logoutAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;