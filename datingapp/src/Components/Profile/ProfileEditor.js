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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@material-ui/core/IconButton";


const ProfileEditor = ({ show, onHide, userData, setUserData }) => {
  const [curData, setCurData] = useState(userData);
  const [name, setName] = useState(userData.name);
  const [year, setYear] = useState(userData.year);
  const [pronouns, setPronouns] = useState(userData.pronouns);
  const [major, setMajor] = useState(userData.major);
  const [bio, setBio] = useState(userData.bio);
  const [selectedTags, setSelectedTags] = useState(userData.tags);
  const [selectedImages, setSelectedImages] = useState(userData.pic);
  const [currentPage, setCurrentPage] = useState(1);
  const [instagram, setInstagram] = useState(userData.instagram);
  const [facebook, setFacebook] = useState(userData.facebook);
  const [tiktok, setTiktok] = useState(userData.tiktok);
  const [snapchat, setSnapchat] = useState(userData.snapchat);
  const [spotify, setSpotify] = useState(userData.spotify);
  const [twitter, setTwitter] = useState(userData.twitter);


  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  //@aland figure out async and stuff???
  // np baebae :kiss:
  const uploadImage = (pics) => {
    const imCount = Math.min(pics.length, 5);
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
        "instagram": instagram,
        "facebook": facebook,   // Include Facebook
        "snapchat": snapchat,   // Include Snapchat
        "twitter": twitter,     // Include Twitter
        "tiktok": tiktok,       // Include TikTok
        "spotify": spotify,  
      });
      console.log(bio);
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

  return (
    <Dialog open={show} onClose={onHide} fullWidth maxWidth="sm" style={{ maxHeight: '100vh', height: '100vh' }}>
      <IconButton onClick={onHide} style={{ position: 'absolute', right: '6px', top: '6px' }}>
        <CloseIcon />
      </IconButton>
      <DialogTitle style={{ fontSize: '36px' }}>Edit Profile</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        {currentPage === 1 && (
          <div>
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
                  placeholder='Major'
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
                placeholder='Bio'
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
          </div>
        )}

        {currentPage === 2 && (
          <div> 
            <div style={{ display: 'flex', gap: '16px' }}>
              {/* Instagram */}
              <div style={{ flex: 1 }}>
                  <InputLabel htmlFor="instagram">Instagram</InputLabel>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="instagram"
                    type="text"
                    fullWidth
                    placeholder='Instagram Username'
                    value={instagram} // change me
                    onChange={(e) => setInstagram(e.target.value)} // change me
                  />
              </div>
              {/* Facebook */}
              <div style={{ flex: 1 }}>
                  <InputLabel htmlFor="facebook">Facebook</InputLabel>
                  <TextField
                    margin="dense"
                    id="facebook"
                    type="text"
                    fullWidth
                    placeholder='Facebook Username'
                    value={facebook} // change me
                    onChange={(e) => setFacebook(e.target.value)} // change me
                  />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              {/* Snapchat */}
              <div style={{ flex: 1 }}>
                  <InputLabel htmlFor="snapchat">Snapchat</InputLabel>
                  <TextField
                    margin="dense"
                    id="snapchat"
                    type="text"
                    fullWidth
                    placeholder='Snapchat Username'
                    value={snapchat} // change me
                    onChange={(e) => setSnapchat(e.target.value)} // change me
                  />
              </div>
              {/* Twitter */}
              <div style={{ flex: 1 }}>
                  <InputLabel htmlFor="twitter">Twitter</InputLabel>
                  <TextField
                    margin="dense"
                    id="twitter"
                    type="text"
                    fullWidth
                    placeholder='Twitter Username'
                    value={twitter} // change me
                    onChange={(e) => setTwitter(e.target.value)} // change me
                  />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              {/* Tiktok */}
              <div style={{ flex: 1 }}>
                  <InputLabel htmlFor="">Tiktok</InputLabel>
                  <TextField
                    margin="dense"
                    id="tiktok"
                    type="text"
                    fullWidth
                    placeholder='Tiktok Username'
                    value={tiktok} // change me
                    onChange={(e) => setTiktok(e.target.value)} // change me
                  />
              </div>
              {/* Spotify */}
              <div style={{ flex: 1 }}>
                  <InputLabel htmlFor="spotify">Spotify</InputLabel>
                  <TextField
                    margin="dense"
                    id="spotify"
                    type="text"
                    fullWidth
                    placeholder='Spotify Username'
                    value={spotify} // change me
                    onChange={(e) => setSpotify(e.target.value)} // change me
                  />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              {/* Image Upload */}
              <InputLabel style= {{ paddingTop: '3px', paddingBottom: '9px' }} htmlFor="name">Images (Up to 5) </InputLabel>
              <div style={{ display: 'flex', border: '1px solid #c8c4c4', borderRadius: '4px' }}>
                <input style={{ }} type="file" accept="image/*" multiple onChange={(e) => { uploadImage(e.target.files); }} />
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', marginTop: '16px', fontStyle: 'italic', color: '#757575', height: '100vh', alignItems: 'flex-end'}}>
          To change password, birthday, or phone number, please email support@datewalk.com
        </div>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex'}}>
          <Button style={{ minWidth: '50px', maxWidth: '50px' }} onClick={prevPage} disabled={currentPage === 1}>
            {/* You can also use Tooltip to add text if needed */}
            <ArrowBackIosNewIcon />
          </Button>
          <Button style={{ minWidth: '50px', maxWidth: '50px' }} onClick={nextPage} disabled={currentPage === 2}>
            {/* You can also use Tooltip to add text if needed */}
            <ArrowForwardIosIcon/>
          </Button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={onHide} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileEditor;
