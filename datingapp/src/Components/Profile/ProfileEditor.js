// ProfileEditor.js
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';

const ProfileEditor = ({ show, onHide, userData, setUserData }) => {
  const [curData, setCurData] = useState(userData);
  const [name, setName] = useState(userData.name);
  const [year, setYear] = useState(userData.year);
  const [pronouns, setPronouns] = useState(userData.pronouns);
  const [major, setMajor] = useState(userData.major);
  const [bio, setBio] = useState(userData.bio);
  const [selectedTags, setSelectedTags] = useState(userData.tags);
  const [selectedImages, setSelectedImages] = useState(userData.pic);
  const bioPlaceholder = "Hey, I'm Daemon. In my free time, I run silently in the background to monitor subsystems to ensure that my current operating system runs properly. I am going to make this bio longer to see how things may look if a user's bio becomes long. Right now, what you see is what you get. We are going to try to make this as long as possible."

  //@aland figure out async and stuff???
  // np baebae :kiss:
  const uploadImage = (pics) => {
    const imCount = Math.min(pics.length, 4);
    let imUrls = [];

    for (let i=0; i < imCount; i++){
      let pic = pics[i];
      console.log("Pic " + i + " " + pics[i]);
      if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
        const data = new FormData();
        data.append('file', pic);
        data.append('upload_preset', 'datewalk');
        data.append('cloud_name', 'deyvjcuxo');
        fetch("https://api.cloudinary.com/v1_1/deyvjcuxo/image/upload", {
            method: 'post',
            body: data,
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            imUrls.push(data.url.toString());

            if (imUrls.length === imCount) setSelectedImages(imUrls);

        }).catch((err) => {
            console.log(err);
        })
        } else {
        console.log("Unsupported Image Format");
        }
    }   
  }

  const handleSave = () => {
    // Add logic to save the input data
    updateUserData();
    console.log(userData.pronouns);
    onHide();
  };

  const updateUserData = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userData._id}`, {
        "name": name,
        "bio": bio,
        "major": major,
        "pronouns": pronouns,
        "year": year,
        "tags": selectedTags,
        "pic": selectedImages,
      });
      console.log('successful udata upload');
      console.log(response.data); // Handle the response from the server
      setCurData(response.data);
      setUserData(response.data);
      localStorage.setItem('saveData', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const tags = ["Funny", "Introverted", "Extroverted", "Casual", "Adventurous", "Creative", "Organized", "Laid-back", "Optimistic", "Reserved"];

  const handleChipClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleImageUpload = (event) => {
    
    const files = [...event.target.files];  // Use the spread operator to convert FileList to an array
  
    if (files.length <= 4) {
      setSelectedImages(files);
    } else {
      console.log("You can only select up to 4 images");
    }
    console.log(files);
  };
  

  return (
    <Dialog open={show} onClose={onHide} fullWidth maxWidth="sm">
      <DialogTitle style={{ fontSize: '36px' }}>Edit Profile</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Name */}
          <div style={{ flex: 1 }}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              placeholder='Daemon Eggert-Smallberg'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Year */}
          <div style={{ flex: 1 }}>
            <InputLabel htmlFor="year">Year</InputLabel>
            <TextField
              margin="dense"
              id="year"
              type="text"
              fullWidth
              placeholder='2nd'
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Email */}
          <div style={{ flex: 1 }}>
            <InputLabel htmlFor="pronouns">Pronouns</InputLabel>
            <TextField
              margin="dense"
              id="pronouns"
              type="text"
              fullWidth
              placeholder='Pronouns'
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
            />
          </div>

          {/* Major */}
          <div style={{ flex: 1 }}>
            <InputLabel htmlFor="major">Major</InputLabel>
            <TextField
              margin="dense"
              id="major"
              type="text"
              fullWidth
              placeholder='Computer Science'
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          {/* Bio */}
          <InputLabel htmlFor="bio">Bio (Max 300 chars.)</InputLabel>
          <TextField
            margin="dense"
            id="bio"
            type="text"
            fullWidth
            placeholder={bioPlaceholder}
            multiline
            rows={5}
            inputProps={{
              maxLength: 300,
            }}
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= 300) {
                setBio(e.target.value);
              }
            }}
          />
        </div>

        <div style={{ marginTop: '16px', marginBottom: '26px' }}>
          {/* Tags */}
          <InputLabel>Tags (Choose up to 5)</InputLabel>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              clickable
              color={selectedTags.includes(tag) ? 'primary' : 'default'}
              onClick={() => handleChipClick(tag)}
            />
          ))}
        </div>


        <div style={{ marginTop: '24px', marginBottom: '24px' }}>
          {/* Image Upload */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <InputLabel>Upload Images (Up to 4)</InputLabel>
            <input type="file" accept="image/*" multiple onChange={(e) => { uploadImage(e.target.files); }} />
          </div>
        </div>

        <div style={{ marginTop: '16px', fontStyle: 'italic', color: '#757575' }}>
          To change password, birthday, or phone number, please email support@datewalk.com
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHide}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileEditor;
