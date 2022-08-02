import React from 'react';
import { Link, NavLink, Redirect, Route, Routes } from 'react-router-dom';
import Search from './Search'
import PhotosList from './PhotosList';

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
