import React from "react";

const GalleryItem = ({ item, onView }) => {
  const { image, title, id } = item;

  if (id <= 5)
    return (
      <li
        className={id === 5 ? `Viewmore` : `offView`}
        onClick={() => onView(id)}
      >
        <img src={image} />
        {id === 5 && <span>+60</span>}
      </li>
    );
};

export default GalleryItem;
