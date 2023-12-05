import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { register } from '../../actions/reduxActions';
import ErrorRedirect, { ErrorField } from './Error';
import { isValidPhoneNumber } from 'react-phone-number-input';


const Register = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneMsg, setPhoneMsg] = useState(null);
  const [pic, setPic] = useState("");
  const [picMsg, setPicMsg] = useState(null);


  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

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
    if (!isValidPhoneNumber(phone)) {
      return setPhoneMsg("Invalid Phone Number!");
    }
    setPhoneMsg(null);
    console.log(name, birthday, email, pronouns, year, major, pass, phone, selectedTags, pic);
    console.log('Register component submitted with email:', email);
    dispatch(register(name, email, pronouns, year, major, pass, selectedTags, pic));
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

  return (
    <div className = "App">
    <div className="auth-form-container">
    <form className="login-form" onSubmit={handleSubmit}>

    <label htmlFor="name">Full Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Enter here"/>

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
          <select value={year} onChange={(e) => setYear(e.target.value)} id="year" name="year">
          <option value="First Year">First Year</option>
          <option value="Second Year">Second Year</option>
          <option value="Third Year">Third Year</option>
          <option value="Fourth Year+">Fourth Year+</option>
        </select>
        </div>

        <div className="flex-item">
        <label htmlFor="birthday">Birthday</label>
      <input value={birthday} onChange={(e) => setBirthday(e.target.value)} type="date" placeholder= "placeholder" id="birthday" name="birthday"/>
      </div>

      </div>
      <label htmlFor="major">Major</label>
      <input value={major} onChange={(e) => setMajor(e.target.value)} name="major" id="major" placeholder="Enter here"/>

      <label htmlFor ="email">Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter here" id="email" name="email"/>

      <label htmlFor ="password">Password</label>
      <input value={pass} onChange={(e) => setPass (e.target.value)} type="password" placeholder="********" id="password" name="password"/>

      <label htmlFor="birthday">Birthday</label>
      <input value={birthday} onChange={(e) => setBirthday(e.target.value)} type="date" id="birthday" name="birthday"/>

      { phoneMsg !== null ? <ErrorField ErrorMessage = { phoneMsg } /> : null }
      <label htmlFor="phoneNumber">Phone Number</label>
      <PhoneInput country="US" value={phone} onChange={setPhone} placeholder="+1 (xxx) xxx-xxxx"  />

        <div style = {{margin: 20}}>
          <h3>Select Your Tags (up to 5)</h3>
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
          Upload Image:
          <input id = "custom-file" type = "file" label = "Upload Profile Picture" custom onChange={(e) => uploadImage(e.target.files[0])} />
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