import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [pic, setPic] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const MAX_SELECTED_TAGS = 5; // Set the maximum number of selected tags

  const tagsArray = ['funny', 'stinky', 'scaly', 'green', '2ft tall', '9ft tall',
                    'horns', 'talons', 'chaewon', 'sexy', 'bad', 'eggy', 'tall'];

  const [selectedTags, setSelectedTags] = useState([]);

  // const handleTagClick = (tag) => {
  //   // Toggle the selected state of the tag
  //   if (selectedTags.includes(tag)) {
  //     setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  //   } else {
  //     setSelectedTags([...selectedTags, tag]);
  //   }
  // };

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


  const [uploadedFile, setUploadedFile] = useState(null);

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    setPic(file.name)
    console.log(file.name)
  };

  const navigate = useNavigate();
  const handleClick = () => {
    console.log("Switched to Login");
    navigate ('/');
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, pass, selectedTags, pic);
    console.log('Register component submitted with email:', email);

    // register
    try {

      const config = {
        header: {
          "Content-type":"application/json",
        },
      };

      setLoading(true);

      const regData = await axios.post("api/users/", {
        name: name,
        email: email,
        password: pass,
        tags: selectedTags,
        pic: pic,
      }, config);

      localStorage.setItem("saveData", JSON.stringify(regData.data))
      console.log(regData.data)
      setLoading(false);
      navigate('/')

    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
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
      <input value={pass} onChange={(e) => setPass (e.target.value)} type="password" placeholder="********" id="password" name="password"/>
      
        <div style = {{margin: 20}}>
          <h3>Select Your Tags (up to 5)</h3>
          {tagsArray.map((tag) => (
            <button
              key={tag}
              type = "button"
              onClick={() => handleTagClick(tag)}
              className={`tag-button ${selectedTags.includes(tag) ? 'tag-button-selected' : 'tag-button-unselected'}`}
            >
              {tag}
            </button>
          ))}
        </div>
        <label>
          Upload Image:
          <input type="file" onChange={onFileChange} />
        </label>
      
      <button className="button" type="submit">Register</button>
    </form>
    <button className="link-btn" onClick={handleClick}> Already have an account? Log in here.</button>
    </div>
    </div>
  );
}

export default Register;