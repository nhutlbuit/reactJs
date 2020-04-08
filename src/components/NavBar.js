import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = props => (
  <nav className="column is-2 menu">
    <p className="menu-label">Menu</p>
    <ul className="menu-list">
      <NavLink to="/heroes" activeClassName="active-link">
        Note
      </NavLink>
      <NavLink to="/villains" activeClassName="active-link">
        Villains
      </NavLink>
      <NavLink to="/example" activeClassName="active-link">
        Sum2Numbers
      </NavLink>
      <NavLink to="/hook" activeClassName="active-link">
        React Hook
      </NavLink>
      <NavLink to="/todolist" activeClassName="active-link">
        ToDo List
      </NavLink>
      <NavLink to="/redux" activeClassName="active-link">
        Redux Hooks
      </NavLink>
      <NavLink to="/student-dash-board" activeClassName="active-link">
        Student Dash Board
      </NavLink>
      <NavLink to="/about" activeClassName="active-link">
        About
      </NavLink>
    </ul>
    {props.children}
  </nav>
);

export default NavBar;
