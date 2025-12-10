import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

const ProductCard = ({ product, onPress }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);
  
  // Estado para el ancho de la tarjeta que se actualiza con el tamaño de pantalla
  const [cardWidth, setCardWidth] = useState(() => {
    const { width } = Dimensions.get('window');
    if (width >= 768) {
      return (width - 48) / 3; // 3 columnas con padding
    } else {
      return (width - 40) / 2; // 2 columnas con padding
    }
  });

  // Escuchar cambios en el tamaño de la pantalla
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      if (window.width >= 768) {
        setCardWidth((window.width - 48) / 3); // 3 columnas
      } else {
        setCardWidth((window.width - 40) / 2); // 2 columnas
      }
    });

    return () => subscription?.remove();
  }, []);

  return (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.category} numberOfLines={1}>{product.category}</Text>
      </View>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={(e) => {
          e.stopPropagation();
          toggleFavorite(product);
        }}
      >
        <Text style={styles.heart}>{favorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  info: {
    flex: 1,
    minHeight: 80,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  price: {
    fontSize: 18,
    color: '#e91e63',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 11,
    color: '#999',
    textTransform: 'capitalize',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  heart: {
    fontSize: 22,
  },
});

export default ProductCard;