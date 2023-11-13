import React from 'react';

function Star({value,onStarClick}){
  return( <button className="star" onClick={onStarClick}>
    {value}
    </button>
  );
}

export default Star;