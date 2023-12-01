import { useCallback, useRef, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Chip from '@mui/material/Chip';


const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
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
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  padding: "15px",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "15px",
};

const slidesContainerStyles = {
  display: "flex",
  height: "100%",
  transition: "transform ease-out 0.2s",
};

const slidesContainerOverflowStyles = {
  overflow: "hidden",
  height: "100%",
};

const chipStyle = {
  backgroundColor: 'rgba(139, 184, 232, 0.6)',
  color: '#fff',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  border: '1px solid #ddd',
};


const bioStyle = {
  position: "absolute",
  left: "0",
  right: "0",
  bottom: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end", // Align content to the bottom
  alignItems: "flex-start",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 6)", 
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  borderRadius: "10px",
  color: "#fff",
  textAlign: "center",
  padding: "1rem 2rem", // Add padding for better readability, adjust as needed
  zIndex: 2,
};

const ImageSlider = ({ slides, parentWidth }) => {
  const timerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const getDotStyle = (slideIndex) => ({
    ...dotStyle,
    color: currentIndex === slideIndex ? "#3992e5" : "black", // Set your desired colors
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
    backgroundImage: `url(${slides[slideIndex].url})`,
    width: `${parentWidth}px`,
  });
  const getSlidesContainerStylesWithWidth = () => ({
    ...slidesContainerStyles,
    width: parentWidth * slides.length,
    transform: `translateX(${-(currentIndex * parentWidth)}px)`,
  });

  return (
    <div className="App"></div>
    // <div style={sliderStyles}>
    //   <div style={bioStyle}>
    //     <h2>John Doe, 19</h2>
    //     <p>Here you can read things about me and understand what I am all about.</p>
    //     <div style={{ display: 'flex', gap: '8px' }}>
    //       {/* placeholders for tags */}
    //       <Chip label="Tag 1" style={chipStyle} /> 
    //       <Chip label="Tag 2" style={chipStyle} />
    //       <Chip label="Tag 3" style={chipStyle} />
    //     </div>
    //   </div>
    //   <div>
    //     <div onClick={goToPrevious} style={leftArrowStyles}>
    //       <ArrowBackIosIcon />
    //     </div>
    //     <div onClick={goToNext} style={rightArrowStyles}>
    //       <ArrowForwardIosIcon />
    //     </div>
    //   </div>
    //   <div style={slidesContainerOverflowStyles}>
    //     <div style={getSlidesContainerStylesWithWidth()}>
    //       {slides.map((_, slideIndex) => (
    //         <div
    //           key={slideIndex}
    //           style={getSlideStylesWithBackground(slideIndex)}
    //         ></div>
    //       ))}
    //     </div>
    //   </div>
    //   <div style={dotsContainerStyles}>
    //     {slides.map((slide, slideIndex) => (
    //       <div
    //         style={getDotStyle(slideIndex)}
    //         key={slideIndex}
    //         onClick={() => goToSlide(slideIndex)}
    //       >
    //         ●
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default ImageSlider;