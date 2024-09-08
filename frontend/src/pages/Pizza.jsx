import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ApiContext } from '../context/ApiContext';
import { CartContext } from '../context/CartContext';
import {capitalizeFirstLetter, formatPrice } from '../utils/format'

const PizzaComponent = () => {
  const { pizzaId } = useParams();
  const { pizza, fetchPizzaById, error} = useContext(ApiContext);
  const { handleAddToCart } = useContext(CartContext);
  
// useEffect para ejecutar fetchPizzasById al montar el componente
  useEffect(() => {
    fetchPizzaById(pizzaId);
    }, []); 

    return (
    error ? <p>Error: {error}</p>
    :   
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
              onClick={() => handleAddToCart(pizza)}
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

