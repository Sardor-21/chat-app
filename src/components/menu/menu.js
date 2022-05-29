import React from "react";
import "./menu.scss";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
const Menu = ({ currentUser, leftMenu, setLeftMenu }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div
      className={`leftMenu ${leftMenu ? "active" : ""}`}
      onClick={() => setLeftMenu(false)}
    >
      <div className="menu" onClick={(e) => e.stopPropagation()}>
        <div className="menuHeader">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeq156jFRSOu4taqykolM4YfHXC31XmnDS-w&usqp=CAU"
            alt="user"
          />
          <div className="userInfo">
            <p className="userName">{currentUser.username}</p>
            <span>{currentUser.email}</span>
          </div>
        </div>
        <div className="menuCenter">
          <ul>
            <li>
              <div className="icon">
                <CgProfile />
              </div>
              Profilni ko'rish
            </li>
            <li onClick={logout}>
              <div className="icon logout">
                <FiLogOut className="logout-icon" />
              </div>
              Chiqish
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
