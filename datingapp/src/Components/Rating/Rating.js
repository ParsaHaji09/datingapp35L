import React, { useState } from 'react';
import RatingForm from './RatingForm';
import MatchList from './MatchList';
import './Rating.css';
import NavBar from '../NavBar/Navbar.js';

function Rating(){
    const [list, setList] = useState({});
    const [currentPerson, setCurrentPerson]=useState(null)
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('saveData')));


    function handleListChange() {
        setCurrentPerson(null)
        setList({})
    }
          
    //const userData = JSON.parse(localStorage.getItem("saveData"));
    console.log(userData);

    function handlePersonClick(person){
        setCurrentPerson(person)
    }
    
 
    return (
        <div>
        <NavBar />
        <div className="content-container">
        <div className="page">
            <div className="list">
                <MatchList userID={userData._id} onPersonClick={handlePersonClick} onListChange={handleListChange}/>
            </div>
            
            <div className="ratingForm">
            {currentPerson && <RatingForm key={currentPerson} user={currentPerson} onListChange={handleListChange} setUserData={setUserData}/>}
            </div>
        </div>
        </div>
        </div>
    );

}
export default Rating;