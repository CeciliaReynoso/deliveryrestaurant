import React, { useEffect, useState } from 'react';

// Función para capitalizar la primera letra
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Función para formatear el precio en pesos chilenos
const formatPrice = (price) => {
  return price.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const PizzaComponent = ({ pizzaId, onAddToCart }) => {
  const [pizza, setPizza] = useState(null); // Estado para almacenar los datos de la pizza
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // useEffect para consumir la API(en App.jsx se pasa pizzaId)
  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${pizzaId}`);
        if (!response.ok) {
          throw new Error('Ocurrió un error, revisar la llave de búsqueda del producto para ver más 👀');
        }
        const data = await response.json();
        setPizza(data);
      } catch (error) {
        setError(error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [pizzaId]); // Ahora el efecto depende del ID de la pizza

  if (loading) return <p>Cargando datos...</p>; // Mostrar mensaje de carga cuando demora la API
  if (error) return <p>Error: {error}</p>; // Mostrar mensaje de error

  return (
    pizza && (
      <div
        className='eDesc'
        style={{
          maxWidth: '100%',
          height: 'calc(100vh - 10%)',
          margin: '5rem',
          padding: '3rem',
          borderRadius: '10px',
          borderTop: 'solid 1px rgba(0, 0, 0, 0.1)',
          boxShadow: '4px 8px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'start',
            gap: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '1rem',
            }}
          >
            <h2>{capitalizeFirstLetter(pizza.name)}</h2>
            <img
              src={pizza.img}
              alt={pizza.name}
              style={{
                maxWidth: '250px',
                maxHeight: '300px',
                borderRadius: '10px',
                objectFit: 'contain',
              }}
            />
            <button
              type="button"
              className="btn btn-dark m-3"
              onClick={() => onAddToCart(pizza)}
            >
              Añadir 🛒
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: '0.5rem',
            }}
          >
            <p className='text-md-start text-lg-justify' style={{ marginBottom: '0' }}>{pizza.desc}</p>
            <h6>Ingredientes:</h6>
            <ul>
              {pizza.ingredients.map((ingredient, index) => (
                <li key={index}>👩‍🍳 {ingredient}</li>
              ))}
            </ul>
            <h5>Precio: {formatPrice(pizza.price)}</h5>
          </div>
        </div>
      </div>
    )
  );
};

export default PizzaComponent;
