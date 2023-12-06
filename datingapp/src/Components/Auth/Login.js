import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from '../../actions/reduxActions';
import ErrorRedirect from './Error';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // check if user has logged in already based on local storage
  useEffect(() => {
    const prevData = localStorage.getItem("saveData");
    if (prevData) {
      navigate('/explore');
    }
  }, [userLogin])

  useEffect(() => {
    if (error) console.log(error);
  }, [error])

  useEffect(() => {
    console.log(loading);
  }, [loading])
  

  const navigate = useNavigate();
    const handleClick = () => {
      console.log("Switched to register.");
      navigate ('/register');
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, pass);

    // whenever you use API calls that take JSON data, use HEADERS and dispatch
    dispatch(login(email, pass));
  }
  return (


    <div className="App" style = {{display: "flex", flexDirection: "column"}}>
      {error ? <ErrorRedirect ErrorMessage={ error }/> : null}
      <div className="image-container">
        <img src="/dateWalkLogo.png" alt="logo" style={{ width: '15%', marginBottom: '-10px' }} />
        <p style={{ fontSize: '55px', fontWeight: 'bold', textAlign: 'center', color: 'white', textDecoration: 'none' }}>DateWalk</p>

      </div>

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