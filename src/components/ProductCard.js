
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');
// Calcular el ancho exacto para que quepan 2 tarjetas completas sin cortarse
const cardWidth = (width - 20) / 2;

// Componente para mostrar la tarjeta de un producto
const ProductCard = ({ product, onPress }) => {

  const { isFavorite, toggleFavorite } = useFavorites(); // Usar el contexto de favoritos
  const favorite = isFavorite(product.id); // Verificar si el producto es favorito

  return ( // Renderizar la tarjeta del producto

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

// Estilos para el componente ProductCard
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    margin: 5,
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