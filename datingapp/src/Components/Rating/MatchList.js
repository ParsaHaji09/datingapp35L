import React, { useState,useEffect } from 'react';
import axios from 'axios';
import UserDetails from './UserDetails';
import './MatchList.css'

function MatchList({userID, onPersonClick, onListChange}){
    const [peopleList, setPeopleList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPerson, setSelectedPerson] = useState(null);



    useEffect(() => {
        // Fetch the initial list from the backend
        axios.get('/api/users/'+userID) // Replace 1 with the appropriate user ID
          .then(response => {
            setPeopleList(response.data.matchList); 
            setLoading(false)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false)
          });
      }, [userID]);

    const handlePersonClick=(person)=>{
        setSelectedPerson(person)
        onPersonClick(person)
    }
  

    return (
        <div>
          <h2 className='bold-text'> Current Matches</h2>
          {loading ? (
            <p>Loading...</p>
        ) : (
          <ul>
            {peopleList.map((person, index) => (
              <li key={index} onClick={() => handlePersonClick(person)} 
              className={selectedPerson === person ? 'selected' : ''}
              >
                <UserDetails userID={person}/>
              </li>
            ))}
          </ul>
        )}
        </div>
      );
    
}
export default MatchList;
