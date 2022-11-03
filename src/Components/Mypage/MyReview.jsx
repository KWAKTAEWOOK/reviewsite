import React, { useState } from "react";
import "../../Style/Mypage/MyReview.scss";
import TopbarV2 from "../Main/TopbarV2";

const MyReview = () => {
  const [search_word, setSearch_word] = useState("");
  const onChange = (e) => {
    setSearch_word(e.target.value);
  };

  return (
    <>
      <TopbarV2 />
      <div className="MyReview_con">
        <div className="MyReview_title">
          <h3>내가 작성한 리뷰</h3>
        </div>
        <div className="MyReview_body">
          <div className="MyReview_search_con">
            <div className="MyReview_search_box">
              <input
                className="input_seach"
                size={10}
                type="text"
                value={search_word}
                onChange={onChange}
                placeholder="검색어를 입력해주세요."
              ></input>
              <button className="button_search">검색</button>
            </div>
          </div>
          <div className="MyReview_subject_list">
            <form action="" method="GET"></form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReview;
