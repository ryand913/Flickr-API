import React from 'react';
import { Link } from 'react-router-dom';
const Categories = () => {
    return(
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/pyramids">Pyramids</Link>
            </li>
            <li>
              <Link to="/nature">Nature</Link>
            </li>
            <li>
              <Link to="/gorillas">Gorillas</Link>
            </li>
          </ul>
        </nav>
    );
}

export default Categories;
