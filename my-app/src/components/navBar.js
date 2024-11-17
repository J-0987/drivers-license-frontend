import react from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-indigo-600 p-4">
      <ul className="flex justify-between">
        <li>
          <Link to="/" className="text-white">Home</Link>
        </li>
        <li>
          <Link to="/about" className="text-white">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;