import { Button, Card, Container } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
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
  const { token, user } = useContext(UserContext);  // Aquí accedemos a token directamente
  const { cart, handleIncreaseQuantity, handleDecreaseQuantity, getTotal, clearCart } = useContext(CartContext); // clearCart se añade para vaciar el carrito

  // Función para realizar el checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    // Crear el objeto JSON del carrito
    const cartPayload = {
      cart: cart.map(pizza => ({
        id: pizza.id,
        name: pizza.name,
        price: pizza.price,
        quantity: pizza.quantity
      })),
      user: user,
    };

    // Imprimir el objeto JSON del carrito
    console.log("JSON del carrito:", JSON.stringify(cartPayload, null, 2));
    useEffect(() => {
      console.log("User desde Cart:", user);
      console.log("Token desde Cart:", token);  
      console.log("Cart desde Cart", cart);  
    }, [user, token, cart]);
  

    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartPayload),
      });

      const data = await response.json();
      alert(data?.error || "Compra exitosa!");

      // Limpiar el carrito después de un pago exitoso
      clearCart();
    } catch (error) {
      console.error("Error en el checkout:", error);
      alert("Error en el proceso de compra.");
    }
  };

  
  return (
    !token ? (
      <h1>Para ver el 🛒 y pagar, vaya primero a opción Login e identifíquese</h1>
    ) : (
      <Container className='eCart' style={{ display: 'flex', maxWidth: '50%', marginTop: '5rem', marginBottom: '25rem' }}>
        <div className="text-center">
          <h2>🛒 Total Carrito: {formatPrice(getTotal())}</h2>
          {/* El botón "Pagar" se deshabilita si el carrito está vacío o si no hay token */}
          <Button 
            disabled={!token || cart.length === 0} 
            className={token ? "m-2 btn-lg btn-success" : "m-2 btn-lg btn-danger"} 
            onClick={handleCheckout}  // Aquí se utiliza la función handleCheckout al hacer clic
          >
            Pagar
          </Button>
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
    )
  );
};

export default Cart;
