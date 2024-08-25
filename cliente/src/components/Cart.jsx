import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';

// Función para capitalizar la primera letra
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Función para formatear el precio en pesos chilenos
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

//El siguiente es el componente Cart
//En la linea 33 esta el recorrido para renderizar
const Cart = ({ cart, onIncreaseQuantity, onDecreaseQuantity }) => {
  const getTotal = () => {
    return cart.reduce((total, pizza) => total + (pizza.price * pizza.quantity), 0);
  };

  return (
    <Container className='eCart' style={{ maxWidth: '50%', marginTop: '2rem' }}>
      <div className="text-center mb-4">
        <h2>🛒 Total Carrito: {formatPrice(getTotal())}</h2>
        <Button variant="success" className="mt-2 btn-lg" >Pagar</Button>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {cart.map(pizza => (
          <Card key={pizza.id} style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            padding: '0.5rem',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }} className="mb-3">
            <Card.Img 
              variant="left" 
              src={pizza.img} 
              alt={pizza.name}
              style={{ 
                width: '120px', 
                height: '120px', 
                objectFit: 'cover', 
                borderRadius: '8px' 
              }} 
            />
            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '1rem' }}>
              <Card.Title>{capitalizeFirstLetter(pizza.name)}</Card.Title>
              <Card.Text>Precio: {formatPrice(pizza.price)}</Card.Text>
              <Card.Text>Cantidad: {pizza.quantity}</Card.Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Button 
                  variant="outline-dark" 
                  size="sm" 
                  onClick={() => onDecreaseQuantity(pizza.id)}
                >-</Button>
                <Button 
                  variant="dark" 
                  size="sm" 
                  onClick={() => onIncreaseQuantity(pizza.id)}
                >+</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onIncreaseQuantity: PropTypes.func.isRequired,
  onDecreaseQuantity: PropTypes.func.isRequired,
};

export default Cart;
//Para leer la logica de este componente para no distraerse en los styles buscar las letras color naranja
//La logica principal que recorre esto esta App.jsx
