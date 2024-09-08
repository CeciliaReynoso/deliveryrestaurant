import React, { createContext, useState, useCallback } from 'react';

// Crear el contexto
export const ApiContext = createContext();

// Proveedor del contexto
export const ApiProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función general para obtener datos de una URL específica
  const fetchAllPizzas = useCallback(async () => {
    setLoading(true);
    setError(null); // Limpiar errores anteriores
    try {
      const url = 'http://localhost:5000/api/pizzas';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const result = await response.json();
      setPizzas(result);
    } catch (error) {
      setError(error.message || error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para obtener una pizza específica por ID
  const fetchPizzaById = useCallback(async (pizzaId) => {
    setLoading(true);
    setError(null); // Limpiar errores anteriores
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
  }, []);

  return (
    <ApiContext.Provider value={{ pizzas, pizza, fetchAllPizzas, fetchPizzaById, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
};
