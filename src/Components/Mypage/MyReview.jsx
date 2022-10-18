import React from "react";
import Topbar from "../Main/Topbar";
import "../../Style/Mypage/MyReview.scss";

const MyReview = () => {
  return (
    <div>
      <Topbar />
      <div className="con">
        <div className="MyReview_Top_Bar">
          <ul>
            닉네임, 작성자의 등급표시?
            <br />
            <li>작성한 리뷰 : 갯수표시</li>
          </ul>
        </div>
        <div className="main_cotent">
          {/* 식당 또는 카페 이름을 클릭을 하면 해당 주소로 이동 */}
          <a href="#">식당이름</a>
          <br />
          별갯수 , 작성날짜표시
          <br />
          <img className="Food_img" src="https://ifh.cc/g/c8yJfc.jpg" alt="" />
          <br />
          리뷰 작성
          <br />
          Food name
        </div>
      </div>
    </div>
  );
};

export default MyReview;
