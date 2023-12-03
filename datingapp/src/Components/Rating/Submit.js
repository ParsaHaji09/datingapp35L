
  // Submit.jsx
import React from 'react';

const Submit = ({ onSubmit }) => {
  return (
    <button onClick={onSubmit} type="submit">
      Submit
    </button>
  );
};

export default Submit;