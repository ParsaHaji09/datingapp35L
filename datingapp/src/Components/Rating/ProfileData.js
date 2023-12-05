import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileData.css'



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
    
      return (
        <div className="prof">
          {profile ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              {profile.pic && <img src={profile.pic} alt="img" style={{ width: '120px', height: '120px', borderRadius: '10px',objectFit: 'cover' }}/>}
              
              <h2>{profile.name}</h2>
              </div>
              <p>{profile.tags.join(', ')}</p>
              <p>{profile.birthday}&nbsp;&nbsp;{profile.phone}</p>
            </div>
            
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
    }
    
    export default ProfileData;