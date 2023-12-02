import React, { useState } from 'react';
import RatingForm from './RatingForm';
import MatchList from './MatchList';
import { useLocation } from 'react-router-dom';

function Rating(){
    const [list, setList] = useState({});
    const [currentPerson, setCurrentPerson]=useState(null)

    const location = useLocation();
    const { data } = location.state || {};
    console.log(data.userData);

    function handleListChange(categoryName, ratingValue) {
        
      }
    function handlePersonClick(person){
        setCurrentPerson(person)
    }


    return (
        <div className="page">
            <div className="list">
                <MatchList userID={data.userData._id} onPersonClick={handlePersonClick} onListChange={handleListChange}/>
            </div>
            <div className="ratingForm">
                {currentPerson && <RatingForm key={currentPerson} user={currentPerson} onListChange={handleListChange}/>}
            </div>
        </div>
    );

}
export default Rating;