import React from "react";
import "./backToLogin.css";
import { FaArrowLeftLong } from "react-icons/fa6";

const BackToLogin = () => {
  return (
    <div className="back_to_login">
      <FaArrowLeftLong />
      <span> BackToLogin</span>
    </div>
  );
};

export default BackToLogin;
