/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Importa el contexto del carrito
import { capitalizeFirstLetter, formatPrice } from '../utils/format';

const CardPizzaComponent = ({ pizza }) => {
  const { id, name, img, price, ingredients } = pizza;
  const navigate = useNavigate();
  const { handleAddToCart } = useContext(CartContext); // Consume el contexto del carrito

  const handleClick = () => {
    navigate(`/pizza/${id}`);
  };

  return (
    <div className='container'>
      <div className="card">
        <img src={img} alt={name} className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title">{capitalizeFirstLetter(name)}</h3>
          <div className='border-top border-bottom'>
            <h6>Ingredientes:</h6>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>👩‍🍳 {ingredient}</li>
              ))}
            </ul>
          </div>
          <p className="card-text p-2">Precio: {formatPrice(price)}</p>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-outline-dark" onClick={handleClick}>
              👀 Ver más
            </button>
            <button type="button" className="btn btn-dark" onClick={() => handleAddToCart(pizza)}>
              Añadir 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPizzaComponent;
