import React, { useState } from 'react';

import './Star.css';

function Star({color,onStarClick, onStarHover}){

  return( <button 
            className={`star ${color === 'full' ? 'full' : color === 'hover' ? 'hover' : ''}`}
            onClick={onStarClick}
            onMouseEnter={onStarHover}>
            <span className="star-shape">&#9733;</span>
    </button>
  );
}

export default Star;