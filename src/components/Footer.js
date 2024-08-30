import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaInstagram } from 'react-icons/fa';



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

export default Footer;