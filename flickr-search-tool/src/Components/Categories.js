import React from 'react';
import { NavLink} from 'react-router-dom';


const Categories = () => (

        <nav className="main-nav">
          <ul>
            <li>
              <NavLink to="/pyramids">Pyramids</NavLink>
            </li>
            <li>
              <NavLink to="/nature">Nature</NavLink>
            </li>
            <li>
            <NavLink to="/bears">Bears</NavLink>
            </li>
          </ul>
        </nav>
    );

export default Categories;
