import React from "react";

const GalleryItem = ({ item, onView }) => {
  const { image, title, id } = item;
  return (
    <li onClick={() => onView(id)}>
      <img src={image} alt={title} />
    </li>
  );
};

export default GalleryItem;
