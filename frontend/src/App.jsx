import './App.css';
import { Route, Routes } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import NavbarComponent from './components/Navbar';
import HomeComponent from './pages/Home';
import PizzaComponent from './pages/Pizza';
import Register from './pages/Register';
import Login from './pages/Login';
import ProfileComponent from './pages/Profile';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext'; // Importa el CartProvider
import { ApiProvider } from './context/ApiContext'; // Importa el ApiProvider

const App = () => {
 
  // Puente para que pizza.jsx sea más independiente de la lógica de url dinámica y reutilizable.
  // PizzaWithId es un componente que recibe el ID de la pizza y lo pasa al PizzaComponent de Pizza.jsx
  const PizzaWithId = () => {
    const { pizzaId } = useParams(); // Obtiene el ID de la pizza desde la URL
    return <PizzaComponent pizzaId={pizzaId} />;
  };
  //Envoltura de la App con los proveedores de contexto
  return (
    <CartProvider> 
    <ApiProvider>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfileComponent />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:pizzaId" element={<PizzaWithId />} />{/* Ruta dinámica para datos de una pizza */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </ApiProvider>  
    </CartProvider>
  );
};

export default App;
