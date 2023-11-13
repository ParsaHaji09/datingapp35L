import React, { useState } from 'react';
import Star from './Star';

function Category({stars,name}){

  const [value, setValue] = useState(0);

  function handleClick(l){
    for(let i=0;i<l+1;i++){
      stars[i]="full";
    }
    for(let j=l+1;j<stars.length;j++){
      stars[j]="empty"
    }

    setValue(l+1);
  }


  return( 
    <>
      <div className="cat-name">{name}</div>

      <div className="star-row">
        <Star value={stars[0]} onStarClick={()=>handleClick(0)}/>
        <Star value={stars[1]} onStarClick={()=>handleClick(1)}/>
        <Star value={stars[2]} onStarClick={()=>handleClick(2)}/>
        <Star value={stars[3]} onStarClick={()=>handleClick(3)}/>
        <Star value={stars[4]} onStarClick={()=>handleClick(4)}/>
      </div>
    </>
  );

}

export default Category;