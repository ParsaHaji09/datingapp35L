import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/reduxActions';

function Explore() {

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const prevData = localStorage.getItem("saveData");
    if (!prevData) {
      navigate('/');
    } else {
      setUserData(JSON.parse(prevData));
      console.log(prevData);
    }
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  }


  return (
    <div>
      <h1>{ userData.name }</h1>
      <button type = "submit" onClick = {logoutHandler}>Logout</button>
    </div>
  );
}

export default Explore;
