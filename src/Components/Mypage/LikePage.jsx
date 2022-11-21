import React from "react";
import TopbarV2 from "../Main/TopbarV2";
import "../../Style/Mypage/LikePage.scss";

const LikePage = () => {
  return (
    <>
      <TopbarV2 />
      <div className="likebackground">
        <div className="liketemplate">
          <div className="like_wrap">
            <p>내가 찜한 가게</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LikePage;
