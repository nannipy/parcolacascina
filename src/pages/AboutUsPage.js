// pages/AboutUsPage.js
import React from 'react';
import { Helmet } from "react-helmet";
import { FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutUsPage = () => {
  return (
    <main className="container mx-auto p-8">
      <Helmet>
        <title>Chi Siamo - Parco La Cascina</title>
        <meta name="description" content="Scopri la storia di Parco La Cascina, un progetto agroforestale biologico nato dal sogno di tre fratelli." />
      </Helmet>
      <motion.section className="mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
  <h2 className="text-3xl font-semibold mb-6 text-yellow-500">Chi Siamo</h2>
  <div className="flex flex-col md:flex-row items-center">
    <div className="bg-white rounded-lg shadow-lg p-6 md:w-2/3 mb-8 md:mb-0"> {/* Contenitore per la foto e la descrizione */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img
            src="images/fratelli.jpg"
            alt="I fratelli Colombo"
            className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 object-cover w-full"
            style={{ height: '500px' }}
          />
        </div>
        <div className="md:w-1/2 md:pl-6">
          <p className="text-green-800 text-3xl font-extrabold leading-relaxed ">
            Parco La Cascina è un progetto agroforestale biologico nato dal sogno di tre fratelli. Creiamo un parco botanico dove la natura è protagonista.
          </p>
        </div>
      </div>
    </div>
    <div className="pl-0 md:pl-32">
      <video
        src="images/reel_plc.mp4"
        style={{ height: '500px' }}
        controls
        autoPlay
        loop
        muted
        className="rounded-lg shadow-lg"
      ></video>
      <a 
        href="https://instagram.com/parcolacascina" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center text-yellow-100 hover:text-yellow-400 transition-colors pt-1"
      >
        <FaInstagram className="mr-2" />
        @parcolacascina
      </a>
    </div>
  </div>
</motion.section>

    </main>
  );
};

export default AboutUsPage;
