import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CardPizzaComponent = ({ pizza, onAddToCart }) => {
  const { id, name, img, price, ingredients } = pizza;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pizza/${id}`);
  };


  // Función para capitalizar la primera letra del nombre
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

  return (
    <div className='container'>
    <div className="card">
      <img src={img} alt='{name}' className="card-img-top" /> 
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
            <button type="button" className="btn btn-outline-dark" onClick={handleClick}>👀 Ver más</button>
            <button type="button" className="btn btn-dark" onClick={() => onAddToCart(pizza)}>Añadir 🛒</button>
          </div>
      </div>
    </div>
    </div>
  );
};

CardPizzaComponent.propTypes = {
  pizza: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default CardPizzaComponent;
