// LoadingSpinner.js
import React from 'react';
import './Loading.css';
import { div } from 'framer-motion/client';

function Spinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
  </div>);
}

export default Spinner;
