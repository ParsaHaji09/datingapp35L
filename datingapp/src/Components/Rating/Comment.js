import React, { useState } from 'react';
import './Comment.css'

function Comment(){
    const [comment,setComment]=useState('');
 
    
    function handleCommentChange(event){
        setComment(event.target.value);
    };

    return(
        <div className="comment">
            <input
                type="text"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Type something..."
            />
        </div>
    )
}
export default Comment;