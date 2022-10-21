import React from "react";
import Topbar from "../Main/Topbar";
import "../../Style/Mypage/MyReview.scss";
import TopbarV2 from "../Main/TopbarV2";

const MyReview = () => {
  return (
    <>
      <TopbarV2 />
      <div className="con">
        <ul>
          {" "}
          <div>
            (유저 이미지)
            <img src="" alt="" />
          </div>
          <a href="#">(닉네임 누르면 작성한 리뷰 목록 보이게)</a>
          <br />
          <li>작성한 리뷰 갯수 : (리뷰갯수)</li>
        </ul>
        <div className="cotent">
          <ul>
            {" "}
            <a href="#">(식당 또는 카페 이름 클릭 시 해당 식당(카페)로 이동)</a>
            <li>
              (Localdate 표시)
              <div>
                (사진 있으면 저장된 사진 불어오고 없으면 없는대로)
                <img src="" alt="" />
                <br />
              </div>{" "}
              (리뷰 작성)
            </li>
          </ul>
          <div>
            <a href="#">(메뉴 표시 및 클릭 시 해당 식당 카페로 이동)</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReview;
