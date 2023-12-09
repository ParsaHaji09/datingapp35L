import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDetails({userID}){
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
        <div className="person">
          {profile ? (
            <div>
               <div style={{ display: 'flex', alignItems: 'center'}}>
              {profile.pic && <img src={profile.pic[0]} alt="img" style={{ width: '50px', height: '50px', borderRadius: '50%',objectFit: 'cover' }}/>}
              
              <h2 style={{ fontSize: '20px' }}>{profile.name}</h2>
              </div>
            </div> 
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
    }
    
    export default UserDetails;