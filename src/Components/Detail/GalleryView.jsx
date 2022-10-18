import React from "react";

const GalleryView = ({ currItem }) => {
  const { title, desc } = currItem;
  return (
    <article className="desc">
      <h3>{title}</h3>
      <p>{desc}</p>
    </article>
  );
};

export default GalleryView;
