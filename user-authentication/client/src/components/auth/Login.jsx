import React from "react";
import "./auth.css";
import Input from "../ui/Input";
import Button from "../ui/Button";
const Login = () => {
  return (
    <div className="auth_main">
      <form>
        <div className="auth_container">
          <div className="auth_header">
            <p className="auth_heading">Welcome back</p>
            <p className="auth_title">login to continue</p>
          </div>
          <div className="auth_item">
            <label htmlFor="">Email *</label>
            <Input
              required
              placeholder="enter your email"
              type="email"
              //   onChange={handleInputChange}
              //   value={register.email}
            />
          </div>
          <div className="auth_item">
            <label htmlFor="">Password *</label>
            <Input
              required
              placeholder="enter your password"
              type="password"
              //   onChange={handleInputChange}
              //   value={register.password}
            />
          </div>
          <div className="auth_action">
            <Button>Login</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
