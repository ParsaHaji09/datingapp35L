import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileData.css'
import ImageDisplay from './ImageDisplay'



function ProfileData({userID}){
    const [profile,setProfile]=useState(null);

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

      const containerStyles = {
        width: "300px",
        height: "300px",
        margin: "0 auto",
        zIndex: 1,
      };
    
      return (
        <div className="prof" >
          {profile ? (
            <>
        <div className="image">
        <div style={containerStyles}>
          <ImageDisplay userData={profile} slides={profile.pic} parentWidth={300} />
        </div>
      </div>
      <div className="info" >
      <p>{profile.bio}</p>
        <p>{profile.tags.join(', ')}</p>
        <p>{"Phone #: "+profile.phone}</p>
      </div>
        </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      );
    }
    
    export default ProfileData;