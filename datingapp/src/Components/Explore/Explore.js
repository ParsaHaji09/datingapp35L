
import axios from 'axios';
import { BsSearch, BsStarFill} from "react-icons/bs"
import './Explore.css'
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/reduxActions';


const Explore = () => {
  const users = [
    {
      _id: "1",
      name: "Bob Marley",
      tags:
        ["funny", "smart", "artistic", "wholesome"],
      rating: 9.7,
    },
    {
      _id: "2",
      name: "Joe Dahmer",
      tags: ["friendly", "cool", "fun"],
      rating: 0.2,
    },
    {
        _id: "3",
        name: "Archduke Ferdinand",
        tags: ["powerful", "commanding", "charismatic", "important"],
        rating: 6.2,
    },
    {
        _id: "4",
        name: "Bonobo Chimp",
        tags: ["Best", "Monkey", "Friendly"],
        rating: 10.0,
    },
    {
      _id: 5,
      name: "Alice Wonderland",
      tags: ["funny", "smart", "artistic", "wholesome"],
      rating: 8.5
    },
    {
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
    }

  // const dispatch = useDispatch();
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // const navigate = useNavigate();
  // const [userData, setUserData] = useState({});
  // const [name, setUserName] = useState("");
  // const [pfp, setPfp] = useState("");

  // useEffect(() => {
  //   const prevData = localStorage.getItem("saveData");
  //   if (!prevData) {
  //     navigate('/');
  //   } else {
  //     const parsedData = JSON.parse(prevData);
  //     setUserData(parsedData);
  //     setUserName(parsedData.name);
  //     if (parsedData.pic !== undefined && parsedData.pic !== "") {
  //       setPfp(parsedData.pic);
  //     }
  //   }
    
  ];

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(false);

  const handleSearchClick = async (e) => {
    e.preventDefault()
    console.log(searchInput)
    console.log(users)

    const searchTerm = searchInput.toLowerCase();

    // Filter the users array based on the searchInput
    const matchingUsers = users.filter(user => {
      // Check if any property of the user matches the search term
      return Object.values(user).some(value => {
        if (Array.isArray(value)) {
          // If the property is an array, check if any element matches
          return value.some(tag => tag.toLowerCase().includes(searchTerm));
        } else if (typeof value === 'string') {
          // If the property is a string, check if it includes the search term
          return value.toLowerCase().includes(searchTerm);
        } else {
          // For other types of properties, convert to string and check
          return String(value).toLowerCase().includes(searchTerm);
        }
      });
    });

    const sortedUsers = matchingUsers.sort((a, b) => b.rating - a.rating);
    //sorted_list = []
    setSearchResult(sortedUsers)

    //go into db
  //   try{
  //     const config = {
  //       headers: {
  //         "Content-type":"application/json",
  //       },
  //     };
      
  //     const regData = await axios.get("/api/users/all-users", config);

  //     console.log(regData)
  //     console.log(regData.data.length);
  //     console.log("Endpoint reached");
      

  //   } catch (error) {
  //     setError(error.message);
  //     console.log(error);
  //   }
  }

    
    
  // useEffect(() => {
  //   const search = async () => {
  //     try{
  //       if (!searchInput){
  //         setSearchResult([])
  //         return
  //       }
  //       const result = await axios.get("/api/users/all-users", {params: {key: searchInput, limit: 5}})
  //       setSearchInput(result.data.data)
  //       console.log(result)
  //     }
  //     catch (error){
  //       console.log(error)
  //     }
  //   }
  //   search()
   //}, [searchInput])

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
                      <button class="name">{user.name}</button>
                      <span class= "tags">{user.tags.join(", ")}</span>
                    </div>
                    <div className='star-rating'>
                      <span class= "star"><BsStarFill/></span>
                      <span class= "rating">{user.rating}</span>
                    </div>
                  
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


  // const logoutHandler = () => {
  //   dispatch(logout());
  //   navigate('/');
  // }

  // const toRating = () => {
  //   const data = { userData };
  //   navigate('/rating', { state: { data } });
  // }


  // return (
  //   <div>
  //     <h1>{ name }</h1>
  //     <img src = { pfp } />
  //     <Button type = "submit" onClick = {logoutHandler}>Logout</Button>
  //     <Button type = "submit" onClick = {toRating}>To Rating</Button>
  //   </div>