import React, { useState } from 'react';
import RatingForm from './RatingForm';
import MatchList from './MatchList';
import './Rating.css';

function Rating(){
    const [list, setList] = useState({});
    const [currentPerson, setCurrentPerson]=useState(null)

    function handleListChange(newList) {
          
      }
    function handlePersonClick(person){
        setCurrentPerson(person)
    }


    return (
        <div className="page">
            <div className="line"></div>
            <div className="list">
                <MatchList userID='1'onPersonClick={handlePersonClick} onListChange={handleListChange}/>
            </div>
            <div className="ratingForm">
                {currentPerson && <RatingForm key={currentPerson} user={currentPerson} onListChange={handleListChange}/>}
            </div>
        </div>
    );

}
export default Rating;