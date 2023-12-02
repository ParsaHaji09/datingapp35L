import ImageSlider from "./ImageSlider";
import Bio from "./Bio";
import ScrollAnimation from 'react-animate-on-scroll';

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
    // 16:9 aspect ratio
  };

  return (
    <div>
      <div style={{ padding: "50px" }}></div>
      {/* <div style={containerStyles}>
            <ImageSlider slides={slides} parentWidth={800} />
      </div> */}
    
      
      {/* Assuming you want equal spacing between ImageSliders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {[...Array(5)].map((_, index) => (
          <ScrollAnimation animateIn="fadeInUp">
            <div key={index} style={containerStyles}>
              <ImageSlider slides={slides} parentWidth={800} />
            </div>
          </ScrollAnimation>
        ))}
      </div>

      <div style={{ padding: "50px" }}></div>
    </div>
  );
};

export default Profile;
