import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import axios from 'axios';
import GenericProfile from '../Profile/GenericProfile';
import './Explore.css'
import NavBar from '../NavBar/Navbar.js';



function Explore() {
  const navigate = useNavigate();
  const [selfLoading, setSelfLoading] = useState(true); 
  const [loading, setLoading] = useState(true); 
  const [userData, setUserData] = useState(null);
  const [curProfile, setCurProfile] = useState(0);
  const [sizeOfAll, setSizeOfAll] = useState(0);

  const [users, setUsers] = useState([]);

 
  const load = async () => {
    const prevData = localStorage.getItem("saveData");
    if (!prevData) {
      navigate('/');
    } else {
      const parsedData = JSON.parse(prevData);
      await getUser(parsedData._id);
      
    }
  };

  useEffect (() => {
    load();
  }, [curProfile])

  
useEffect(() => {
  
  const prevData = localStorage.getItem("saveData");
    if (!prevData) {
      navigate('/');
    }
    else {
      const parsedData = JSON.parse(prevData);
      getAllUsers(parsedData);
      
    }

}, [navigate])

const getUser = async (uid) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/${uid}`);
    setUserData(response.data);
    localStorage.setItem('saveData', JSON.stringify(response.data));
  } catch (error) {
    console.error('Error updating user data:', error);
  }
  finally {
    setSelfLoading(false); // Set loading to false once data is fetched or if an error occurs
    
  }
};


const recommendationAlg = (users, currUser) => {
  function calculatePoints(otherUser) {
    let points = 0;
    //weights
    let c1 = 8;
    let c2 = 5;
    // Check for tag similarity
    points += c1 * currUser.tags.filter(tag => otherUser.tags.includes(tag)).length;

    //c1*tags + c2/mean square diff ratings
    const xafter = ((currUser.after[1]) === 0) ? 0 : (currUser.after[0])/(currUser.after[1]);
    const xactivity = (currUser.activity[1] === 0) ? 0 : currUser.activity[0]/currUser.activity[1];
    const xattractiveness = (currUser.attractiveness[1] === 0) ? 0 : currUser.attractiveness[0]/currUser.attractiveness[1];
    const xconversation = (currUser.conversation[1] === 0) ? 0 : currUser.conversation[0]/currUser.conversation[1];
    const xdecency = (currUser.decency[1] === 0) ? 0 : currUser.decency[0]/currUser.decency[1];
    const xhumor = (currUser.humor[1] === 0) ? 0 : currUser.humor[0]/currUser.humor[1];

    const yafter = ((otherUser.after[1]) === 0) ? 0 : (otherUser.after[0])/(otherUser.after[1]);
    const yactivity = (otherUser.activity[1] === 0) ? 0 : otherUser.activity[0]/otherUser.activity[1];
    const yattractiveness = (otherUser.attractiveness[1] === 0) ? 0 : otherUser.attractiveness[0]/otherUser.attractiveness[1];
    const yconversation = (otherUser.conversation[1] === 0) ? 0 : otherUser.conversation[0]/otherUser.conversation[1];
    const ydecency = (otherUser.decency[1] === 0) ? 0 : otherUser.decency[0]/otherUser.decency[1];
    const yhumor = (otherUser.humor[1] === 0) ? 0 : otherUser.humor[0]/otherUser.humor[1];

    let denom = (((xafter-yafter)**2 + (xactivity-yactivity)**2 + (xattractiveness-yattractiveness)**2 + (xconversation-yconversation)**2 + (xdecency-ydecency)**2 + (xhumor-yhumor)**2)**0.5)
    if(denom === 0){
      return points;
    }
    points += c2 / denom
    return points;
  }

  function compareUsers(user1, user2) {
    // Calculate points for each user during sorting
    const points1 = calculatePoints(user1);
    const points2 = calculatePoints(user2);

    // Compare users based on points (descending order)
    return points2 - points1;
}

  const temp = users.sort(compareUsers);
  for (let i = 0; i < temp.length; i++) {
    // console.log("Match " + i + ": " + temp[i].name + " has points " + (calculatePoints(temp[i])));
  }
  // Sort the list based on points
  const sortedUsers = users.sort(compareUsers);
  setSizeOfAll(sortedUsers.length);
  return sortedUsers;
};

const listFilter = (currUser, optionsArray) => {
  // console.log("currUser " + currUser.name );
  // console.log(currUser.viewed);
  return optionsArray.filter(item => !currUser.viewed.includes(item._id) && item._id !== currUser._id );
}

const getAllUsers = async (currUser) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/all-users`);
    const optionsArray = await listFilter(currUser, response.data);
    const sorted_users = recommendationAlg(optionsArray, currUser)
    setUsers(sorted_users);
  } catch (error) {
    console.error('Error updating user data:', error);
  }
  finally {
    setLoading(false); // Set loading to false once data is fetched or if an error occurs
  }
  
};

  const matchingLogic = async (other_data, user_data) => {
    var inc = other_data.incoming.filter((id) => id !== user_data._id);
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${other_data._id}`, {
        "incoming": inc,
        "matches": {
          "type": "",
          "value": user_data._id,
        }
      });
      console.log(response);
    } catch (error) {
      console.error('Error updating user data through matches and incoming:', error);
    }
  }

  const acceptProfile = async (other_data, user_data) => {
    
    console.log("Other data: " + other_data);
    console.log("User data: " + user_data);

    if (userData.incoming.includes(other_data._id)) {
      
      await matchingLogic(other_data, user_data);
      await matchingLogic(user_data, other_data);
      
    } else {
      var inc = [...other_data.incoming, user_data._id]
      try {
        console.log("INC RN: " + inc);
        const response = await axios.put(`http://localhost:5000/api/users/${other_data._id}`, {
          "incoming": inc,
        });
        console.log(response);
      } catch (error) {
        console.error('Error updating user data through incoming:', error);
      }
    }
    moveNext(other_data, user_data);
  }

  const moveNext = async (other_data, user_data) => {
    var vie = [...userData.viewed, other_data._id];
    console.log(vie);
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${user_data._id}`, {
        "viewed": vie,
      });
      console.log(response);
    } catch (error) {
      console.error('Error updating user data through matches and incoming:', error);
    }
    setCurProfile(curProfile + 1);
  }

  return (
    <div>
    <NavBar />
    <div className="content-container">
    <div>
    {(loading || selfLoading) ? (
      // Display a loading indicator or message while data is being fetched
      <p>Loading Page...</p>
    ): (
      <div>
        <div className='search-personal' style = {{marginBottom: 30}}>
          <div className='personal-info-wrapper'>
            <h1>{ userData.name }</h1>
            <img src={userData.pic[0]} style={{ width: '100px' }} alt="User Profile Pic" />
          </div>
          <div className='search'><Search /></div>
        </div>
        { console.log("UserData submitted with: " + users[curProfile] + " and otherData: " + userData._id )}
        { curProfile < sizeOfAll ? <GenericProfile otherData={users[curProfile]} userData={userData} accept = {acceptProfile} reject = {moveNext}></GenericProfile> : <div>OUT OF BOUND</div> }
       
      </div>
    )}
    </div>
    </div>
        </div>
    
  )
    
}


export default Explore;