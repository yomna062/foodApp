import React, { useContext, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/images/logosidebar.png';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';

export default function SideBar() {
  const { Logout } = useContext(AuthContext);  

  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);

  const getMenuItemClass = (path) => {
    return location.pathname === path ? 'sidebar-active text-white' : '';
  };

  return (
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          {/* Logo */}
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="Logo"
              className="w-100"
              onClick={toggleIsCollapsed}
              style={{ cursor: 'pointer' }}
            />
          </div>

          {/* Menu Items */}
          <MenuItem
            icon={<i className="fa-solid fa-house"></i>}
            component={<Link to="/dashboard" />}
            className={getMenuItemClass('/dashboard')}
          >
            Home
          </MenuItem>

          <MenuItem
            icon={<i className="fa-solid fa-users"></i>}
            component={<Link to="/dashboard/users" />}
            className={getMenuItemClass('/dashboard/users')}
          >
            Users
          </MenuItem>

          <MenuItem
            icon={<i className="fa-solid fa-utensils"></i>}
            component={<Link to="/dashboard/recipes-list" />}
            className={getMenuItemClass('/dashboard/recipes-list')}
          >
            Recipes
          </MenuItem>

          <MenuItem
            icon={<i className="fa-solid fa-list"></i>}
            component={<Link to="/dashboard/categories-list" />}
            className={getMenuItemClass('/dashboard/categories-list')}
          >
            Categories
          </MenuItem>

          <MenuItem
            icon={<i className="fa-solid fa-key"></i>}
            component={<Link to="/dashboard/changepass" />}
            className={getMenuItemClass('/dashboard/changepass')}
          >
            Change Password
          </MenuItem>

          <MenuItem
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
            onClick={Logout} 
            component={<Link to="/" />}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
