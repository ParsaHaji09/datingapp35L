import React, { useState } from 'react';
import ImageSlider from "./ImageSlider";
import Bio from "./Bio";

const GenericProfile = ({userData, otherId, accept, reject}) => {
  
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
          <ImageSlider userData={userData} otherId = {otherId} slides={userData.pic} parentWidth={800} accept = {accept} reject = {reject}/>
        </div>
        <Bio userData={userData} other_uid={otherId}/>
      </div>
    </div>
  );
};

export default GenericProfile;
