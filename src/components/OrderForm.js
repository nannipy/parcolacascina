import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Helmet } from 'react-helmet';


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
          emailjs.send("service_11i39pr", "template_0il8p48", {
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
    <form className="bg-white p-8 rounded-3xl shadow-l " onSubmit={handleSubmit}>
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
                className="w-full px-3 py-2 border rounded-2xl"
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
                className="w-full px-3 py-2 border rounded-2xl"
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
                className="w-full px-3 py-2 border rounded-2xl"
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
                className="w-full px-3 py-2 border rounded-2xl mb-2 appearance-none"
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
                className="w-full px-3 py-2 border rounded-2xl mb-2"
            />
            <button
                type="button"
                onClick={handleAddProduct}
                className="bg-green-800 text-white px-3 py-2 rounded-2xl appearance-none"
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
                            className="bg-red-500 text-white px-3 py-1 rounded-2xl"
                            >
                            Rimuovi
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        <button onClick={handleSubmit} type="submit" className="bg-yellow-500 text-white px-3 py-2 rounded-2xl ">Invia Ordine</button>
        <div className='pb-4'></div>
        {orderStatus && (
            <div className={`p-4 mb-4 text-white ${orderStatus === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded-2xl `}>
                {orderStatusMessage}
            </div>
        )}
    </form>
  );
};

export default OrderForm;