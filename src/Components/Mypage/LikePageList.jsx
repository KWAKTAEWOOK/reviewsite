import React from "react";
import { useParams } from "react-router-dom";
import KakaoSearchDB from "../Hook/KakaoSearch";

const LikePageList = ({ likePost }) => {
  return (
    <>
      <div className="postList_wrap">
        <img src="/images/pizza.JPG" alt="" className="post_photo" />
        <div className="list_info_wrap">
          <div className="post_Number">{likePost.postid}</div>
          <div className="post_Name">가게 이름</div>
        </div>
      </div>
    </>
  );
};

export default LikePageList;
