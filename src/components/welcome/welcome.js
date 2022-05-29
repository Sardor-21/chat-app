import React from "react";
import welcomeGif from "../../assets/images/robot.gif";
import "./welcome.scss";
import welcomeJpg from "../../assets/images/welcome.jpg";
const Welcome = ({ currentUser }) => {
  return (
    <div className="welcome">
      <img src={welcomeJpg} alt="welcomegif" />
      {/* <div>
        Salom <span>{currentUser.username}</span> chatimizga <br /> xush kelibsiz{" "}
      </div> */}
    </div>
  );
};

export default Welcome;
