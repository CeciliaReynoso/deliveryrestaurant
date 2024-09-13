import { Button, Card, Container } from 'react-bootstrap';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';


// Función para capitalizar la primera letra
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Función para formatear el precio en pesos chilenos
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

// Componente Cart
const Cart = () => {
  // Aquí accede al contexto, pudiéndose obviar las props usadas anteriormente
  const {user}= useContext(UserContext)
  const token = user.token
  const { cart, handleIncreaseQuantity, handleDecreaseQuantity, getTotal } = useContext(CartContext);
  

  return (
    !token? <h1>Para ver el 🛒 y pagar, vaya primero a opción Login e identifíquese</h1>
    :
    <Container className='eCart' style={{ display:'flex', maxWidth: '50%', marginTop: '5rem', marginBottom:'25rem' }}>
      <div className="text-center">
        <h2>🛒 Total Carrito: {formatPrice(getTotal())}</h2>
        <Button disable={token} className={token?"m-2 btn-lg btn-success":"m-2 btn-lg btn-danger"}>Pagar</Button> 
        <p className='p-8'>Desde 🍕Home pulse 'Añadir' para traer productos al carrito. Para eliminar un ítem disminuir a cero la cantidad.</p>
      </div>
      <div>
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
              variant="center" 
              src={pizza.img} 
              alt={pizza.name}
              style={{ 
                width: '150px', 
                height: '120px', 
                objectFit: 'cover', 
                borderRadius: '8px',
                margin:'1.5rem auto', 
              }} 
            />         
            <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: '1rem' }}>
              <Card.Title>{capitalizeFirstLetter(pizza.name)}</Card.Title>
              <Card.Text>Precio: {formatPrice(pizza.price)}</Card.Text>                          
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <Button 
                  variant="outline-dark" 
                  size="sm" 
                  onClick={() => handleDecreaseQuantity(pizza.id)}
                >-</Button>
                <Card.Title>{pizza.quantity}</Card.Title>
                <Button 
                  variant="dark" 
                  size="sm" 
                  onClick={() => handleIncreaseQuantity(pizza.id)}
                >+</Button>
              </div>
              <Card.Text>Sub-Total: {formatPrice(pizza.price * pizza.quantity)}</Card.Text>  
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Cart;
//Para leer la logica de este componente para no distraerse en los styles buscar las letras color naranja
//La logica principal que recorre esto esta App.jsx
