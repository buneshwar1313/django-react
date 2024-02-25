import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value }) => {
  // Convert rating value to a percentage
  const percentage = (value / 10) * 100;

  return (
    <div className="rating">
      {/* Container for the empty stars */}
      <div className="stars empty-stars">
        <iconify-icon icon="material-symbols-light:star-outline"></iconify-icon>
        <iconify-icon icon="material-symbols-light:star-outline"></iconify-icon>
        <iconify-icon icon="material-symbols-light:star-outline"></iconify-icon>
        <iconify-icon icon="material-symbols-light:star-outline"></iconify-icon>
        <iconify-icon icon="material-symbols-light:star-outline"></iconify-icon>
      </div>
      {/* Container for the filled stars */}
      <div className="stars filled-stars" style={{ width: `${percentage}%` }}>
        <iconify-icon icon="material-symbols-light:star-outline"></iconify-icon>
        <iconify-icon icon="material-symbols-light:star-outline"></iconify-icon>
        <iconify-icon icon="material-symbols-light:star-outline"></iconify-icon>
        <iconify-icon icon="material-symbols-light:star-outline"></iconify-icon>
        <iconify-icon icon="material-symbols-light:star-outline"></iconify-icon>
      </div>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Rating;
