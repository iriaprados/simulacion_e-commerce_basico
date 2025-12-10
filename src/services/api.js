const API_URL = 'https://dummyjson.com';

export const getProducts = async () => {
  try {
    console.log(' Fetching products from DummyJSON...');
    const response = await fetch(`${API_URL}/products?limit=20`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(' Products loaded:', data.products.length);
    
    // Adaptar la respuesta al formato esperado por nuestra app
    return data.products.map(product => ({

      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.thumbnail,
      rating: {
        rate: product.rating || 4.5,
        count: product.stock || 100
        
      }
    }));
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    console.log(' Fetching categories from DummyJSON...');
    const response = await fetch(`${API_URL}/products/categories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Categories loaded:', data.length);
    
    // DummyJSON devuelve objetos {slug, name, url}, necesitamos solo el slug
    const categoryNames = data.map(cat => cat.slug || cat.name || cat).slice(0, 5);
    console.log('✅ Processed categories:', categoryNames);
    
    return categoryNames;
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    console.log(' Fetching products for category:', category);
    const response = await fetch(`${API_URL}/products/category/${category}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Adaptar la respuesta
    return data.products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.thumbnail,
      rating: {
        rate: product.rating || 4.5,
        count: product.stock || 100
      }
    }));
  } catch (error) {
    console.error('❌ Error fetching products by category:', error);
    throw error;
  }
};

export const searchProducts = (products, query) => {
  if (!query || !query.trim()) return products;
  const lowerQuery = query.toLowerCase().trim();
  return products.filter(product =>
    product.title.toLowerCase().includes(lowerQuery)
  );
};