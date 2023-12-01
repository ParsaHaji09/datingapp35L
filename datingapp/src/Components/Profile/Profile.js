import ImageSlider from "./ImageSlider";
const Profile = () => {
  const slides = [
    { url: "http://localhost:3000/image-1.jpg", title: "beach" },
    { url: "http://localhost:3000/image-2.jpg", title: "boat" },
    { url: "http://localhost:3000/image-3.jpg", title: "forest" },
    { url: "http://localhost:3000/image-4.jpg", title: "city" },
    { url: "http://localhost:3000/image-5.jpg", title: "italy" },
  ];
  const containerStyles = {
    width: "450px",
    height: "800px",
    margin: "0 auto",
    // 16:9 aspect ratio
  };

  return (
    <div>
      <div style={{ padding: "15px" }}></div>
      <div style={containerStyles}>
        <ImageSlider slides={slides} parentWidth={450} />
      </div>
    </div>
  );
};

export default Profile;