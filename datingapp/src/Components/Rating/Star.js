import React from 'react';
import './Star.css';

function Star({color,onStarClick}){
  return( <button className={`star ${color ? 'full' : ''}`} onClick={onStarClick}>
            <span className="star-shape">&#9733;</span>
    </button>
  );
}

export default Star;