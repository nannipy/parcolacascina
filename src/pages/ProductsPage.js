// pages/ProductsPage.js
import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import OptimizedCarousel from '../components/Carousel';
import OrderForm from '../components/OrderForm';




const ProductsPage = () => {
    const [products] = useState([
        { name: 'Zucchine', price: 4, images: ['images/zucchine.jpg','images/zucchine11.jpg'], },
        { name: 'Peperoni', price: 5, images: ['images/peperoni.jpg', 'images/peperoni2.jpg','images/peperoni3.jpg'], },
        { name: 'Friggitelli', price: 4.5, images: ['images/friggitelli.jpg'],},
        { name: 'Melanzane', price: 4, images: ['images/melanzana_cassetta.jpg','images/melanzana_cassetta2.jpg','images/melanzana.jpg', 'images/melanzana5.jpg'] , },
        { name: 'Pomodori Ciliegino', price: 6.5, images: ['images/pomodori_ciliegino3.jpg', 'images/pomodori_ciliegini5.jpg'], },
        { name: 'Pomodori Datterino', price: 6.5, images: ['images/pomodori_datterino.jpg', ],  },
        { name: 'Pomodori Cuore Di Bue', price: 5.5, images: ['images/pomodori_cuordibue.jpg', ],  },
        { name: 'Cetrioli', price: 4, images: ['images/cetrioli.jpg',],  },
        { name: 'Fagiolini', price: 4, images: ['images/fagiolini.jpg',], },
        ]);

  return (
    <main className="container mx-auto p-8">
        <section className="mb-16">
          <h1 className="text-4xl font-extrabold mb-6 text-yellow-500">Benvenuti a Parco La Cascina</h1>
          <p className="text-2xl font-bold text-white mb-8">
            Tre fratelli, un sogno verde: Un parco botanico dove la natura è protagonista! Coltiviamo ortaggi freschissimi nella nostra oasi verde.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 rounded-lg ">
            <OptimizedCarousel className="carousel " images={["images/cascina2.jpg", "images/cascina.jpg", "images/cassoni_tramonto4.jpg"]} />
          </div>
        </section>
      <Helmet>
        <title>Prodotti Freschi - Parco La Cascina</title>
        <meta name="description" content="Scopri e ordina  i nostri prodotti freschi: Zucchine, Peperoni, Melanzane e altro ancora." />
      </Helmet>
      <h1 id="orders" className="text-4xl font-extrabold mb-6 text-yellow-500">I Nostri Prodotti Freschi</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {products.map((product, index) => (
          <article key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-lg">
            <OptimizedCarousel images={product.images} />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-green-800">{product.name}</h3>
              <p className="font-semibold mb-6 text-yellow-500">€{product.price.toFixed(2)}/Kg</p>
            </div>
          </article>
        ))}
      </section>
      <section id="orders">
        <h2 className="text-3xl font-semibold mb-6 text-yellow-500">Ordina i Nostri Prodotti</h2>
        <OrderForm products={products} />
      </section>
    </main>
  );
};

export default ProductsPage;

