import './App.css';
import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import NavbarComponent from './components/Navbar';
import HomeComponent from './pages/Home'; // Importa el nuevo HomeComponent
import PizzaComponent from './pages/Pizza';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound'

const App = () => {
  const [cart, setCart] = useState([]);
  
  const handleAddToCart = (pizza) => {
    setCart(prevCart => {
      const pizzaInCart = prevCart.find(item => item.id === pizza.id);
      if (pizzaInCart) {
        return prevCart.map(item =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...pizza, quantity: 1 }];
      }
    });
  };

  const handleIncreaseQuantity = (id) => {
    setCart(prevCart => prevCart.map(pizza =>
      pizza.id === id ? { ...pizza, quantity: pizza.quantity + 1 } : pizza
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setCart(prevCart => prevCart
      .map(pizza =>
        pizza.id === id
          ? { ...pizza, quantity: Math.max(pizza.quantity - 1, 0) }
          : pizza
      )
      .filter(pizza => pizza.quantity > 0)
    );
  };

  const getTotal = () => {
    return cart.reduce((total, pizza) => total + (pizza.price * pizza.quantity), 0);
  };

  return (
    <div>
      <NavbarComponent total={getTotal()} />
          <Routes>
              <Route
              path="/"
              element={<HomeComponent onAddToCart={handleAddToCart} />}
              />
              <Route
              path="/register"
              element={<Register />}
              />
              <Route
              path="/login"
              element={<Login />}
              />
              <Route
              path="/profile"
              element={<Profile />}
              />
              <Route
              path="/cart"
              element={<Cart
                cart={cart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}   
              />}
              />
              <Route
              path="/pizza/p001"
              element={<PizzaComponent />}
              />
              <Route
              path="*"
              element={<NotFound />}
              />
          </Routes>
    <Footer />      
    </div>
  );
};

export default App;

