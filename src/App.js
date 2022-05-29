import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/chat/chat";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // const [name, setName] = useState("");
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   socket.emit("user_connected", name);
  // };
  // const handleOnchange = (e) => {
  //   setName(e.target.value);
  // };

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
