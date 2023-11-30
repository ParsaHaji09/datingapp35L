import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import "./index.css";
import "./App.css";
import "./bootstrap.min.css";

import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Explore from './Components/Explore/Explore'
import Profile from './Components/Profile/Profile'
import Rating from "./Components/Rating/Rating";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  
  useEffect(() => {

  }, [currentForm])

  const toggleForm = (formName)=>{
    setCurrentForm(formName);
    console.log(currentForm);
  }
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    </Router>
    
  );
}

export default App;

{/* <Route path="/" element={<Login />} />
<Route path="/register" element={<Register />} /> */}