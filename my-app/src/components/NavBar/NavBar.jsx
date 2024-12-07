import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/ontario-logo.jpg';
import './NavBar.scss';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className='navbar'>
      <div className='navbar__logo'>
        <Link to="/">
        <div className='navbar__logo'>
        <Link to="/">
          <div className="logo-container">
            {/* <img className="logo-image" src={logo} alt="ontario-logo" /> */}
            <h1>Ontario</h1>
          </div>
        </Link>
      </div>
        </Link>
      </div>
      <div className='navbar__menu' ref={menuRef}>
        <button 
          className={`menu-button ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✕' : '≡'} Menu
        </button>
        {isMenuOpen && (
          <div className='menu-dropdown'>
            <ul className='navbar__links'>
              <li>
                <Link to="/applications" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/application-form" onClick={() => setIsMenuOpen(false)}>
                  Start New Application
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
