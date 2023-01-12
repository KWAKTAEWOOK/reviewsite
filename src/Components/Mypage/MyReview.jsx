import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import "../../Style/Mypage/MyReview.scss";
import { BACKEND_URL } from "../../utils";
import TopbarV2 from "../Main/TopbarV2";
import MyReviewList from "./MyReviewList";
const MyReview = () => {
  const [user, setUser] = useRecoilState(userState);
  const [search_word, setSearch_word] = useState("");
  const [comments, setComments] = useState([]);
  const reverseComment = comments.map((comments) => comments).reverse();

  const onChange = (e) => {
    setSearch_word(e.target.value);
  };

  useEffect(() => {
    const getData = async (e) => {
      try {
        const data = await axios({
          url: `${BACKEND_URL}/comment/user?userId=${user.id}`,
          method: "GET",
        });
        setComments(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <>
      <TopbarV2 />
      <div className="MyReview_con">
        <div className="MyReview_title_div">
          <h3 className="MyReview_title_div_h3">넌 어때?</h3>
        </div>
        <div className="MyReview_title_div2">
          <h3 className="MyReview_title_div2_h3">🍴 내가 작성한 리뷰</h3>
        </div>
        <div className="MyReview_body">
          {/* <div className="MyReview_search_con">
            <div className="MyReview_search_box">
              <input
                className="input_seach"
                size={10}
                type="text"
                value={search_word}
                onChange={onChange}
                placeholder="검색어를 입력해주세요."
              ></input>
              <button type="submit" className="button_search">
                검색
              </button>
            </div>
          </div> */}
          <div className="MyReview_subject_list">
            <table className="MyReview_table">
              <thead>
                <tr>
                  <th scope="col" className="MyReview_table_th-num">
                    번호
                  </th>
                  <th scope="col" className="MyReview_table_th_place">
                    장소
                  </th>
                  <th scope="col" className="MyReview_table_th-title">
                    내용
                  </th>
                  <th scope="col" className="MyReview_table_th-date">
                    작성일
                  </th>
                  <th scope="col" className="MyReview_table_th_star_score">
                    별점
                  </th>
                </tr>
              </thead>
              {reverseComment.map((comment, index) => (
                <MyReviewList key={index} index={index} comment={comment} />
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReview;
