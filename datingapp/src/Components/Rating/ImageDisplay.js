import React from "react";
import "../Profile/Profile.css";

const slideStyles = {
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "20px",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
  borderRadius: "20px",
};

const infoStyles = {
  position: "absolute",
  left: "0",
  right: "0",
  bottom: "0",
  borderRadius:"0 0 20px 20px",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  background:
    "linear-gradient(0deg, rgba(0, 0, 0, 1.2), rgba(0, 0, 0, .8) 45%, rgba(0, 0, 0, 0))",
  color: "#fff",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
  textAlign: "left",
  padding: "2rem 0.8rem 0.2rem",
  h2: {
    padding: "3rem 0rem 0rem",
    fontSize: "24px",
    fontFamily: 'Jost, sans-serif',
  },
  p: {
    fontSize: "14px",
    color: "#e6e6e6",
    fontFamily: 'Nunito, sans-serif',
  },
  pronouns: {
    fontSize: "14px",
    color: "#808080",
    fontFamily: 'Nunito, sans-serif',
  },
};

const ImageSlider = ({ slides, parentWidth, userData }) => {
  const getSlideStylesWithBackground = (slideIndex) => ({
    ...slideStyles,
    backgroundImage: `url(${slides[slideIndex]})`,
    width: `${parentWidth}px`,
  });

  function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <div style={sliderStyles}>
      <div style={infoStyles}>
        <h2 style={infoStyles.h2}>{userData.name}, {calculateAge(userData.birthday)}</h2>
        <p style={infoStyles.p}>
          {userData.year} Year {userData.major} Major
          <span style={infoStyles.pronouns}>
            <em>, {userData.pronouns}</em>
          </span>
        </p>
      </div>
      <div style={getSlideStylesWithBackground(0)}></div>
    </div>
  );
};

export default ImageSlider;