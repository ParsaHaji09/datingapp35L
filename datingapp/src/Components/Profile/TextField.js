// WARNING: THIS FILE IS DEPRECATED

import React, { useState, useRef } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from '@mui/icons-material/Check';

const TextField = ({ placeholder, fontSize, height, maxLength }) => {
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    ref.current.focus();
  };

  const handleSaveClick = () => {
    // You can add logic here to save the text or perform other actions
    setIsEditing(false);
  };
  
  const bioStyles = {
    height: height || '100%',
    width: '400px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const textareaStyles = {
    transition: 'background-color 0.2s ease', // CSS transition for background color
    backgroundColor: isEditing ? '#eeeeee' : 'transparent', // Highlighted background color
    border: isEditing ? '2px solid #ccc' : '2px solid #fff', // Border to simulate depth
    borderRadius: '5px',
    height: '100%',
    width: '100%',
    resize: 'none',
    outline: 'none',
    padding: '10px',
    position: 'relative', // Add position relative to the container
    fontSize: fontSize || '16px',
    overflow: 'hidden',
  };

  const iconButtonStyles = {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    zIndex: 2,
  };


  return (
    <div style={bioStyles}>
    <textarea ref={ref} maxLength={maxLength} value={text} onChange={handleTextChange} placeholder={placeholder} style={textareaStyles}></textarea>
    <IconButton style={iconButtonStyles} onClick={isEditing ? handleSaveClick : handleEditClick}>
    {isEditing ? <CheckIcon /> : <CreateIcon />}
    </IconButton>
    </div>
  );
};
export default TextField;

