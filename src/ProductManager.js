import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componente per il form di aggiunta prodotto
const AdminProductForm = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', images: [] });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`image${index}`, file);
    });

    try {
      const response = await axios.post('/api/upload-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setNewProduct({ ...newProduct, images: response.data.imageUrls });
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', newProduct);
      onAddProduct(response.data);
      setNewProduct({ name: '', price: '', images: [] });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Aggiungi Nuovo Prodotto</h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Nome Prodotto</label>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Prezzo (€/Kg)</label>
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Carica Immagini</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-green-800 text-white px-4 py-2 rounded">Aggiungi Prodotto</button>
    </form>
  );
};

// Componente principale che gestisce i prodotti
const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [isAdmin] = useState(false); // Impostare su false in produzione e gestire l'autenticazione

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      {isAdmin && <AdminProductForm onAddProduct={handleAddProduct} />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">€{product.price.toFixed(2)}/Kg</p>
              {isAdmin && (
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                >
                  Elimina
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;