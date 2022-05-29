import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import contactAndChat from "../../api/contact-chat";
import ChatContent from "../../components/chat-content/chat-content";
import Contact from "../../components/contacts/contact";
import { io } from "socket.io-client";
import Welcome from "../../components/welcome/welcome";
import Sidebar from "../../components/sidebar/sidebar";
import "./chat.scss";
import Menu from "../../components/menu/menu";
const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef(null);
  const [contact, setContact] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [changedUser, setChangedUser] = useState(undefined);
  const [leftMenu, setLeftMenu] = useState(false);
  console.log(currentUser);
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    if (currentUser) {
      socket.current = io(process.env.REACT_APP_BASE_URL);
      socket.current.emit("add-user", currentUser._id);
      contactAndChat.getContact(currentUser._id, setContact);
    }
  }, []);
  if (contact.length > 0) {
    const cloneContact = [...contact];
    socket.current.on("online-users", (users) => {
      const onlineUsers = Object.values(users);
      cloneContact.forEach((item) => {
        onlineUsers.forEach((id) => {
          if (id === item._id) {
            item.isOnline = true;
          }
        });
      });
      setContact(cloneContact);
    });
  }
  if (contact.length > 0) {
    const cloneContact = [...contact];
    socket.current.on("ofline-users", (users) => {
      const onlineUsers = Object.values(users);
      cloneContact.forEach((item) => {
        onlineUsers.forEach((id) => {
          if (id === item._id) {
            item.isOnline = false;
          }
        });
      });
      setContact(cloneContact);
    });
  }

  const changeUser = (id) => {
    setChangedUser(contact.filter((v) => v._id === id)[0]);
  };
  return (
    <div className="chat">
      <div className="container chat-container">
        {currentUser && (
          <>
            <Menu
              currentUser={currentUser}
              leftMenu={leftMenu}
              setLeftMenu={setLeftMenu}
            />
            <Sidebar setLeftMenu={setLeftMenu} />
            <Contact
              contact={contact}
              changeUser={changeUser}
              changedUser={changedUser}
            />
            <div className="right">
              {changedUser === undefined ? (
                <Welcome currentUser={currentUser} />
              ) : (
                <ChatContent
                  changedUser={changedUser}
                  currentUser={currentUser}
                  socket={socket}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
