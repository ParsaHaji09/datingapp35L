import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // check if user has logged in already based on local storage
  // TODO:  UNCOMMENT ON FINAL VERSION
  // useEffect(() => {
  //   const prevData = localStorage.getItem("saveData");
  //   if (prevData) {
  //     navigate('/explore');
  //   }
  // }, [])
  

  const navigate = useNavigate();
    const handleClick = () => {
      console.log("Switched to register.");
      navigate ('/register');
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, pass);

    // whenever you use API calls that take JSON data, use HEADERS
    try {
      const config = {
        headers: {
          "Content-type":"application/json",
        }
      };

      setLoading(true);
      
      const { data } = await axios.post('/api/users/login', {
        email: email, 
        password: pass,
      }, config);

      // local storage for our email and password
      // console.log(data);
      localStorage.setItem('saveData', JSON.stringify(data));
      setLoading(false);
      navigate('/explore', { state: { data } });

    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }
  return (
    <div className="App">
    <div className="auth-form-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor ="email">Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter here" id="email" name="email"/>
      <label htmlFor="password">Password</label>
      <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="******" id="password" name="password"/>
      <button className="button" type="submit">Log In</button>
    </form>
    <button className="link-btn" onClick={handleClick}> Don't have an account? Register here.</button>
    </div>
    </div>
  );
}

export default Login;