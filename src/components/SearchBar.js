import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChangeText, placeholder }) => { // Componente de barra de búsqueda
  return ( // Contenedor de la barra de búsqueda
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Search products...'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  ); // Entrada de texto para la búsqueda
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default SearchBar; // Exporta el componente SearchBar