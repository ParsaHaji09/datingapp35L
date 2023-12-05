
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/reduxActions';
import Search from './Search';

function Explore() {

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [name, setUserName] = useState("");
  const [pfp, setPfp] = useState("");

  useEffect(() => {
    const prevData = localStorage.getItem("saveData");
    if (!prevData) {
      navigate('/');
    } else {
      const parsedData = JSON.parse(prevData);
      setUserData(parsedData);
      setUserName(parsedData.name);
      if (parsedData.pic[0] !== undefined && parsedData.pic[0] !== "") {
        setPfp(parsedData.pic[0]);
      }
    }
  }, [])

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
      <h1>{ name }</h1>
      <img src = { pfp } />
      <Button type = "submit" onClick = {logoutHandler}>Logout</Button>
      <Button type = "submit" onClick = {toRating}>To Rating</Button>
      <Search />
    </div>
  )
    
}


export default Explore;