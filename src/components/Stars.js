import React from "react";

const StarsComponent = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span 
        key={i} 
        style={{ 
          color: i < rating ? "#FFD600" : "#D9D9D9", 
          marginRight: i < 4 ? "3px" : "0" 
        }}
      >
        ★
      </span>
    );
  }
  return <div style={{ fontSize: "20px" }}>{stars}</div>;
};

export default StarsComponent;
