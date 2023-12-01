import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Explore() {


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


  return (
    <div>
      <h1>{ userData.name }</h1>
    </div>
  );
}

export default Explore;
