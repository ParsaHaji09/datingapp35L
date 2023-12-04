import React, { useState } from 'react';
import ImageSlider from "./ImageSlider";
import Bio from "./Bio";

const GenericProfile = () => {
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

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: "center" }}>
      <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
        <div style={containerStyles}>
          <ImageSlider slides={slides} parentWidth={800} />
        </div>
        <Bio />
      </div>
    </div>
  );
};

export default GenericProfile;
