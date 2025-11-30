# Fashion Finder - React Native App

Una aplicación móvil de comercio electrónico desarrollada con **React Native** y **Expo** que permite explorar, buscar y guardar productos de moda como favoritos.

## 📱 Características

- **Exploración de productos**: Visualiza un catálogo de 20 productos con imágenes, precios y categorías
- **Búsqueda avanzada**: Busca productos por nombre y filtra por categorías
- **Sistema de favoritos**: Guarda tus productos favoritos con persistencia local
- **Vista de detalles**: Consulta información completa de cada producto (descripción, rating, precio)
- **Diseño responsive**: Se adapta perfectamente a móviles, tablets y navegadores web
- **Interfaz moderna**: Diseño limpio con animaciones y transiciones suaves

---

## Tecnologías Utilizadas

- **React Native** - Framework de desarrollo móvil
- **Expo** - Plataforma de desarrollo
- **React Navigation** - Navegación entre pantallas
- **AsyncStorage** - Persistencia de datos local
- **DummyJSON API** - API REST para datos de productos
- **Context API** - Gestión de estado global

---

## Estructura del Proyecto

```
FashionFinder/
├── App.js                          # Punto de entrada y configuración de navegación
├── app.json                        # Configuración de Expo
├── package.json                    # Dependencias del proyecto
├── src/
│   ├── components/                 # Componentes reutilizables
│   │   ├── ProductCard.js         # Tarjeta de producto
│   │   └── SearchBar.js           # Barra de búsqueda
│   ├── screens/                    # Pantallas de la aplicación
│   │   ├── HomeScreen.js          # Pantalla principal con productos
│   │   ├── SearchScreen.js        # Búsqueda y filtros
│   │   ├── FavoritesScreen.js     # Lista de favoritos
│   │   └── DetailScreen.js        # Detalles del producto
│   ├── context/
│   │   └── FavoritesContext.js    # Contexto para manejo de favoritos
│   └── services/
│       └── api.js                 # Funciones para consumir la API
└── assets/                         # Recursos (imágenes, iconos)
```

---

##  Instalación y Configuración

### **Requisitos previos**
- Node.js (v16 o superior)
- npm o yarn
- Expo Go (app móvil para iOS/Android)

### **Paso 1: Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd FashionFinder
```

### **Paso 2: Instalar dependencias**
```bash
npm install
```

### **Paso 3: Iniciar el servidor de desarrollo**
```bash
npx expo start
```

### **Paso 4: Ejecutar la aplicación**

**Opción A - En móvil (recomendado):**
1. Descarga **Expo Go** desde:
   - [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Escanea el código QR que aparece en la terminal
3. La app se abrirá en Expo Go

**Opción B - En navegador web:**
```bash
# Presiona 'w' en la terminal o ejecuta:
npx expo start --web
```

**Opción C - En emulador Android:**
```bash
# Presiona 'a' en la terminal o ejecuta:
npx expo start --android
```

---

## Uso de la Aplicación

### **1. Pantalla Principal (Home)**
- Muestra 20 productos en un grid de 2 columnas
- Cada producto muestra: imagen, título, precio y categoría
- Botones para acceder a **Search** y **Favorites**
- Arrastra hacia abajo (pull to refresh) para recargar productos

### **2. Búsqueda (Search)**
- Barra de búsqueda para filtrar por nombre
- 5 botones de categorías para filtrar productos
- Contador de resultados encontrados
- Botón "Clear filters" para resetear filtros

### **3. Favoritos (Favorites)**
- Lista de productos guardados como favoritos
- Persistencia: los favoritos se guardan localmente
- Botón para volver a Home si no hay favoritos

### **4. Detalles (Detail)**
- Imagen grande del producto
- Descripción completa
- Precio y rating con número de reviews
- Botón para agregar/quitar de favoritos

### **5. Sistema de Favoritos**
- Toca el corazón (🤍) en cualquier producto para agregarlo
- El corazón se llena (❤️) cuando está en favoritos
- Los favoritos persisten incluso después de cerrar la app

---

## API Utilizada

La app consume la **DummyJSON API**, una API REST gratuita y sin necesidad de autenticación:

**Endpoints principales:**
```javascript
// Obtener productos
GET https://dummyjson.com/products?limit=20

// Obtener categorías
GET https://dummyjson.com/products/categories

// Obtener productos por categoría
GET https://dummyjson.com/products/category/{category}
```

**Formato de respuesta de producto:**
```json
{
  "id": 1,
  "title": "Essence Mascara Lash Princess",
  "price": 9.99,
  "description": "The Essence Mascara Lash Princess is...",
  "category": "beauty",
  "thumbnail": "https://...",
  "rating": 4.94,
  "stock": 5
}
```

---

## Componentes Principales

### **ProductCard.js**
Componente reutilizable para mostrar la tarjeta de un producto.

**Props:**
- `product`: Objeto con datos del producto
- `onPress`: Función callback al tocar la tarjeta

**Características:**
- Diseño responsive que se adapta al ancho de pantalla
- Botón de favorito con prevención de propagación de eventos
- Imágenes con aspect ratio fijo

### **SearchBar.js**
Barra de búsqueda simple y limpia.

**Props:**
- `value`: Texto actual de búsqueda
- `onChangeText`: Función callback al cambiar el texto
- `placeholder`: Texto de placeholder

### **FavoritesContext.js**
Context API para gestión global de favoritos.

**Funciones disponibles:**
- `addFavorite(product)`: Agregar producto a favoritos
- `removeFavorite(productId)`: Eliminar producto de favoritos
- `isFavorite(productId)`: Verificar si un producto es favorito
- `toggleFavorite(product)`: Alternar estado de favorito

---
