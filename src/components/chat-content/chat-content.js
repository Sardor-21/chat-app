import React, { useEffect, useRef, useState } from "react";
import { instance } from "../../api/helper/instance";
import "./chat-content.scss";
import ScrollableFeed from "react-scrollable-feed";

const ChatContent = ({ changedUser, currentUser, socket }) => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const sendMSg = async (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      await instance.post("/message/add-msg", {
        from: currentUser._id,
        to: changedUser._id,
        message: msg,
      });
      socket.current.emit("send-message", {
        to: changedUser._id,
        from: currentUser._id,
        message: msg,
      });
      setMessages([...messages, { fromSelf: true, message: msg }]);
    }
    setMsg("");
  };

  if (socket.current) {
    socket.current.on("message-recieve", (msg) => {
      console.log(msg);
      setMessages([...messages, { fromSelf: false, message: msg }]);
    });
  }

  useEffect(() => {
    if (currentUser && changedUser) {
      async function fetchMessage() {
        try {
          const res = await instance.post("/message/get-msg", {
            from: currentUser._id,
            to: changedUser._id,
          });
          setMessages(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchMessage();
    }
  }, [changedUser]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="chat-content">
      <div className="chat-content-header">
        <h5 className="mb-0">{changedUser.username}</h5>
      </div>
      <ScrollableFeed className="chat-content-messages">
        {messages.map((v, index) => {
          return (
            <React.Fragment key={index}>
              {v.fromSelf ? (
                <div className={`messages me`}>
                  <div className="time">16:00</div>
                  <div className="message">{v.message}</div>
                </div>
              ) : (
                <div className={`messages`}>
                  <div className="message">{v.message}</div>
                  <div className="time">16:00</div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ScrollableFeed>
      <div className="chat-content-footer">
        <form onSubmit={sendMSg}>
          <input
            type="text"
            className="msg-input"
            placeholder="Write a message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />{" "}
          <div className="send-btn">Send</div>
        </form>
      </div>
    </div>
  );
};

export default ChatContent;
