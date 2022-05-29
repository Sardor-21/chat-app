import React from "react";
import { FaBars } from "react-icons/fa";
import "./sidebar.scss";
const Sidebar = ({ setLeftMenu }) => {
  return (
    <div className="sidebar">
      <FaBars className="bars" onClick={() => setLeftMenu(true)} />
    </div>
  );
};

export default Sidebar;
