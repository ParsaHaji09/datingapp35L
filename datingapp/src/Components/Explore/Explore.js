import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/reduxActions';
import Search from './Search';
import axios from 'axios';
import GenericProfile from '../Profile/GenericProfile';
import './Explore.css'


/*TODO: Explore page match processing
  - some sort of algorithm to rank all other users in terms of compatibility (on page load)
  - remember to filter our users that the user has already seen somehow??
  - implement like/dislike feature (pass data in generic profile -> bio?) add to other user's incoming first, then check if the other user is in incoming list 
    then add to match list... i can explain more if u want.
*/


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


  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  }

  const toRating = () => {
    const data = { userData };
    navigate('/rating', { state: { data } });
  }


  return (
    <div>
    {loading | selfLoading ? (
      // Display a loading indicator or message while data is being fetched
      <p>Loading Page...</p>
    ): (
      <div>
        <h1>{ userData.name }</h1>
        <img src={userData.pic[0]} style={{ width: '100px' }} />
        <Button type = "submit" onClick = {logoutHandler}>Logout</Button>
        <Button type = "submit" onClick = {toRating}>To Rating</Button>
        <Search />
        {users.map((user, index) => (
             <GenericProfile userData={user} other_uid={userData._id}></GenericProfile>
        ))}
       
      </div>
    )}
    </div>
    
  )
    
}


export default Explore;