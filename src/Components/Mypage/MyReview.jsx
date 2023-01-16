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
        <div className="MyReview_body">
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
