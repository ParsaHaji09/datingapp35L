
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Explore.css'
import Search from './Search';

function Explore() {

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const navigate = useNavigate();
  const [selfLoading, setselfLoading] = useState(true); 
  const [loading, setLoading] = useState(true); 
  const [userData, setUserData] = useState({});

  const [users, setUsers] = useState({});
 
useEffect(() => {
  const prevData = localStorage.getItem("saveData");
  if (!prevData) {
    navigate('/');
  } else {
    const parsedData = JSON.parse(prevData);
    getUser(parsedData._id);
    getAllUsers(parsedData._id);
  }
}, [navigate])

const getUser = async (uid) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/${uid}`);
    console.log(response.data); // Handle the response from the server
    setUserData(response.data);
  } catch (error) {
    console.error('Error updating user data:', error);
  }
  finally {
    setselfLoading(false); // Set loading to false once data is fetched or if an error occurs
  }
};

const getAllUsers = async (uid) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/all-users`);
    console.log(response.data); // Handle the response from the server
    setUsers(response.data);
  } catch (error) {
    console.error('Error updating user data:', error);
  }
  finally {
    setLoading(false); // Set loading to false once data is fetched or if an error occurs
  }
  
};


  
  return (
    <div>
      <h1>{ name }</h1>
      <img src = { pfp } />
      <Button type = "submit" onClick = {logoutHandler}>Logout</Button>
      <Button type = "submit" onClick = {toRating}>To Rating</Button>
      <Search />
    </div>
    
  )
    
}


export default Explore;