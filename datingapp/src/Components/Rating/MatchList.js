import React, { useState,useEffect } from 'react';
import axios from 'axios';
import UserDetails from './UserDetails';
import './MatchList.css'

function MatchList({userID, onPersonClick, onListChange}){
    const [peopleList, setPeopleList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPerson, setSelectedPerson] = useState(null);



    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${userID}`);
          setPeopleList(response.data.matches);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [userID, onListChange]);

    const handlePersonClick=(person)=>{
        setSelectedPerson(person)
        onPersonClick(person)
    }
  

    return (
        <div className='container'>
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
