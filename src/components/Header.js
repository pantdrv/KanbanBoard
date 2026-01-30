import React, { useState } from "react";
import DisplaySVG from "../icons/Display.svg";
import DownSVG from "../icons/down.svg";
import "../classes/board.css"

const Header = ({ onGroupChange, onSortChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      <div className="header">
        <div class="dropdown-toggle" onClick={toggleDropdown}>
          <img src={DisplaySVG} />
          Display
          <img src={DownSVG} />
        </div>
        {isVisible && (
          <div class="dropdown-container">
            <div className="dropdown">
              <label>Group by: </label>
              <select className="dropdown-select" onChange={(e) => onGroupChange(e.target.value)}>    
                <option value="user">User</option>
                <option value="status">Status</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="dropdown">
              <label>Sort by: </label>
              <select className="dropdown-select" onChange={(e) => onSortChange(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
