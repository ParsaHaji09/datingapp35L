import React from 'react';
import ImageSlider from "./ImageSlider";
import Bio from "./Bio";

const GenericProfile = ({userData, otherData, accept, reject}) => {
  
  const containerStyles = {
    width: "800px",
    height: "600px",
    margin: "0 auto",
    zIndex: 1,
  };

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: "center" }}>
      {otherData ? (
        <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
          <div style={containerStyles}>
            <ImageSlider userData={userData} otherData={otherData} slides={otherData.pic} parentWidth={800} accept={accept} reject={reject} />
          </div>
          <Bio userData={otherData} />
        </div>
      ) : (
        <p>No Matches Available</p>
      )}
    </div>
  );
  
};

export default GenericProfile;
