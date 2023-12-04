
  // Submit.jsx
import React from 'react';

const Submit = ({ onSubmit }) => {
  return (
    <button onClick={onSubmit} type="submit"
      style={{ fontSize: '20px', padding: '12px 20px' }}>
      Submit
    </button>
  );
};

export default Submit;