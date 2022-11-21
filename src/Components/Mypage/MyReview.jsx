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
        <div className="MyReview_title_div">
          <h3 className="MyReview_title_div_h3">넌 어때?</h3>
        </div>
        <div className="MyReview_title_div2">
          <h3 className="MyReview_title_div2_h3">내가 작성한 리뷰</h3>
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
              <button type="submit" className="button_search">
                검색
              </button>
            </div>
          </div>
          <div className="MyReview_subject_list">
            <table className="MyReview_table">
              <thead>
                <tr>
                  <th scope="col" class="MyReview_table_th-num">
                    번호
                  </th>
                  <th scope="col" class="MyReview_table_th-title">
                    제목
                  </th>
                  <th scope="col" class="MyReview_table_th-date">
                    작성일
                  </th>
                  <th scope="col" class="MyReview_table_th_star_score">
                    별점
                  </th>
                  <th scope="col" class="MyReview_table_th_views">
                    조회수
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <th>
                    <a href="#">JMT</a>
                  </th>
                  <td>2022-11-01</td>
                  <td>별점</td>
                  <td>views</td>
                </tr>
                <tr>
                  <td>2</td>
                  <th>
                    <a href="#!">JMT2</a>
                  </th>
                  <td>2022-11-02</td>
                  <td>별점</td>
                  <td>views</td>
                </tr>
                <tr>
                  <td>3</td>
                  <th>
                    <a href="#!">JMT3</a>
                  </th>
                  <td>2022-11-03</td>
                  <td>별점</td>
                  <td>views</td>
                </tr>
                <tr>
                  <td>4</td>
                  <th>
                    <a href="#!">JMT3</a>
                  </th>
                  <td>2022-11-03</td>
                  <td>별점</td>
                  <td>views</td>
                </tr>
                <tr>
                  <td>5</td>
                  <th>
                    <a href="#!">JMT3</a>
                  </th>
                  <td>2022-11-03</td>
                  <td>별점</td>
                  <td>views</td>
                </tr>
                <tr>
                  <td>6</td>
                  <th>
                    <a href="#!">JMT3</a>
                  </th>
                  <td>2022-11-03</td>
                  <td>별점</td>
                  <td>views</td>
                </tr>
                <tr>
                  <td>7</td>
                  <th>
                    <a href="#!">JMT3</a>
                  </th>
                  <td>2022-11-03</td>
                  <td>별점</td>
                  <td>views</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReview;
