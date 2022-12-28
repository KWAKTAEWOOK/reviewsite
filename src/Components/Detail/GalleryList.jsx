import React from "react";
import GalleryItem from "./GalleryItem";

const GalleryList = ({ imgs, currItem, onView }) => {
  const { title, image } = currItem;

  if (currItem.id === 5) {
  }
  return (
    <article className="left">
      {/* <img src={image} /> */}
      <ul>
        {imgs.map((item) => (
          <GalleryItem
            key={item.id}
            item={item}
            onView={onView}
            imgs={imgs}
            currItem={currItem}
          />
        ))}
      </ul>
    </article>
  );
};

export default GalleryList;
