import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white text-yellow-400 p-4 sticky top-0 z-10 ">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/">
          <div className="flex items-center">
            <img src="/logo.png" alt="Parco La Cascina Logo" className="h-16 mr-8" />
          </div>
        </a>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <div className={`w-6 h-6 relative transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
              {/* Top line */}
              <span
                className={`block absolute h-0.5 w-full bg-yellow-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180 ' : '-translate-y-1.5'}`}
              ></span>
              {/* Middle line */}
              <span
                className={`block absolute h-0.5 w-full bg-yellow-500 transform transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
              ></span>
              {/* Bottom line */}
              <span
                className={`block absolute h-0.5 w-full bg-yellow-500 transform transition-transform duration-300 ${isOpen ? '-rotate-90 ' : 'translate-y-1.5'}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Menu Links for Desktop */}
        <ul className="hidden md:flex space-x-4 text-lg">
          <li><Link to="/" className="hover:text-orange-300 transition-colors font-semibold text-yellow-500">Prodotti</Link></li>
          <li><Link to="/about" className="hover:text-orange-300 transition-colors font-semibold text-yellow-500">Chi Siamo</Link></li>
          <li><Link to="/contact" className="hover:text-orange-300 transition-colors font-semibold text-yellow-500">Contatti</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-8 space-y-2 text-xl ">
          <li><Link to="/" className="block text-yellow-500 hover:text-orange-300 transition-colors font-semibold mt-3">Prodotti</Link></li>
          <li><Link to="/about" className="block text-yellow-500 hover:text-orange-300 transition-colors font-semibold mt-3">Chi Siamo</Link></li>
          <li><Link to="/contact" className="block text-yellow-500 hover:text-orange-300 transition-colors font-semibold mt-3">Contatti</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
