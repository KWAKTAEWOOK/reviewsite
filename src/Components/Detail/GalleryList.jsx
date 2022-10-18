import React from "react";
import GalleryItem from "./GalleryItem";

const GalleryList = ({ datas, currItem, onView }) => {
  const { image, title } = currItem;

  return (
    <article className="left">
      <img src={image} alt={title} />
      <ul>
        {datas.map((item) => (
          <GalleryItem key={item.id} item={item} onView={onView} />
        ))}
      </ul>
    </article>
  );
};

export default GalleryList;
