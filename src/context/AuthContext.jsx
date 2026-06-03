import { createContext, useState, useContext, useEffect } from "react";

const CurrentUserContext = createContext(null);

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  function login(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export { CurrentUserContext, AuthProvider };
