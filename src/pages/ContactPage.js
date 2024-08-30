import React from 'react';
import { Helmet } from "react-helmet";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <main className="container mx-auto p-8">
      <Helmet>
        <title>Contatti - Parco La Cascina</title>
        <meta name="description" content="Contattaci per informazioni sui nostri prodotti o per organizzare una visita a Parco La Cascina." />
      </Helmet>
      <h1 className="text-4xl font-extrabold mb-6 text-yellow-500">Contattaci</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Informazioni di Contatto</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2 text-yellow-500" />
                <a href="tel:+393426623721" className="hover:text-yellow-500 text-green-700 transition-colors">+39 342 662 3721</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-yellow-500" />
                <a href="mailto:parcolacascina@gmail.com" className="hover:text-yellow-500 text-green-700  transition-colors">parcolacascina@gmail.com</a>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-yellow-500 " />
                <p className='text-green-700 '> Via dei Canneti, 1, 21020 Bodio Lomnago VA</p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Orari di Apertura</h2>
            <p className="mb-2 text-green-700 ">Lunedì - Venerdì: 9:00 - 17:00</p>
            <p className="mb-2 text-green-700 ">Sabato: Chiuso</p>
            <p className="text-green-700">Domenica: Chiuso</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">La nostra posizione</h2>
        <div className="relative w-full h-0 pb-[35%]">
          <iframe 
            title="Parco La Cascina Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d695.4608048163985!2d8.7488587!3d45.7943686!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867c1f1be44223%3A0xe5f5c2833e0db7dd!2sVia%20dei%20Canneti%2C%201%2C%2021020%20Bodio%20Lomnago%20VA!5e0!3m2!1sit!2sit!4v1725029984811!5m2!1sit!2sit" 
            className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <p>
      <br></br>
      </p>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 ">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">Inviaci un Messaggio</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Nome</label>
            <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="message">Messaggio</label>
            <textarea id="message" name="message" rows="4" className="w-full px-3 py-2 border rounded" required></textarea>
          </div>
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">Invia Messaggio</button>
        </form>
      </div>
     
    </main>
  );
};

export default ContactPage;