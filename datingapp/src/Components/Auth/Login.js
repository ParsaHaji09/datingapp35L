import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const navigate = useNavigate();
    const handleClick = () => {
      console.log("Switched to register.");
      navigate ('/register');
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }
  return (
    <div className="App">
    <div className="auth-form-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor ="email">email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter here" id="email" name="email"/>
      <label htmlFor="password">password</label>
      <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="******" id="password" name="password"/>
      <button className="button" type="submit">Log In</button>
    </form>
    <button className="link-btn" onClick={handleClick}> Don't have an account? Register here.</button>
    </div>
    </div>
  );
}

export default Login;