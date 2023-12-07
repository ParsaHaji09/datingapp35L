import ImageSlider from "../Profile/ImageSlider";
import ScrollAnimation from 'react-animate-on-scroll';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GalleryScroll = () => {
    const [result, setResult] = useState([]);
    
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
      async function getUsers(){
        try {
          const config = {
            headers: {
              "Content-type":"application/json",
            },
          };
          const database_users = await axios.get("/api/users/all-users", config);
          console.log(database_users)
          setResult(database_users)
          
        } catch (error) {
          console.log(error)
        }
      };
      
      useEffect(() => {
        getUsers();
        console.log(result);
      }, []);

    return (
        <div style={{ padding: "50px" }}> 
          {/* <div style={containerStyles}>
                <ImageSlider slides={slides} parentWidth={800} />
          </div> */}
        
          
          {/* Assuming you want equal spacing between ImageSliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', }}>
            {[...Array(5)].map((_, index) => (
              <ScrollAnimation key = {index} animateIn="fadeInUp">
                <div style={{ display: 'flex', gap: '10px', justifyContent: "center", }}>
                  <div style={{ display: 'flex', gap: '3px', border: "2px solid blue" }}>
                    <div key={index} style={containerStyles}>
                      <ImageSlider slides={slides} parentWidth={800} />
                    </div>
                    {/* <ScrollAnimation animateIn="fadeInLeft">
                      <div style={{ display: 'flex', }}>
                        <PersonalBio />
                      </div>
                    </ScrollAnimation> */}
                    
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
    
      );

}

export default GalleryScroll;