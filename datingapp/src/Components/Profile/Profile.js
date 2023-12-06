import React, { useState, useEffect } from 'react';
import ImageSlider from "./ImageSlider";
import Bio from "./Bio";
import CreateIcon from '@mui/icons-material/Create';
import IconButton from "@material-ui/core/IconButton";
import ProfileEditor from "./ProfileEditor";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar/Navbar.js';

const Profile = () => {

  const [loading, setLoading] = useState(true); 
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();


useEffect(() => {
  const prevData = localStorage.getItem("saveData");
  if (!prevData) {
    navigate('/');
  } else {
    const parsedData = JSON.parse(prevData);
    getUser(parsedData._id);
    
  }
}, [navigate])

const getUser = async (uid) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/${uid}`);
    // console.log(response.data); // Handle the response from the server
    setUserData(response.data);
  } catch (error) {
    console.error('Error updating user data:', error);
  }
  finally {
    setLoading(false); // Set loading to false once data is fetched or if an error occurs
  }
};


  
  const containerStyles = {
    width: "800px",
    height: "600px",
    margin: "0 auto",
    zIndex: 1,
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
    <NavBar />
    <div className="content-container">
    <div style={{ display: 'flex', gap: '10px', justifyContent: "center" }}>
      {loading ? (
          // Display a loading indicator or message while data is being fetched
          <p>Loading Bio...</p>
        ): (
          
      <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
        <div style={containerStyles}>
          <ImageSlider slides={userData.pic} otherData={userData} parentWidth={800} />
        </div>
         
          <React.Fragment>
            <Bio userData={userData} />
            <IconButton onClick={handleShow} style={{ color: "rgba(255, 255, 255, 0.5)", position: 'absolute', bottom: '3px', right: '3px' }}>
              <CreateIcon />
            </IconButton>
          </React.Fragment>
          

          <ProfileEditor show={show} onHide={handleClose} userData={userData} setUserData = {setUserData}/>
        
      </div>
      )}
      

    </div>
    </div>
        </div>
  );
};

export default Profile;
