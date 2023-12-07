import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { register } from '../../actions/reduxActions';
import { ErrorField } from './Error';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { allTags } from '../../constants/tags';


const Register = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [pronouns, setPronouns] = useState('She/Her');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('First Year');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneMsg, setPhoneMsg] = useState(null);
  const [pic, setPic] = useState(["https://res.cloudinary.com/deyvjcuxo/image/upload/v1701859740/default_profile_pzrkfd.png"]);
  const [picMsg, setPicMsg] = useState(null);

  const dispatch = useDispatch();
  const MAX_SELECTED_TAGS = 10; // Set the maximum number of selected tags

  const tagsArray = allTags;

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPhoneNumber(phone)) {
      return setPhoneMsg("Invalid Phone Number!");
    }
    setPhoneMsg(null);
    console.log(name, birthday, email, pronouns, year, major, pass, phone, selectedTags, pic);
    console.log('Register component submitted with email:', email);
    dispatch(register(name, birthday, email, pronouns, major, year, pass, phone, selectedTags, pic));
    navigate('/')
  }

  const uploadImage = (pics) => {
    if (!pics) {
      return setPicMsg("No Image Selected");
    }

    setPicMsg(null);

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'datewalk');
      data.append('cloud_name', 'deyvjcuxo');
      fetch("https://api.cloudinary.com/v1_1/deyvjcuxo/image/upload", {
        method: 'post',
        body: data,
      }).then((res) => res.json()).then((data) => {
        console.log(data)
        setPic(data.url.toString());
      }).catch((err) => {
        console.log(err);
      })
    } else {
      return setPicMsg("Unsupported Image Format");
    }
  }

  function capitalizeWords(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className = "App">
    <div className="auth-form-container">
    <form className="login-form" onSubmit={handleSubmit}>

    <label htmlFor="name">Full Name</label>
      <input value={capitalizeWords(name)} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Enter here" required />

    <div className ="flex-container">

      <div className="flex-item">
            <label htmlFor="pronouns">Pronouns</label>
            <select value={pronouns} onChange={(e) => setPronouns(e.target.value)} id="pronouns" name="pronouns">
            <option value="she/her">She/Her</option>
            <option value="he/him">He/Him</option>
            <option value="they/them">They/Them</option>
        </select>
        </div>

        <div className="flex-item">
          <label htmlFor="year">Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)} id="year" name="year" required>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th+">4th+</option>
        </select>
        </div>

        <div className="flex-item">
        <label htmlFor="birthday">Birthday</label>
      <input value={birthday} onChange={(e) => setBirthday(e.target.value)} type="date" placeholder= "placeholder" id="birthday" name="birthday" required/>
      </div>

      </div>
      <label htmlFor="major">Major</label>
      <input value={capitalizeWords(major)} onChange={(e) => setMajor(e.target.value)} name="major" id="major" placeholder="Enter here"/>

      <label htmlFor ="email">Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter here" id="email" name="email" required/>

      <label htmlFor ="password">Password</label>
      <input value={pass} onChange={(e) => setPass (e.target.value)} type="password" placeholder="********" id="password" name="password" required/>

      { phoneMsg !== null ? <ErrorField ErrorMessage = { phoneMsg } /> : null }
      <label htmlFor="phoneNumber">Phone Number</label>
      <PhoneInput country="US" value={phone} onChange={setPhone} placeholder="+1 (xxx) xxx-xxxx"  />

        <div style = {{margin: 20}}>
          <h3>Select Your Tags (up to 10)</h3>
          {tagsArray.map((tag) => (
            <button
              key={tag} type = "button" onClick={() => handleTagClick(tag)}
              className={`tag-button ${selectedTags.includes(tag) ? 'tag-button-selected' : 'tag-button-unselected'}`}
            >
              {tag}
            </button>
          ))}
        </div>

        <label>
          Upload Profile Picture:
          <input id = "custom-file" type = "file" label = "Upload Profile Picture" onChange={(e) => uploadImage(e.target.files[0])} />
          { picMsg }
        </label>
      
      <button className="button" type="submit">Register</button>
    </form>
    <button className="link-btn" onClick={handleClick}> Already have an account? Log in here.</button>
    </div>
    </div>
  );
}

export default Register;