import React, { useState } from "react";
import Input from "../ui/Input";
import "./auth.css";
import { FaFolderPlus } from "react-icons/fa";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";

const Register = () => {
  const initialValues = {
    text: "",
    email: "",
    password: "",
  };
  const [register, setRegister] = useState(initialValues);
  const handleInputChange = (e) => {
    console.log("e value", e.target.type);
    setRegister((prev) => ({ ...prev, [e.target.type]: e.target.value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(register);
    setRegister(initialValues);
  };
  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <FaFolderPlus />
            <p className="auth_heading">Welcome</p>
            <p className="auth_title">Create a new account</p>
          </div>
          <div className="auth_item">
            <label htmlFor="">Name *</label>
            <Input
              required
              placeholder="enter your name"
              type="text"
              onChange={handleInputChange}
              value={register.text}
            />
          </div>
          <div className="auth_item">
            <label htmlFor="">Email *</label>
            <Input
              required
              placeholder="enter your email"
              type="email"
              onChange={handleInputChange}
              value={register.email}
            />
          </div>
          <div className="auth_item">
            <label htmlFor="">Password *</label>
            <Input
              required
              placeholder="enter your password"
              type="password"
              onChange={handleInputChange}
              value={register.password}
            />
          </div>
          <div className="auth_action">
            <Button>Register</Button>
          </div>
          <div>
            <BackToLogin />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
