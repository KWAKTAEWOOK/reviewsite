import React from "react";

const MyPlaceList = ({ bookmark }) => {
  const name = bookmark?.postName;
  const postId = bookmark?.postId;

  return (
    <>
      <div className="place_bmlist">
        <div className="place_bmlist_title">
          <span
            onClick={() => {
              window.location.href = `http://localhost:3000/Detail/${name}/${postId}`;
            }}
          >
            {bookmark.postName}
          </span>
        </div>
        <button
          className="place_bmlist_delete"
          onClick={() => {
            // window.location.reload();
          }}
        >
          삭제
        </button>
      </div>
    </>
  );
};

export default MyPlaceList;
