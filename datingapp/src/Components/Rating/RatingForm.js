import React, { useState } from 'react';
import Category from './Category';
import Comment from './Comment';
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


function RatingForm({user}) {
  const [ratings, setRatings] = useState({});

  function handleRatingChange(categoryName, ratingValue) {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [categoryName]: ratingValue,
    }));
  }


  const categoryNames = Object.keys(ratings);
  const averageRating =
  categoryNames.length > 0
    ? categoryNames.reduce((sum, categoryName) => sum + 2*ratings[categoryName], 0) / categoryNames.length
    : 0;

  return (
    <div className="rating">
      <div className="rating-container">
        <div className="rating1">
          <Category  name={"Attractiveness"}onRatingChange={handleRatingChange} image={attractiveness}/>
        </div>
        <div className="rating2">
          <Category  name={"Conversation"}onRatingChange={handleRatingChange}image={conversation}/>
        </div>
        <div className="rating3">
          <Category  name={"Date Activity"}onRatingChange={handleRatingChange}image={activity}/>
        </div>
        <div className="rating4">
          <Category  name={"Sense Of Humor"}onRatingChange={handleRatingChange}image={humor}/>
        </div>
        <div className="rating5">
          <Category  name={"Decency"}onRatingChange={handleRatingChange}image={generosity}/>
        </div>
        <div className="rating6">
          <Category  name={"After The Date"}onRatingChange={handleRatingChange}image={afterDate}/>
        </div>
      </div>
      <div className="comment">
        <Comment />
      </div>
      <div className="submit-container">
        <Submit/>
      </div>
      
      <div className="styledRating">
        <CustomizedRating value={averageRating}name={`Average Rating: ${(averageRating).toFixed(2)}`} onRatingChange={handleRatingChange}/>
      </div>
      <div className ="profileName">
        <ProfileData userID={user}/>
      </div>
    </div>
  );
  }

export default RatingForm;

