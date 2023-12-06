import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/reduxActions';
import Search from './Search';
import axios from 'axios';
import GenericProfile from '../Profile/GenericProfile';
import './Explore.css'


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
  
  const navigate = useNavigate();
  const [selfLoading, setselfLoading] = useState(true); 
  const [loading, setLoading] = useState(true); 
  const [userData, setUserData] = useState(null);

  const [showBio, setShowBio] = useState([]);

  const [users, setUsers] = useState([]);
 
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
  setShowBio(sortedUsers.map(() => false));
  return sortedUsers;
};

const getAllUsers = async (currUser) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/all-users`);
    
    const sorted_users = recommendationAlg(response.data, currUser)

    setUsers(sorted_users);
  } catch (error) {
    console.error('Error updating user data:', error);
  }
  finally {
    setLoading(false); // Set loading to false once data is fetched or if an error occurs
  }
  
};


  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  }

  const toRating = () => {
    const data = { userData };
    navigate('/rating', { state: { data } });
  }

  return (
    <div>
    {loading | selfLoading ? (
      // Display a loading indicator or message while data is being fetched
      <p>Loading Page...</p>
    ): (
      <div>
        <div className='search-personal' style = {{marginBottom: 30}}>
          <div className='personal-info-wrapper'>
            <h1>{ userData.name }</h1>
            <img src={userData.pic[0]} style={{ width: '100px' }} />
          </div>
          <div className='search'><Search /></div>
        </div>
        {users.map((user, index) => (
             <GenericProfile key = {index} userData={user} other_uid={userData._id} showBio = {showBio[index]} style = {{marginBottom: 30}}></GenericProfile>
        ))}
       
      </div>
    )}
    </div>
    
  )
    
}


export default Explore;