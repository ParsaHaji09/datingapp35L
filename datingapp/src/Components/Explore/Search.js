import './Search.css'
import React, { useState } from 'react';
import axios from 'axios';
import { BsSearch, BsStarFill} from "react-icons/bs"

function Search(){
    const [error, setError] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    //need to swap with database
    const users = [{
        _id: 6,
        name: "Eva Einstein",
        tags: ["friendly", "cool", "fun"],
        rating: 7.9
    },
    {
        _id: 7,
        name: "Queen Victoria",
        tags: ["powerful", "commanding", "charismatic", "important"],
        rating: 9.1
    },
    {
        _id: 8,
        name: "Charlie Chimpanzee",
        tags: ["Best", "Monkey", "Friendly"],
        rating: 9.8
    },
    {
        _id: 9,
        name: "David Bowie",
        tags: ["funny", "smart", "artistic", "wholesome"],
        rating: 8.7
    }]
        
    
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
            // Check if any property of the user matches the search term
                //return Object.values(user).some(value => {
                    
                    if(user.name.includes(searchTerm)){
                        return user;
                    }
                    if(user.tags.includes(searchTerm)){
                        return user;
                    }
                    // if (Array.isArray(value)) {
                    // // If the property is an array, check if any element matches
                    // return value.some(tag => tag.toLowerCase().includes(searchTerm));
                    // } else if (typeof value === 'string') {
                    // // If the property is a string, check if it includes the search term
                    // return value.toLowerCase().includes(searchTerm);
                    // } else {
                    // // For other types of properties, convert to string and check
                    // return String(value).toLowerCase().includes(searchTerm);
                    // }
                //});
            });
            
            console.log(matchingUsers)

            const sortedUsers = matchingUsers.sort((a, b) => b.rating - a.rating);
            setSearchResult(sortedUsers)

        }
        catch (error) {
        setError(error.message);
        console.log(error);
        }
    }

    function calcRating(user){
        //activity, after, attractiveness, conversation, decency, humor
        const xafter = (user.after[1] === 0) ? 0 : user.after[0]/user.after[1];
        const xactivity = (user.activity[1] === 0) ? 0 : user.activity[0]/user.activity[1];
        const xattractiveness = (user.attractiveness[1] === 0) ? 0 : user.attractiveness[0]/user.attractiveness[1];
        const xconversation = (user.conversation[1] === 0) ? 0 : user.conversation[0]/user.conversation[1];
        const xdecency = (user.decency[1] === 0) ? 0 : user.decency[0]/user.decency[1];
        const xhumor = (user.humor[1] === 0) ? 0 : user.humor[0]/user.humor[1];

        return (xafter + xactivity + xattractiveness + xconversation + xdecency + xhumor)/6;
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
                          <button className="name">{user.name}</button>
                          <span className= "tags">{user.tags.join(", ")}</span>
                        </div>
                        <div className='star-rating'>
                          <span className= "star"><BsStarFill/></span>
                          <span className= "rating">{calcRating(user)}</span>
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