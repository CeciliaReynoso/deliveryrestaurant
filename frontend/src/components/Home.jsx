//Home.jsx Da mensajes de error y durante el lapso de carga de datos desde la API
import React, { useEffect, useState } from 'react';
import HeaderComponent from "./Header";
import CardPizzaComponent from "./CardPizza";
import PropTypes from "prop-types";
import './Home.css'; // Estilos CSS aplicados

const HomeComponent = ({ onAddToCart }) => {
  const [pizzas, setPizzas] = useState([]); // Estado para almacenar las pizzas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // useEffect para consumir la API
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pizzas');
        if (!response.ok) {
          throw new Error('Error al obtener las pizzas');
        }
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        setError(error.message||error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []); // Array vacío para ejecutar el efecto solo una vez

  if (loading) return <p>Cargando datos...</p>; // Mostrar mensaje de carga
  if (error) return <p>Error: {error}</p>; // Mostrar mensaje de error

  return (
    <>
      <div className="content">
        <HeaderComponent />
        <div className="card-container">
          {pizzas.map((pizza) => (
            <div key={pizza.id} className="card-item">
              <CardPizzaComponent pizza={pizza} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

HomeComponent.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};

export default HomeComponent;
