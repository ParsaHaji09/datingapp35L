import React, { useState } from 'react';
import Star from './Star';
import './Category.css'

function Category({stars,name}){

  const [starColors, setStarColors] = useState(['', '', '', '', '']);
  const [value, setValue] = useState(0);

  function handleClick(l){
    /*for(let i=0;i<l+1;i++){
      stars[i]="full";
    }
    for(let j=l+1;j<stars.length;j++){
      stars[j]=null
    }*/
    const updatedColors = starColors.map((color, i) =>
      i <= l ? 'full' : ''
    );
    setStarColors(updatedColors);

    setValue(l+1);
  }


  return( 
    <div className="category">
      <div className="cat-name">{name}</div>

      <div className="star-row">
        <Star  color ={starColors[0]} onStarClick={()=>handleClick(0)}/>
        <Star color ={starColors[1]} onStarClick={()=>handleClick(1)}/>
        <Star  color ={starColors[2]} onStarClick={()=>handleClick(2)}/>
        <Star  color ={starColors[3]} onStarClick={()=>handleClick(3)}/>
        <Star color ={starColors[4]} onStarClick={()=>handleClick(4)}/>
      </div>
    </div>
  );

}

export default Category;