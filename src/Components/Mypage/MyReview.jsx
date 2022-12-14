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
          <h3 className="MyReview_title_div_h3">λ μ΄λ?</h3>
        </div>
        <div className="MyReview_title_div2">
          <h3 className="MyReview_title_div2_h3">π΄ λ΄κ° μμ±ν λ¦¬λ·°</h3>
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
                placeholder="κ²μμ΄λ₯Ό μλ ₯ν΄μ£ΌμΈμ."
              ></input>
              <button type="submit" className="button_search">
                κ²μ
              </button>
            </div>
          </div> */}
          <div className="MyReview_subject_list">
            <table className="MyReview_table">
              <thead>
                <tr>
                  <th scope="col" className="MyReview_table_th-num">
                    λ²νΈ
                  </th>
                  <th scope="col" className="MyReview_table_th_place">
                    μ₯μ
                  </th>
                  <th scope="col" className="MyReview_table_th-title">
                    λ΄μ©
                  </th>
                  <th scope="col" className="MyReview_table_th-date">
                    μμ±μΌ
                  </th>
                  <th scope="col" className="MyReview_table_th_star_score">
                    λ³μ 
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
