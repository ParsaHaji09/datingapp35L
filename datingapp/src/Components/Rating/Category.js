import React, { useState } from 'react';
/*import Star from './Star';*/
import HoverRating from './HoverRating';
import './Category.css'

function Category({name, onRatingChange, image}){
/*
  const [starColors, setStarColors] = useState(['', '', '', '', '']);
  const [value, setValue] = useState(0);


  function handleClick(l){
    
    const updatedColors = starColors.map((_, i) =>
    (i <= l ? 'full' : '')
    );
    setStarColors(updatedColors);

    setValue(l+1);
  }
  */
  function handleRate(ratingValue) {
    // Pass the rating value to the parent component
    onRatingChange(name, ratingValue);
  }

  return( 
    <div className="category">
      <div className='nameAndImage'>
        <div className="cat-name">{name}</div>
        <div className="image">
          <img src={image} alt="" />
        </div>
      </div>
      <div className="star-row">
        <div className="hoverRating">
          <HoverRating defaultValue={0} onRate={handleRate}/>
        </div>

        {/*
        <Star  color ={starColors[0]} onStarClick={()=>handleClick(0)}/>
        <Star color ={starColors[1]} onStarClick={()=>handleClick(1)}/>
        <Star  color ={starColors[2]} onStarClick={()=>handleClick(2)}/>
        <Star  color ={starColors[3]} onStarClick={()=>handleClick(3)}/>
        <Star color ={starColors[4]} onStarClick={()=>handleClick(4)}/>
        */}
      </div>
      
    </div>
  );

}

export default Category;