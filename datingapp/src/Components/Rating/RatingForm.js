import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Category from './Category';
import './RatingForm.css';
import CustomizedRating from './StyledRating';
import Submit from './Submit';
import activity from './images/activity.png';
import afterDate from './images/afterDate.png';
import attractiveness from './images/attractiveness.png';
import conversation from './images/conversation.png';
import generosity from './images/generosity.png';
import humor from './images/humor.png';
import ProfileData from './ProfileData';
import axios from 'axios';

function RatingForm({user, onListChange}) {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({});
  const [udata, setUdata] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const prevData = localStorage.getItem("saveData");
    if (!prevData) {
      navigate('/');
    } else {
      const parsedData = JSON.parse(prevData);
      setUdata(parsedData);
    }
  }, [navigate]);

  function handleRatingChange(categoryName, ratingValue) {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [categoryName]: ratingValue*2,
    }));
  }

  const updateUserData = async (userId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, updatedData);
      console.log(response.data); // Handle the response from the server
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const removeMatch = async (userId) => {
    console.log("removing " + userId)
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${udata._id}`, {
        matches: {
          type: "remove",
          value: userId
        }
      });
      console.log(response.data); // Handle the response from the server
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  function handleSubmit() {
    console.log(user);
    console.log('Submitting ratings:', ratings);
    updateUserData(user, ratings);
    removeMatch(user);
    onListChange();
  }


  const categoryNames = Object.keys(ratings);
  const averageRating =
  categoryNames.length > 0
    ? categoryNames.reduce((sum, categoryName) => sum + ratings[categoryName], 0) / categoryNames.length
    : 0;

  return (
    
    <div className="rating-r">
      <div className ="profileName">
        <ProfileData userID={user}/>
      </div>
      <button className="toggle-button" onClick={() =>setShowForm(!showForm)}
      style={{ fontSize: '20px', padding: '12px 20px' }}>
        {showForm ? 'Hide Rating Form': 'Show Rating Form'}
      </button>

      {showForm &&(
      <div className='rating-form'>

      <div className="rating-container">
        <div className="rating1">
          <Category  name={"attractiveness"}onRatingChange={handleRatingChange} image={attractiveness}/>
        </div>
        <div className="rating2">
          <Category  name={"conversation"}onRatingChange={handleRatingChange}image={conversation}/>
        </div>
        <div className="rating3">
          <Category  name={"activity"}onRatingChange={handleRatingChange}image={activity}/>
        </div>
        <div className="rating4">
          <Category  name={"humor"}onRatingChange={handleRatingChange}image={humor}/>
        </div>
        <div className="rating5">
          <Category  name={"decency"}onRatingChange={handleRatingChange}image={generosity}/>
        </div>
        <div className="rating6">
          <Category  name={"after"}onRatingChange={handleRatingChange}image={afterDate}/>
        </div>
      </div>
      <div className="styledRating">
        <CustomizedRating value={averageRating} size="large" name={`Average Rating: ${(averageRating).toFixed(2)}`} onRatingChange={handleRatingChange}/>
      </div>
      <div className="submit-container">
      <Submit onSubmit={handleSubmit} />
    </div>
      
      
      </div>
      )}
    </div>
  );
  }

export default RatingForm;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import Category from './Category';
// import Comment from './Comment';
// import './RatingForm.css';
// import CustomizedRating from './StyledRating';
// import Submit from './Submit';
// import activity from './images/activity.png';
// import afterDate from './images/afterDate.png';
// import attractiveness from './images/attractiveness.png';
// import conversation from './images/conversation.png';
// import generosity from './images/generosity.png';
// import humor from './images/humor.png';
// import ProfileData from './ProfileData';

// import axios from 'axios';

// function RatingForm({user}) {
//   const navigate = useNavigate();
//   const [ratings, setRatings] = useState({});
//   const [udata, setUdata] = useState({});

//   useEffect(() => {
//     const prevData = localStorage.getItem("saveData");
//     if (!prevData) {
//       navigate('/');
//     } else {
//       const parsedData = JSON.parse(prevData);
//       setUdata(parsedData);
//     }
//   }, []);

//   function handleRatingChange(categoryName, ratingValue) {
//     setRatings((prevRatings) => ({
//       ...prevRatings,
//       [categoryName]: ratingValue*2,
//     }));
//   }

//   const updateUserData = async (userId, updatedData) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/users/${userId}`, updatedData);
//       console.log(response.data); // Handle the response from the server
//     } catch (error) {
//       console.error('Error updating user data:', error);
//     }
//   };

//   const removeMatch = async (userId) => {
//     console.log("removing " + userId)
//     try {
//       const response = await axios.put(`http://localhost:5000/api/users/${udata._id}`, {
//         matches: {
//           type: "remove",
//           value: userId
//         }
//       });
//       console.log(response.data); // Handle the response from the server
//     } catch (error) {
//       console.error('Error updating user data:', error);
//     }
//   };

//   function handleSubmit() {
//     console.log(user);
//     console.log('Submitting ratings:', ratings);
//     updateUserData(user, ratings);
//     removeMatch(user)
//   }

//   const categoryNames = Object.keys(ratings);
//   const averageRating =
//   categoryNames.length > 0
//     ? categoryNames.reduce((sum, categoryName) => sum + 2*ratings[categoryName], 0) / categoryNames.length
//     : 0;

//   return (
//     <div className="rating">
//       <div className="rating-container">
//         <div className="rating1">
//           <Category  name={"attractiveness"}onRatingChange={handleRatingChange} image={attractiveness}/>
//         </div>
//         <div className="rating2">
//           <Category  name={"conversation"}onRatingChange={handleRatingChange}image={conversation}/>
//         </div>
//         <div className="rating3">
//           <Category  name={"activity"}onRatingChange={handleRatingChange}image={activity}/>
//         </div>
//         <div className="rating4">
//           <Category  name={"humor"}onRatingChange={handleRatingChange}image={humor}/>
//         </div>
//         <div className="rating5">
//           <Category  name={"decency"}onRatingChange={handleRatingChange}image={generosity}/>
//         </div>
//         <div className="rating6">
//           <Category  name={"after"}onRatingChange={handleRatingChange}image={afterDate}/>
//         </div>
//       </div>
//       <div className="submit-container">
//       <Submit onSubmit={handleSubmit} />
//     </div>
      
//       <div className="styledRating">
//         <CustomizedRating value={averageRating}name={`Average Rating: ${(averageRating).toFixed(2)}`} onRatingChange={handleRatingChange}/>
//       </div>
//       <div className ="profileName">
//         <ProfileData userID={user}/>
//       </div>
//     </div>
//   );
//   }

// export default RatingForm;

