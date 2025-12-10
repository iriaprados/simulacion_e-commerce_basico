// ---- Pantalla principal de productos ----

import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Estado para número de columnas que se actualiza dinámicamente
  const [numColumns, setNumColumns] = useState(() => {
    const { width } = Dimensions.get('window');
    return width >= 768 ? 3 : 2;
  });

  // Cargar productos al montar el componente y al cambiar el número de columnas
  useEffect(() => {
    loadProducts();
    
    // Escuchar cambios en el tamaño de la pantalla
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      const newNumColumns = window.width >= 768 ? 3 : 2;
      if (newNumColumns !== numColumns) { // Actualizar solo si ha cambiado
        setNumColumns(newNumColumns);
      }
    });

    // Limpiar el listener al desmontar
    return () => subscription?.remove();
  }, [numColumns]);

  // Función para cargar productos desde la API
  const loadProducts = async () => {

    try {
      setLoading(true); // Iniciar carga
      const data = await getProducts(); // Obtener productos desde la API
      console.log('Products loaded in Home:', data.length); // Log para depuración
      setProducts(data);

    // Manejo de errores
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para refrescar la lista de productos
  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  // Mostrar indicador de carga mientras se obtienen los productos
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Fashion</Text>
        <Text style={styles.headerSubtitle}>{products.length} products available</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.buttonIcon}>🔍</Text>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.buttonIcon}>❤️</Text>
          <Text style={styles.buttonText}>Favorites</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.flatList}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        key={`flatlist-${numColumns}`}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('Detail', { product: item })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#e91e63']} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flatList: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#e91e63',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonSecondary: {
    backgroundColor: '#9c27b0',
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  list: {
    padding: 6,
    paddingBottom: 20,
  },
});

export default HomeScreen;