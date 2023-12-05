import React, { useState } from 'react';
import ImageSlider from "./ImageSlider";
import Bio from "./Bio";

const GenericProfile = ({userData}) => {
  
  const containerStyles = {
    width: "800px",
    height: "600px",
    margin: "0 auto",
    zIndex: 1,
  };

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: "center" }}>
      <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
        <div style={containerStyles}>
          <ImageSlider userData={userData} slides={userData.pic} parentWidth={800} />
        </div>
        <Bio userData={userData}/>
      </div>
    </div>
  );
};

export default GenericProfile;
