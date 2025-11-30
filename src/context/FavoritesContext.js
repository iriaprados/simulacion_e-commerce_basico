
import React, { createContext, useState, useEffect, useContext } from 'react'; // Importa React y hooks necesarios
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para almacenamiento persistenteconst FavoritesContext = createContext();

const FavoritesContext = createContext(); // Crea el contexto de favoritos

export const FavoritesProvider = ({ children }) => { // Componente proveedor del contexto
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos al iniciar
  useEffect(() => {
    loadFavorites();
  }, []);

  // Guardar favoritos cuando cambien
  useEffect(() => {
    saveFavorites();
  }, [favorites]);

    const loadFavorites = async () => { // Carga los favoritos desde el almacenamiento
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites'); // Obtiene los favoritos almacenados
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites)); // Actualiza el estado con los favoritos cargados
      }
    } catch (error) { // Maneja errores al cargar favoritos
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async () => { // Guarda los favoritos en el almacenamiento
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

const addFavorite = (product) => { // Agrega un producto a favoritos
    setFavorites([...favorites, product]);
  };

  const removeFavorite = (productId) => { // Elimina un producto de favoritos por su ID
    setFavorites(favorites.filter(item => item.id !== productId));
  };

  const isFavorite = (productId) => { // Verifica si un producto está en favoritos
    return favorites.some(item => item.id === productId);
  };

  const toggleFavorite = (product) => { // Alterna el estado de favorito de un producto
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => { // Hook personalizado para usar el contexto de favoritos
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
