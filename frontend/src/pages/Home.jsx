import '../components/Home.css';
import React, { useContext,useEffect } from 'react';
import HeaderComponent from "../components/Header";
import CardPizzaComponent from "../components/CardPizza";
import { ApiContext } from '../context/ApiContext';
//Nota:  CartContext se consume desde el componente CardPizzaComponent, hijo de HomeComponent.

const HomeComponent = () => {
  const { pizzas, fetchAllPizzas, loading, error } = useContext(ApiContext);

  useEffect(() => {
    fetchAllPizzas();
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="content">
      <HeaderComponent />
      <div className="card-container">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="card-item">
            <CardPizzaComponent pizza={pizza} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeComponent;
