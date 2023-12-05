
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Explore.css'
import Search from './Search';
import GalleryScroll from './GalleryScroll';

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
      if (parsedData.pic !== undefined && parsedData.pic !== "") {
        setPfp(parsedData.pic);
      }
    }
  }, [])

  
  return (
    <div className='total-explore'>
      <div className='search'><Search /></div>
      <div className='gallery'><GalleryScroll/></div>
      
    </div>
  )
    
}


export default Explore;