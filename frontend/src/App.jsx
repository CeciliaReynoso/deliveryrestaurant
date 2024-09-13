import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useContext } from "react";
import Cart from './pages/Cart';
import Footer from './components/Footer';
import NavbarComponent from './components/Navbar';
import HomeComponent from './pages/Home';
import PizzaComponent from './pages/Pizza';
import Register from './pages/Register';
import Login from './pages/Login';
import ProfileComponent from './pages/Profile';
import NotFound from './pages/NotFound';
import { UserContext } from "./context/UserContext";
import { CartProvider } from './context/CartContext';
import { ApiProvider } from './context/ApiContext';

const App = () => {
  const PizzaWithId = () => {
    const { pizzaId } = useParams();
    return <PizzaComponent pizzaId={pizzaId} />;
  };

  const { user } = useContext(UserContext);
  
  // Asegúrate de que `user` tenga un valor por defecto (puedes hacerlo desde el contexto).
  console.log('User in App:', user);

  const token = user.token; 
  console.log('User in App:', user);

  return (
    <CartProvider>
      <ApiProvider>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          
          {/* Redirige a Home si el token es verdadero */}
          <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
          
          {/* Protege la ruta de perfil, redirige al login si el token no está definido */}
          <Route path="/profile" element={token ? <ProfileComponent /> : <Navigate to="/login" />} />
          
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:pizzaId" element={<PizzaWithId />} />
          
          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ApiProvider>
    </CartProvider>
  );
};

export default App;
