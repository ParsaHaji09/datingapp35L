import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/reduxActions';
import Search from './Search';
import axios from 'axios';
import GenericProfile from '../Profile/GenericProfile';
import './Explore.css'

import TextField from "@mui/material/TextField";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
	
import {Select, MenuItem, FormControl, InputLabel, FormHelperText} from "@mui/material";
import NavBar from '../NavBar/Navbar.js';



/*TODO: Explore page match processing
  - some sort of algorithm to rank all other users in terms of compatibility (on page load)
  - remember to filter our users that the user has already seen somehow??
  - implement like/dislike feature (pass data in generic profile -> bio?) add to other user's incoming first, then check if the other user is in incoming list 
    then add to match list... i can explain more if u want.
*/


function Explore() {

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();
  const [selfLoading, setselfLoading] = useState(true); 
  const [loading, setLoading] = useState(true); 
  const [userData, setUserData] = useState(null);
  const [curProfile, setCurProfile] = useState(0);
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);


  const acceptProfile = async (other_data, userId) => {
    var inc = [];
    console.log("Other data: " + other_data);
    console.log("User ID: " + userId);

    if (userData.incoming.includes(other_data._id)) {
      inc = other_data.incoming.filter((id) => id === userId);
      try {
        const response = await axios.put(`http://localhost:5000/api/users/${other_data._id}`, {
          "incoming": inc,
          "matches": {
            "type": "",
            "value": userId,
          }
        });
        localStorage.setItem('saveData', JSON.stringify(response.data));
        console.log("Successfully added " + userId + " to the match array of " + other_data._id);
      } catch (error) {
        console.error('Error updating user data through matches and incoming:', error);
      }
    } else {
      inc = [...other_data.incoming, userId]
      try {
        console.log("INC RN: " + inc);
        const response = await axios.put(`http://localhost:5000/api/users/${other_data._id}`, {
          "incoming": inc,
        });
        localStorage.setItem('saveData', JSON.stringify(response.data));
        console.log("Successfully added " + userId + " to the incoming array of " + other_data._id);
      } catch (error) {
        console.error('Error updating user data through incoming:', error);
      }
    }
    
    setCurProfile(curProfile + 1);
    console.log(filtered.length)
    if(curProfile === filtered.length-1) setCurProfile(0);
  }

  const rejectProfile = async (other_data, userId) => {
    
    setCurProfile(curProfile + 1);
    if(curProfile === filtered.length-1) setCurProfile(0);
  }
useEffect(() => {
  const prevData = localStorage.getItem("saveData");
  if (!prevData) {
    navigate('/');
  } else {
    const parsedData = JSON.parse(prevData);
    
    getUser(parsedData._id);
    getAllUsers(parsedData);
  }

}, [navigate])

const getUser = async (uid) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/${uid}`);
    //console.log(response.data); // Handle the response from the server
    setUserData(response.data);
  } catch (error) {
    console.error('Error updating user data:', error);
  }
  finally {
    setselfLoading(false); // Set loading to false once data is fetched or if an error occurs
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
    console.log("Match " + i + ": " + temp[i].name + " has points " + (calculatePoints(temp[i])));
  }
  // Sort the list based on points
  const sortedUsers = users.sort(compareUsers);
  return sortedUsers;
};

const getAllUsers = async (currUser) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/all-users`);
    
    const sorted_users = recommendationAlg(response.data, currUser)

    setUsers(sorted_users);
    setFiltered(sorted_users);
  } catch (error) {
    console.error('Error updating user data:', error);
  }
  finally {
    setLoading(false); // Set loading to false once data is fetched or if an error occurs
  }
  
};



let inputHandler = (e) => {
  //convert input text to lower case
  
  var inputs = e.target.value;
  //const prevData = localStorage.getItem("saveData");
  //setInputText(lowerCase);
  console.log(inputs)
  console.log(users)
  setFiltered(users.filter((el) => {
    //if no input the return the original
    if (inputs === '') {
      // const parsedData = JSON.parse(prevData);  
      // getAllUsers(parsedData);
      return el;
    }
    //return the item which contains the user input
    else {
        for(let i = 0; i < el.tags.length; i++){
          if(el.tags[i].includes(inputs)){
            return el;
          }
        }
    }
  }));
  console.log(users)
  
};

let inputHandler2 = (e) => {
  //convert input text to lower case
  
  var inputs = e.target.value;
  //const prevData = localStorage.getItem("saveData");
  //setInputText(lowerCase);
  console.log(inputs)
  console.log(users)
  setFiltered(users.filter((el) => {
    //if no input the return the original
    if (inputs === '') {
      // const parsedData = JSON.parse(prevData);  
      // getAllUsers(parsedData);
      return el;
    }
    //return the item which contains the user input
    else {
        
          if(el.pronouns.includes(inputs)){
            return el;
          }
        
    }
  }));
  console.log(users)
  
};


  return (
    <div>
    <NavBar />
    <div className="content-container">
    <div>
    {loading | selfLoading ? (
      // Display a loading indicator or message while data is being fetched
      <p>Loading Page...</p>
    ): (
      <div>
        <div className='search-personal' style = {{marginBottom: 30}}>
          <div className='personal-info-wrapper'>
            <h2>Welcome back { userData.name }! Have a fantastic day!</h2>
            <img src={userData.pic[0]} style={{ width: '100px' }} />
          </div>
          <div className='search-info-wrapper'>
            <div className="search">
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                onChange={inputHandler}
                label="Search Tags"
              />
            </div>
            <div className="gender-drop">
            
            <FormControl variant="outlined"
              sx={{ 
                width: 250,
                height: 55, }}>  
              <InputLabel shrink>Sex</InputLabel>  
              <Select label="Sexes" onChange={inputHandler2}>     
              <MenuItem value={"he/him"}>He/Him</MenuItem>
              <MenuItem value={"She/Her"}>She/Her</MenuItem>
              <MenuItem value={"they/them"}>They/Them</MenuItem> 
              </Select>  
              
            </FormControl>
            
            
            </div>
          </div>
        </div>
        { console.log("UserData submitted with: " + users[curProfile] + " and otherData: " + userData._id )}
        <GenericProfile userData={filtered[curProfile]} otherId={userData._id} accept = {acceptProfile} reject = {rejectProfile}></GenericProfile>
       
      </div>
    )}
    </div>
    </div>
        </div>
    
  )
    
}


export default Explore;