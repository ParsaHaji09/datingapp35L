import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsSearch} from "react-icons/bs"
import '../../App.css'

const Explore = () => {

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const search = async () => {
      try{
        if (!searchInput){
          setSearchResult([])
          return
        }
        const result = await axios.get("/api/users/all-users", {params: {key: searchInput, limit: 5}}) // ask which api endpoint to get
        setSearchInput(result.data.data)
        console.log(result)
      }
      catch (error){
        console.log(error)
      }
    }
    search()
  }, [searchInput])
  return (
    <form>
      <div className='explore-wrapper'>
        <div className='form-group'>
          <button className = 'search-btn'><BsSearch/></button>
          <input
            className='search-input'
            type = "text"
            placeholder='Searching...'
            value = {searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
        </div>
        {searchResult && searchResult.length > 0 && (
          <div className='search-result'>
            {searchResult.map(user => (
                <div className='result-item' key = {user._id}>
                  <p className='name'>{user.name}</p>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </form>
  );


};

export default Explore;
