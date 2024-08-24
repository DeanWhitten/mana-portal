import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faCog } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Mana Vault</h2>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/browse">
            <FontAwesomeIcon icon={faSearch} style={{ marginRight: '8px' }} />
            Browse
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/settings">
            <FontAwesomeIcon icon={faCog} style={{ marginRight: '8px' }} />
            Settings
          </Link>
        </li>
        {/* Add more menu items here as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;