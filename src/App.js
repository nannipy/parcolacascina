import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import './index.css';
import './App.css';
import emailjs from 'emailjs-com';
import './fonts/font-plc.otf';
import { FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import OptimizedCarousel from './Carousel';




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
      <Helmet>
        <title>Ordina Prodotti - Parco La Cascina</title>
        <meta name="description" content="Ordina prodotti freschi come Zucchine, Peperoni, Melanzane e altro da Parco La Cascina. Compila il modulo per inviare il tuo ordine." />
      </Helmet>
      <h2 className="text-2xl font-semibold mb-6 text-green-800">Ordina Prodotti</h2>
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
              className="bg-green-800 text-white px-3 py-2 rounded appearance-none"
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
    <footer className="bg-green-800 text-yellow-100">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-yellow-400">Parco La Cascina</h3>
            <p className="text-sm">Prodotti freschi e naturali dal cuore della nostra terra alla tua tavola.</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">Contatti</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2 text-yellow-400" />
                <a href="tel:+393426623721" className="hover:text-yellow-400 transition-colors">+39 342 662 3721</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-yellow-400" />
                <a href="mailto:parcolacascina@gmail.com" className="hover:text-yellow-400 transition-colors">parcolacascina@gmail.com</a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">Seguici</h4>
            <a 
              href="https://instagram.com/parcolacascina" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-yellow-100 hover:text-yellow-400 transition-colors"
            >
              <FaInstagram className="mr-2" />
              @parcolacascina
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-green-700 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Parco La Cascina. Tutti i diritti riservati.</p>
          <p className="mt-2">
            <a href="/privacy-policy" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
            {' '}&bull;{' '}
            <a href="/termini-e-condizioni" className="hover:text-yellow-400 transition-colors">Termini e Condizioni</a>
          </p>
        </div>
      </div>
    </footer>
  );
};


const heroimages = ["images/cascina2.jpg", "images/cascina.jpg", "images/cassoni_tramonto4.jpg"];

const ParcoLaCascinaWebsite = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-green-900 min-h-screen">
      <Helmet>
        <title>Parco La Cascina - Prodotti Freschi e Naturali | Zucchine, Peperoni, Melanzane</title>
        <meta name="description" content="Scopri i prodotti freschi e di alta qualità di Parco La Cascina. Ordina Zucchine, Peperoni, Melanzane e altro ancora direttamente dalla nostra fattoria a conduzione familiare." />
        <meta name="keywords" content="Parco La Cascina, prodotti freschi, zucchine, peperoni, melanzane, pomodori, agricoltura biologica, verdure fresche" />
        <link rel="canonical" href="https://www.parcolacascina.it" />
        <meta property="og:title" content="Parco La Cascina - Prodotti Freschi e Naturali" />
        <meta property="og:description" content="Ordina prodotti freschi come Zucchine, Peperoni, Melanzane e altro da Parco La Cascina. Agricoltura sostenibile e di qualità." />
        <meta property="og:image" content="https://www.parcolacascina.it/images/og-image.jpg" />
        <meta property="og:url" content="https://www.parcolacascina.it" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto p-8">
        {loading ? (
          <div className="loading-skeleton" aria-label="Caricamento in corso">
            <div className="skeleton-text"></div>
            <div className="skeleton-image"></div>
          </div>
        ) : (
          <>
            <section className="mb-16">
              <h1 className="text-4xl font-semibold mb-6 text-yellow-500">Benvenuti a Parco La Cascina</h1>
              <p className="text-2xl text-white mb-8">
              Tre fratelli, un sogno verde : <br></br>
              Un parco botanico dove la natura è protagonista! Coltiviamo ortaggi freschissimi nella nostra oasi verde
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                <OptimizedCarousel className="carousel"images={heroimages} />
              </div>
            </section>

            <section id="gallery">
              <h2 className="text-3xl font-semibold mb-6 text-yellow-500">I Nostri Prodotti Freschi</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <article key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-lg">
                    <OptimizedCarousel images={product.images} />
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-green-800">{product.name}</h3>
                      </div>
                      <p className="font-semibold mb-6 text-yellow-500">€{product.price.toFixed(2)}/Kg</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
      <section id="orders" className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-6 text-yellow-500">Ordina i Nostri Prodotti</h2>
        <OrderForm products={products} />
      </section>
      <Footer />
    </div>
  );
};

export default ParcoLaCascinaWebsite;