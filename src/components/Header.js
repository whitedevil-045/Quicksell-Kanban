import React, { useState } from 'react';
import './Header.css';
import DisplayIcon from '../assets/icons_FEtask/Display.svg';
import DownIcon from '../assets/icons_FEtask/down.svg';

function Header({ grouping, sorting, onGroupingChange, onSortingChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header">
      <div className="display-button" onClick={() => setIsOpen(!isOpen)}>
        <img src={DisplayIcon} alt="Display Icon" className="icon" />
        Display
        <img src={DownIcon} alt="Down Icon" className="icon" />
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="menu-item">
            <span>Grouping</span>
            <select 
              value={grouping}
              onChange={(e) => onGroupingChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="menu-item">
            <span>Ordering</span>
            <select 
              value={sorting}
              onChange={(e) => onSortingChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;