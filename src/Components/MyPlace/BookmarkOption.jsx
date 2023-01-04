import React from "react";

const BookmarkOption = ({ names, index }) => {
  return (
    <option key={index} value={names.id}>
      {names.bookmarkName}
    </option>
  );
};

export default BookmarkOption;
