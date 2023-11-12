import { React, useEffect } from 'react';
import axios from 'axios';

function Login() {

  const fetchUsers = async() => {
    const data = await axios.get('/api/users');
    console.log(data);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <div>
      <h1>Login!</h1>
    </div>
  );
}

export default Login;


