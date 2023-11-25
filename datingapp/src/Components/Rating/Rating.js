import React, { useState } from 'react';
import Category from './Category';
import Comment from './Comment';
import './Rating.css';

function Rating() {
  const currentStars = useState([Array(5).fill(null)]);


  return (
    <div className="rating">
      <div className="rating-container">
        <div className="rating1">
          <Category stars={currentStars} name={"rating1"}/>
        </div>
        <div className="rating2">
          <Category stars={currentStars} name={"rating2"}/>
        </div>
        <div className="rating3">
          <Category stars={currentStars} name={"rating3"}/>
        </div>
        <div className="rating4">
          <Category stars={currentStars} name={"rating4"}/>
        </div>
        <div className="rating5">
          <Category stars={currentStars} name={"rating5"}/>
        </div>
        <div className="rating6">
          <Category stars={currentStars} name={"rating6"}/>
        </div>
      </div>
      <div className="comment">
        <Comment />
      </div>
    </div>
  );
  }

export default Rating;

