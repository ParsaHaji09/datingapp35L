import React, { useState } from 'react';
import Category from './Category';

function Rating() {
  const currentStars = useState([Array(5).fill(null)]);
//here

  return (
    <div className="ratings">
      <div className="rating1">
        <Category stars={currentStars} name={"rating1"}/>
      </div>
    </div>
  );
  }

export default Rating;
