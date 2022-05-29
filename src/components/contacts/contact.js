import React from "react";
import "./contact.scss";
const Contact = ({ contact, changeUser, changedUser = {} }) => {
  return (
    <div className="left contact">
      <div className="contact-header">
        <div className="search">
          <input type="text" className="search-input" placeholder="Search" />
        </div>
      </div>
      <ul className="contact-menu">
        {contact.length > 0 &&
          contact.map((v, i) => {
            return (
              <li
                className={`contact-menu-item ${
                  v._id === changedUser._id ? "active" : ""
                }`}
                key={i}
                onClick={() => changeUser(v._id)}
              >
                <div className="left-item">
                  <div className="img">
                    <img
                      src="https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png"
                      alt="user"
                    />
                    <div className={`isOnline ${v.isOnline ? "online" : ""}`} />
                  </div>
                  <div>
                    <h6 className="user-name">{v.username}</h6>
                    <div className="last-message">a</div>
                  </div>
                </div>
                <span>18:00</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Contact;
