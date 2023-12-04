import ImageSlider from "./ImageSlider";
import Bio from "./Bio";
import ScrollAnimation from 'react-animate-on-scroll';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from "@material-ui/core/IconButton";

const ExploringProfiles = () => {
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
    <div style={{ padding: "200px" }}>
      {/* <div style={containerStyles}>
            <ImageSlider slides={slides} parentWidth={800} />
      </div> */}
    
      
      {/* Assuming you want equal spacing between ImageSliders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', }}>
        {[...Array(5)].map((_, index) => (
          <ScrollAnimation animateIn="fadeInUp">
            <div style={{ display: 'flex', gap: '10px', justifyContent: "center", }}>
              <div style={{ display: 'flex', gap: '3px', border: "2px solid blue" }}>
                <div key={index} style={containerStyles}>
                  <ImageSlider slides={slides} parentWidth={800} />
                </div>
                {/* <ScrollAnimation animateIn="fadeInLeft">
                  <div style={{ display: 'flex', }}>
                    <Bio />
                  </div>
                </ScrollAnimation> */}
                <div style={{ display: 'flex', }}>
                  <Bio />
                </div>
                <IconButton style={{ alignSelf: 'flex-end', }}>
                  <CreateIcon />
                </IconButton>   
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>

  );
};

export default ExploringProfiles;
