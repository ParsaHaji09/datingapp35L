import ImageSlider from "./ImageSlider";
import PersonalBio from "./PersonalBio";
import ScrollAnimation from 'react-animate-on-scroll';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from "@material-ui/core/IconButton";

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


  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: "center", border: "2px solid red" }}>
      <div style={{ display: 'flex', gap: '3px', border: "2px solid blue", position: 'relative' }}>
        <div style={containerStyles}>
          <ImageSlider slides={slides} parentWidth={800} />
        </div>
          <PersonalBio />
          <IconButton style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <CreateIcon />
          </IconButton>
      </div>
    </div>
  );
};

export default Profile;
