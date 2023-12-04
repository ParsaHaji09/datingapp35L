import React from "react";
import "./ProfileEditor.css"; // Import your CSS file for styling

const ProfileEditor = ({ onClose }) => {
  return (
    <div className="profile-editor">
      {/* Your content for the profile editor */}
      <h2>Edit Name and Age</h2>
      {/* Add your input fields, buttons, or any other content here */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProfileEditor;
