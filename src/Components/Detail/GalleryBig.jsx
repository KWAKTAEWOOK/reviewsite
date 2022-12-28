import React from "react";

const GalleryBig = ({ currItem, onView }) => {
  const { title, image } = currItem;

  return (
    <div className="GalleryBig">
      <img src={image} />
    </div>
  );
};

export default GalleryBig;
