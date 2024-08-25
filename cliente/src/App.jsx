import './App.css';
import { useState } from 'react';
import Cart from './components/Cart';
import Footer from './components/Footer';
import NavbarComponent from './components/Navbar';
import HomeComponent from './components/Home'; // Importa el nuevo HomeComponent
import PizzaComponent from './components/Pizza';

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
      {/* <HomeComponent onAddToCart={handleAddToCart} />  */}
      {/* <Cart
        cart={cart}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      /> */}
      <PizzaComponent onAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
};

export default App;
