import React, { useState, useEffect } from 'react';
import RatingForm from './RatingForm';
import MatchList from './MatchList';
import './Rating.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Rating(){
    const [list, setList] = useState({});
    const [currentPerson, setCurrentPerson]=useState(null)


    function handleListChange() {
        setCurrentPerson(null)
    }
          
    const location = useLocation();
    const userData = JSON.parse(localStorage.getItem("saveData"));
    console.log(userData);

    function handlePersonClick(person){
        setCurrentPerson(person)
    }
    
 

    // const addMatch = async (uid) => {
    //     try {
    //   const response = await axios.put(`http://localhost:5000/api/users/${userData._id}`, {
    //     matches: {
    //       type: "",
    //       value: uid
    //     }
    //   });
    //   console.log(response.data); // Handle the response from the server
    // } catch (error) {
    //   console.error('Error updating user data:', error);
    // }
    // };

    // useEffect(() => {
    //     addMatch("656ac4b6ad5e19914368dafc");
    // }, [])


    return (
        <div className="page">
            <div className="list">
                <MatchList userID={userData._id} onPersonClick={handlePersonClick} onListChange={handleListChange}/>
            </div>
            
            <div className="ratingForm">
            {currentPerson && <RatingForm key={currentPerson} user={currentPerson} onListChange={handleListChange}/>}
            </div>
        </div>
    );

}
export default Rating;