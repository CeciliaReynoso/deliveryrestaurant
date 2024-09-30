import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../context/CartContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const cart  = useContext(CartContext);

  const navigate = useNavigate();

  // Revisa si hay un token en localStorage al cargar la aplicación
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getUser(savedToken);  // Obtiene los datos del usuario si hay un token
    }
  }, []);

  const check = async () => {
    console.log("Cart before sending:", cart);  // Verifica el carrito antes del envío
    const response = await fetch("http://localhost:5000/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cart: cart,
        user: user,  
      }),
          });
          
    const data = await response.json();
    alert(data?.error || data.message);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  const getUser = async (currentToken) => {
    const response = await fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentToken || token}`,
      },
    });
    const data = await response.json();
    setUser(data);
  };

  const register2 = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    alert(data?.error || "Registration successful!");
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      getUser(data.token);
      navigate("/");
    }
  };

  const login = async (emailValue, passwordValue) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    });
    const data = await response.json();
    console.log("Datos del usuario:", data); // Verifica la respuesta de la API
    alert(data?.error || "Authentication successful!");
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      getUser(data.token);
      navigate("/");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, token, register2, getUser, logOut, check }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
