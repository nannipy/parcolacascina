import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white text-yellow-400 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/">
        <div className="flex items-center">
          <img src="/logo.png" alt="Parco La Cascina Logo" className="h-16 mr-8" />
        </div>
        </a>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-orange-300 transition-colors font-semibold text-yellow-500">Prodotti</Link></li>
          <li><Link to="/about" className="hover:text-orange-300 transition-colors font-semibold text-yellow-500">Chi Siamo</Link></li>
          <li><Link to="/contact" className="hover:text-orange-300 transition-colors font-semibold text-yellow-500">Contatti</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;