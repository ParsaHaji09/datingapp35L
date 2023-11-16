import React, { useState } from 'react';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log('Register component submitted with email:', email);
  }
  return (
    <div className="auth-form-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Full name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="full name"/>
      <label htmlFor ="email">email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter here" id="email" name="email"/>
      <label htmlFor ="password">password</label>
      <input value={pass} onChange={(e) => setPass (e.target.value)} type="password" placeholder="******" id="password" name="password"/>
      <button className="button" type="submit">Log In</button>
    </form>
    <button className="link-btn" onClick={() => props.onFormSwitch("login")}> Already have an account? Log in here.</button>
    </div>
  );
}

export default Register;