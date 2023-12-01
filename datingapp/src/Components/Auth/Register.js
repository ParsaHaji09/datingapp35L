import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const MAX_SELECTED_TAGS = 5; // Set the maximum number of selected tags

  const tagsArray = ['funny', 'stinky', 'scaly', 'green', '2ft tall', '9ft tall',
                    'horns', 'talons', 'chaewon', 'sexy', 'bad', 'eggy', 'tall'];

  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagClick = (tag) => {
    // Check if the tag is already selected
    const isTagSelected = selectedTags.includes(tag);
  
    // Check the number of currently selected tags
    const selectedTagsCount = selectedTags.length;
  
    // If the tag is not selected and the maximum limit is not reached, update the state
    if (!isTagSelected && selectedTagsCount < MAX_SELECTED_TAGS) {
      setSelectedTags([...selectedTags, tag]);
    } else if (isTagSelected) {
      // If the tag is already selected, remove it from the array
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    }
  };


  const navigate = useNavigate();
  const handleClick = () => {
    console.log("Switched to Login");
    navigate ('/');
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log('Register component submitted with email:', email);
  }
  return (
    <div className = "App">
    <div className="auth-form-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Full name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="full name"/>
      <label htmlFor ="email">email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter here" id="email" name="email"/>
      <label htmlFor ="password">password</label>
      <input value={pass} onChange={(e) => setPass (e.target.value)} type="password" placeholder="******" id="password" name="password"/>
      
        <div>
          <h2>Select Your Tags</h2>
          {tagsArray.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`tag-button ${selectedTags.includes(tag) ? 'tag-button-selected' : 'tag-button-unselected'}`}
            >
              {tag}
            </button>
          ))}
        </div>
     
      <button className="button" type="submit">Log In</button>
    </form>
    <button className="link-btn" onClick={handleClick}> Already have an account? Log in here.</button>
    </div>
    </div>
  );
}

export default Register;