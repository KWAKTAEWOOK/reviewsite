import React from "react";
import { LOCAL_URL } from "../../utils";

const LikePageList = ({ likePost }) => {
  const id = likePost.postid;
  const name = likePost.postName;
  const img = likePost.img;

  return (
    <>
      <div className="postList_wrap">
        <img
          src={img}
          alt=""
          className="post_photo"
          onClick={() => {
            window.location.href = `${LOCAL_URL}/Detail/${name}/${id}`;
          }}
        />
        <div className="list_info_wrap">
          <div
            className="post_Name"
            onClick={() => {
              window.location.href = `${LOCAL_URL}/Detail/${name}/${id}`;
            }}
          >
            {name}
          </div>
        </div>
      </div>
    </>
  );
};

export default LikePageList;
