import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import './ProfileData.css'
import ImageDisplay from './ImageDisplay'



function ProfileData({userID}){
    const [profile,setProfile]=useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const infoRef = useRef();
    const [fontSize, setFontSize] = useState('100%');


    useEffect(() => {
        console.log('Fetching data...');

        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/users/${userID}`);
            setProfile(response.data); // Assuming the user object has a 'name' property
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, [userID]);


      useEffect(() => {
        const infoBox = infoRef.current;
    
        if (infoBox) {
          const content = infoBox.querySelector('.content');
    
          if (content) {
            content.style.fontSize = '100%'; // Reset font size before checking overflow
    
            if (content.scrollHeight > infoBox.clientHeight) {
              // Content overflows, adjust font size
              const ratio = infoBox.clientHeight / content.scrollHeight;
              const newFontSize = `${ratio * 100}%`;
              setFontSize(newFontSize);
            }
          }
        }
      }, [profile]);

      const containerStyles = {
        width: "300px",
        height: "300px",
        margin: "0 auto",
        zIndex: 1,
      };
      const buttonContainerStyles = {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      };

      const buttonStyles = {
        position: "absolute",
        top: 0,
        right: 0,
        padding: '10px',
        background: " rgba(231, 75, 130)",
        color:"white",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        zIndex: 3,
      };
    
      return (
        <div className="prof">
          {profile ? (
            <>
        <div className="image" style={containerStyles}>
          <ImageDisplay userData={profile} slides={profile.pic} parentWidth={300} />
        <div style={buttonContainerStyles}>
        <button style={buttonStyles}
            onClick={() => setShowInfo(!showInfo)}>

            {'Info'}

          </button>
          </div>
      </div>
      {showInfo &&(
      <div className="info"ref={infoRef} >
        
        <div className='content'style={{ fontSize }}>
        <p style={{fontWeight:'bold'}}>{"ADDITIONAL INFO"} </p>
        <p>{"Phone #: "+profile.phone}</p>
        <p>{"\n"+profile.tags.join(', ')}</p>
        <p> {profile.bio}</p>
        </div>
        
      </div>
      )}
        </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      );
    }
    
    export default ProfileData;