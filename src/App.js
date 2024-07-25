import React, { useState } from 'react';
import './index.css';
import './App.css';
import Carousel from './Carousel';
import emailjs from 'emailjs-com';

const products = [
  { name: 'Zucchine', price: 4, images: ['images/zucchine.jpg','images/zucchine11.jpg'], },
  { name: 'Peperoni', price: 5, images: ['images/peperoni.jpg', 'images/peperoni2.jpg','images/peperoni3.jpg'], },
  { name: 'Friggitelli', price: 4.5, images: ['images/friggitelli.jpg'],},
  { name: 'Melanzane', price: 4, images: ['images/melanzana_cassetta.jpg','images/melanzana_cassetta2.jpg','images/melanzana.jpg', 'images/melanzana5.jpg'] , },
  { name: 'Pomodori Ciliegino', price: 6.5, images: ['images/pomodori_ciliegino3.jpg', 'images/pomodori_ciliegini5.jpg'], },
  { name: 'Pomodori Datterino', price: 6.5, images: ['images/pomodori_datterino.jpg', ],  },
  { name: 'Pomodori Cuore Di Bue', price: 5.5, images: ['images/pomodori_cuordibue.jpg', ],  },
  { name: 'Cetrioli', price: 4, images: ['images/cetrioli.jpg',],  },
  { name: 'Fagiolini', price: 4, images: ['images/fagiolini.jpg',], },
];


const OrderForm = () => {
  const [orderStatus, setOrderStatus] = useState(null); // 'success', 'error', or null
  const [orderStatusMessage, setOrderStatusMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orders: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = () => {
    if (selectedProduct && quantity) {
      setFormData({
        ...formData,
        orders: [...formData.orders, { product: selectedProduct, quantity }],
      });
      setSelectedProduct('');
      setQuantity('');
    }
  };

  const handleRemoveProduct = (index) => {
    const newOrders = formData.orders.filter((_, i) => i !== index);
    setFormData({ ...formData, orders: newOrders });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        orders: formData.orders.map(order => `${order.product} - ${order.quantity} Kg`).join(', '),
    };
    emailjs.send("service_11i39pr", "template_z6p20fg", {
        from_name: formData.name,
        to_name: "Parco La Cascina",
        message: templateParams.orders,
        email: formData.email,
        phone: formData.phone,
        name: formData.name
    }, "PV6cCpBY75UPr_U-g")
        .then((response) => {
            setOrderStatus('success');
            setOrderStatusMessage('Ordine inviato con successo!');
        }, (err) => {
            setOrderStatus('error');
            setOrderStatusMessage('Errore nell\'invio dell\'ordine. Riprova.');
        });
};


return (
  <form className="bg-white p-8 rounded-lg shadow-l " onSubmit={handleSubmit}>
      
      <h2 className="text-2xl font-semibold mb-6">Ordina Prodotti</h2>
      <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Nome</label>
          <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
          />
      </div>
      <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
          <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
          />
      </div>
      <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">Numero di Telefono</label>
          <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
          />
      </div>
      <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="product">Prodotti</label>
          <select
              id="product"
              name="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2 appearance-none"
          >
              <option value="">Seleziona un prodotto</option>
              {products.map((product, index) => (
                  <option key={index} value={product.name}>{product.name}</option>
              ))}
          </select>
          <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantità (Kg)"
              className="w-full px-3 py-2 border rounded mb-2"
          />
          <button
              type="button"
              onClick={handleAddProduct}
              className="bg-green-500 text-white px-3 py-2 rounded appearance-none"
          >
              Aggiungi Prodotto
          </button>
      </div>
      <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Prodotti Selezionati</h3>
          <ul className="list-disc list-inside ">
              {formData.orders.map((order, index) => (
                  <li key={index} className="flex justify-between items-center pb-4 ">
                      {order.product} - {order.quantity} Kg
                      <button
                          type="button"
                          onClick={() => handleRemoveProduct(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                          Rimuovi
                      </button>
                  </li>
              ))}
          </ul>
      </div>
      <button onClick={handleSubmit} type="submit" className="bg-yellow-500 text-white px-3 py-2 rounded ">Invia Ordine</button>
      <div className='pb-4'></div>
      {orderStatus && (
          <div className={`p-4 mb-4 text-white ${orderStatus === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded `}>
              {orderStatusMessage}
          </div>
      )}
  </form>
);
};
const Navbar = () => {
  return (
    <nav className="bg-white text-yellow-400 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="logo.png" alt="Parco La Cascina Logo" className="h-16 mr-8" />
        </div>
        <ul className="flex space-x-4">
          <li><a href="#gallery" className="hover:text-orange-300 transition-colors font-semibold mb-6 text-yellow-500">Galleria Prodotti</a></li>
          <li><a href="#orders" className="hover:text-orange-300 transition-colors font-semibold mb-6 text-yellow-500">Ordini</a></li>
        </ul>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (

    <footer className="bg-white text-yellow-400 p-4">
      
   
    
      <div className="container mx-auto flex justify-between items-center ">
        <div className='flex-2'>
        <p className='font-bold'>Contatti</p>
        <p>Telefono: +39 342 662 3721 </p>
        <p>Email:parcolacascina@gmail.com</p>
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center flex-1">
        <p>©2024 Parco La Cascina. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
}

const heroimages = ["images/cascina2.jpg", "images/cascina.jpg", "images/cassoni_tramonto4.jpg"];

const ParcoLaCascinaWebsite = () => {


  return (
    <div className="bg-green-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8">
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-yellow-500">La Nostra Storia</h2>
          <p className="text-lg text-yellow-500 mb-8">
            Parco La Cascina è stata fondata da tre fratelli appassionati di agricoltura.
            La nostra missione è fornire prodotti freschi e di alta qualità ai nostri clienti.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            <Carousel images={heroimages} />
          </div>
        </section>

        <section id="gallery">
          <h2 className="text-3xl font-semibold mb-6 text-yellow-500">Galleria Prodotti</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-lg">
                <Carousel images={product.images} />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-green-800">{product.name}</h3>
                    
                  </div>
                  <p className="font-semibold mb-6 text-yellow-500">€{product.price.toFixed(2)}/Kg</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div id="orders" className="container mx-auto p-8">
        <OrderForm products={products} />
      </div>

      <Footer />
    </div>
  );
};

export default ParcoLaCascinaWebsite;
