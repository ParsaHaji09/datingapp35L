import React, { useState } from 'react';
import './Comment.css'

function Comment(){
    const [comment,setComment]=useState('');
 
    
    function handleCommentChange(event){
        setComment(event.target.value);
    };

    return(
        
        <div className="comment-container">
            <textarea
                className="comment-input"
                type="text"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Additional comments..."
            ></textarea>
        </div>
    )
}
export default Comment;