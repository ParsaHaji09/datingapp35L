import { useCallback, useRef, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Chip from '@mui/material/Chip';
import "./Profile.css"

const slideStyles = {
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
  overflow: "hidden",
  borderRadius: "20px",
};

const dotsContainerStyles = {
  position: "absolute",
  bottom: "8px", // Adjust the position from the bottom as needed
  width: "100%",
  display: "flex",
  justifyContent: "center",
  zIndex: 2,
};

const dotStyle = {
  margin: "0 2.7px",
  cursor: "pointer",
  fontSize: "12px",
};

const slidesContainerStyles = {
  display: "flex",
  height: "100%",
  transition: "transform ease-out 0.5s",
};

const slidesContainerOverflowStyles = {
  overflow: "hidden",
  height: "100%",
};

const infoStyles = {
  position: "absolute",
  left: "0",
  right: "0",
  bottom: "0",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end", // Align content to the bottom
  alignItems: "flex-start", 
  background: "linear-gradient(0deg, rgba(0, 0, 0, 1.2), rgba(0, 0, 0, .8) 45%, rgba(0, 0, 0, 0))", // Gradient background
  color: "#fff",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
  textAlign: "left",
  padding: "2.3rem 2.2rem 0.2rem", // Add padding for better readability, adjust as needed

  h2: {
    padding: "3rem 0rem 0rem", // Add margin-bottom to create a gap
    fontSize: "48px",
    fontFamily: 'Jost, sans-serif',
  },

  p: {
    fontSize: "18px",
    color: "#e6e6e6",
    fontFamily: 'Nunito, sans-serif',
  },

  pronouns: {
    fontSize: "18px",
    color: "#808080",
    fontFamily: 'Nunito, sans-serif',
  },

};

const chipStyles = {
  color: "white"
}

const ImageSlider = ({ slides, parentWidth, userData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const getDotStyle = (slideIndex) => ({
    ...dotStyle,
    color: currentIndex === slideIndex ? "#01BFFF" : "rgba(255, 255, 255, 0.5)", // Set your desired colors
  });
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const getSlideStylesWithBackground = (slideIndex) => ({
    ...slideStyles,
    backgroundImage: `url(${slides[slideIndex]})`,
    width: `${parentWidth}px`,
  });
  const getSlidesContainerStylesWithWidth = () => ({
    ...slidesContainerStyles,
    width: parentWidth * slides.length,
    transform: `translateX(${-(currentIndex * parentWidth)}px)`,
  });

  function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();
  
    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthDate.getFullYear();
  
    // Check if the birthday has occurred this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      // If not, subtract 1 from the age
      age--;
    }
  
    return age;
  }


  return (
    <div style={sliderStyles}>
      <div style={infoStyles}>
        <h2 style={infoStyles.h2}>{userData.name}, {calculateAge(userData.birthday)}</h2>
        <p style={infoStyles.p}>{userData.year} Year {userData.major} Major<span style={infoStyles.pronouns}><em>, {userData.pronouns}</em></span></p>

      </div>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          <ArrowBackIosIcon />
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          <ArrowForwardIosIcon />
        </div>
      </div>
      <div style={slidesContainerOverflowStyles}>
        <div style={getSlidesContainerStylesWithWidth()}>
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              style={getSlideStylesWithBackground(slideIndex)}
            ></div>
          ))}
        </div>
      </div>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={getDotStyle(slideIndex)}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;