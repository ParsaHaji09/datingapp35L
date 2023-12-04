// Profile.js (or your component name)
import React, { useState } from 'react';
import ImageSlider from "./ImageSlider";
import Bio from "./Bio";
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: "center" }}>
      <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
        <div style={containerStyles}>
          <ImageSlider slides={slides} parentWidth={800} />
        </div>
        <Bio />
        <IconButton onClick={handleShow} style={{ color: "rgba(255, 255, 255, 0.5)", position: 'absolute', bottom: '3px', right: '3px' }}>
          <CreateIcon />
        </IconButton>
      </div>
      <ProfileEditor show={show} onHide={handleClose} />
    </div>
  );
};

export default Profile;
