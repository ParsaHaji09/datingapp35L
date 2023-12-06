import './Search.css'
import React, { useState } from 'react';
import axios from 'axios';
import { BsSearch, BsStarFill} from "react-icons/bs"
import { useRouteLoaderData } from 'react-router-dom';

function Search(){
    const [error, setError] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    
        
    function handleUserClick(user){

    }

    const handleSearchClick = async (e) => {
        e.preventDefault()
        try{
            const config = {
                headers: {
                  "Content-type":"application/json",
                },
            };
            
            const database_users = await axios.get("/api/users/all-users", config);
            
            console.log(searchInput)
        
            console.log(database_users)
        
            const searchTerm = searchInput.toLowerCase();
        
            // Filter the users array based on the searchInput
            const matchingUsers = database_users.data.filter(user => {
                    if(user.name.toLowerCase().includes(searchTerm)){
                        if (user.tags.length > 3){
                            user.tags = user.tags.slice(0,3)
                        }
                        
                        return user;
                    }
                    for(let i = 0; i < user.tags.length; i++){
                        if(user.tags[i].includes(searchTerm)){
                            let temp = user.tags[i];
                            user.tags[i] = user.tags[0];
                            user.tags[0] = temp;
                            if (user.tags.length > 3){
                                user.tags = user.tags.slice(0,3)
                            }
                            
                            return user;
                        }
                    }
                   
            });
            
            console.log(matchingUsers)
            let testvar = calcRating(matchingUsers[0])
            console.log(testvar)

            const sortedUsers = matchingUsers.sort((a, b) => (calcRating(b)) - (calcRating(a)));
            setSearchResult(sortedUsers)

        }
        catch (error) {
          setError(error.message);
          console.log(error);
        }
    }

    function calcRating(user){
        console.log(user)
        console.log("here")
        const xafter = ((user.after[1]) === 0) ? 0 : (user.after[0])/(user.after[1]);
        const xactivity = (user.activity[1] === 0) ? 0 : user.activity[0]/user.activity[1];
        const xattractiveness = (user.attractiveness[1] === 0) ? 0 : user.attractiveness[0]/user.attractiveness[1];
        const xconversation = (user.conversation[1] === 0) ? 0 : user.conversation[0]/user.conversation[1];
        const xdecency = (user.decency[1] === 0) ? 0 : user.decency[0]/user.decency[1];
        const xhumor = (user.humor[1] === 0) ? 0 : user.humor[0]/user.humor[1];

        var result = (xafter + xactivity + xattractiveness + xconversation + xdecency + xhumor)/6;
        return result.toFixed(2);
    }

      return (
        <form>
          <div className='explore-all-wrapper'>
            <div className='search-wrapper'>
              
              <input
                className='search-input'
                type = "text"
                placeholder='Searching...'
                value = {searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
              <button className = 'search-btn' onClick={handleSearchClick}><BsSearch/></button>
            </div>
            {searchResult && searchResult.length > 0 && (
              <div className='search-result'>
                {searchResult.map(user => (
                    <div className='result-item' key = {user._id}>
                        <div className='name-tags'>
                          <button className="name" onClick={handleUserClick(user)}>{user.name}</button>
                          <span className= "tags">{user.tags.join(", ")}</span>
                        </div>
                        <div className='star-rating'>
                          <span className= "star"><BsStarFill/></span>
                          <span className= "srating">{calcRating(user)}</span>
                        </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </form>
    
       );
}

export default Search;