import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileData.css'



function ProfileData({userID}){
    const [profile,setProfile]=useState(null);

    useEffect(() => {
        console.log('Fetching data...');

        // Assuming your server is running on http://localhost:5000
        axios.get('/api/users/'+userID) // Replace 1 with the appropriate user ID
          .then(response => {
            setProfile(response.data); // Assuming the user object has a 'name' property
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [userID]); // The empty dependency array ensures that this effect runs once after the initial render
    
      return (
        <div className="prof">
          {profile ? (
            <div>
              <h2>{profile.name}</h2>
              <p>{profile.tags.join(', ')}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
    }
    
    export default ProfileData;