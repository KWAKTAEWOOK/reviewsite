import React, { useState } from "react";
import "../Detail/StarRating.css";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      평점 :　
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
      <button
        onClick={() => {
          alert("입력완료");
          console.log(rating);
        }}
      >
        <img className="plugin" src="/images/입력.png" />
      </button>
    </div>
  );
};

export default StarRating;
