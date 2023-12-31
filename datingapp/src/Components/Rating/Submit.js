
import './Submit.css'
import React from 'react';

const Submit = ({ onSubmit }) => {
  return (
    <button onClick={onSubmit} type="submit"
      style={{ fontSize: '20px', padding: '12px 20px',borderRadius: '20px', border: '2px solid transparent', 
     color:'white'
    }}>
      Submit
    </button>
  );
};

export default Submit;