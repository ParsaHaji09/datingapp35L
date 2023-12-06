import React, { useState } from 'react';
import RatingForm from './RatingForm';
import MatchList from './MatchList';
import './Rating.css';
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar/Navbar.js';

function Rating(){
    const [list, setList] = useState({});
    const [currentPerson, setCurrentPerson]=useState(null)


    function handleListChange() {
        setCurrentPerson(null)
        setList({})
    }
          
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
        <div>
        <NavBar />
        <div className="content-container">
        <div className="page">
            <div className="list">
                <MatchList userID={userData._id} onPersonClick={handlePersonClick} onListChange={handleListChange}/>
            </div>
            
            <div className="ratingForm">
            {currentPerson && <RatingForm key={currentPerson} user={currentPerson} onListChange={handleListChange}/>}
            </div>
        </div>
        </div>
        </div>
    );

}
export default Rating;