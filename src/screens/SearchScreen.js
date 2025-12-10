// ---- Pantalla de búsqueda de productos ----

import React, { useState, useEffect } from 'react';

// Importar componentes de React Native
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { getProducts, getCategories, searchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

// Calcular número de columnas según el ancho de pantalla
const { width } = Dimensions.get('window');
const numColumns = width > 768 ? 4 : 2;

// Componente principal de la pantalla de búsqueda
const SearchScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]); // Lista completa de productos
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [categories, setCategories] = useState([]); // Lista de categorías
  const [searchQuery, setSearchQuery] = useState(''); // Consulta de búsqueda
  const [selectedCategory, setSelectedCategory] = useState('all'); // Categoría seleccionada
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Cargar productos y categorías al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  // Filtrar productos cuando cambie la búsqueda o categoría
  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, products]);

  // Función para cargar productos y categorías desde la API
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Cargar productos y categorías
      const productsData = await getProducts();
      const categoriesData = await getCategories();
      
      console.log('Products loaded:', productsData.length);
      console.log('Categories loaded:', categoriesData);
      
      // Actualizar estados
      setProducts(productsData);
      setCategories(['all', ...categoriesData]);
      setFilteredProducts(productsData);

      // Control de errores 
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Error loading products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Función para filtrar productos según búsqueda y categoría
  const filterProducts = () => {
    let filtered = [...products];

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      filtered = searchProducts(filtered, searchQuery);
    }

    console.log('Filtered products:', filtered.length);
    setFilteredProducts(filtered); // Actualizar productos filtrados
  };

  // Función para limpiar filtros
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  // Renderizado condicional según estado de carga o error
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  // Manejo de errores
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by name..."
      />

      {categories.length > 0 && (
        <View style={styles.categoriesContainer}>
          <View style={styles.categoriesHeader}>
            <Text style={styles.categoriesTitle}>Categories</Text>
            {(searchQuery || selectedCategory !== 'all') && (
              <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
                <Text style={styles.clearText}>Clear filters</Text>
              </TouchableOpacity>
            )}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryButton,
                  selectedCategory === item && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item && styles.categoryTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      <FlatList
        style={styles.flatList}
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        nestedScrollEnabled={true}
        removeClippedSubviews={false}
        key={numColumns}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('Detail', { product: item })}
          />
        )}
        contentContainerStyle={filteredProducts.length === 0 ? styles.emptyList : styles.list}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery 
                ? 'Try a different search term' 
                : selectedCategory !== 'all' 
                  ? 'Try a different category' 
                  : 'No products available'}
            </Text>
            {(searchQuery || selectedCategory !== 'all') && (
              <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
                <Text style={styles.clearFiltersButtonText}>Clear all filters</Text>
              </TouchableOpacity>
            )}
          </View>
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
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#e91e63',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesContainer: {
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearText: {
    color: '#e91e63',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  categoryButtonActive: {
    backgroundColor: '#e91e63',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  resultsHeader: {
    padding: 12,
    backgroundColor: 'white',
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  emptyList: {
    paddingTop: 40,
  },
  emptyContainer: {
    flex: 1,
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  clearFiltersButton: {
    backgroundColor: '#e91e63',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  clearFiltersButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SearchScreen;