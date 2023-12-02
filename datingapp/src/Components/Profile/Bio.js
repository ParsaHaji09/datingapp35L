// bio.js

import React from 'react';

const Bio = () => {
  const user = {
    name: 'John Doe',
    age: 25,
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...',
    // Add other user information here
  };

  return (
    <div>
      <h2>{user.name}, {user.age}</h2>
      <p>{user.bio}</p>
      {/* Display other user information as needed */}
    </div>
  );
};

export default Bio;
