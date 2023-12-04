// Profile.js (or your component name)
import React, { useState } from 'react';
import ImageSlider from "./ImageSlider";
import PersonalBio from "./PersonalBio";
import CreateIcon from '@mui/icons-material/Create';
import IconButton from "@material-ui/core/IconButton";
import ProfileEditor from "./ProfileEditor";

const Profile = () => {
  const slides = [
    { url: "http://localhost:3000/image-1.jpg", title: "beach" },
    { url: "http://localhost:3000/image-2.jpg", title: "boat" },
    { url: "http://localhost:3000/image-3.jpg", title: "forest" },
    { url: "http://localhost:3000/image-4.jpg", title: "city" },
    { url: "http://localhost:3000/image-5.jpg", title: "italy" },
  ];
  const containerStyles = {
    width: "800px",
    height: "600px",
    margin: "0 auto",
    zIndex: 1,
  };

  const [isProfileEditorVisible, setProfileEditorVisible] = useState(false);

  const openProfileEditor = () => {
    console.log('Opening ProfileEditor');
    setProfileEditorVisible(true);
  };

  const closeProfileEditor = () => {
    console.log('Closing ProfileEditor');
    setProfileEditorVisible(false);
  };

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: "center" }}>
      <div style={{ display: 'flex', gap: '3px', position: 'relative' }}>
        <div style={containerStyles}>
          <ImageSlider slides={slides} parentWidth={800} />
        </div>
        <PersonalBio />
        <IconButton onClick={openProfileEditor} style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <CreateIcon />
        </IconButton>
      </div>

      {isProfileEditorVisible && <ProfileEditor onClose={closeProfileEditor} />}
    </div>
  );
};

export default Profile;
