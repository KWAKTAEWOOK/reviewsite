import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { BACKEND_URL } from "../../utils";
import "../../Style/Detail/Comment.scss";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";

const Comment = ({ reviewlist, reviewRef }) => {
  const [user, setUser] = useRecoilState(userState);
  const [nicknameon, setNicknameon] = useState(false);

  const onSubmoit = (e) => {
    e.preventDefault();
    if (window.confirm("삭제하시겠습니까?") == true) {
      deletecontent();
      alert("삭제가 완료되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };

  const deletecontent = async (e) => {
    try {
      const data = await axios({
        url: `${BACKEND_URL}/delete/${reviewlist.id}`,
        method: "DELETE",
        params: {
          id: reviewlist.id,
        },
      });

      window.location.reload();
    } catch (e) {
      alert("값 입력 실패");
    }
  };

  const get = async (e) => {
    try {
      const data = await axios({
        url: `${BACKEND_URL}/update/content`,
        method: "PATCH",
        data: {
          id: reviewlist.id,
          content: content,
          star: rating,
        },
      });
      window.location.reload();
    } catch (e) {
      alert("값 입력 실패");
    }
  };

  const [Click, setClick] = useState(false);

  const toggleClick = () => {
    if (Click == true) {
      setClick((Click) => !Click); // on,off 개념 boolean
      if (window.confirm("수정하시겠습니까?") == true) {
        get();
        alert("수정 완료되었습니다.");
      } else {
        // false는 취소버튼을 눌렀을 때, 취소됨
        alert("취소되었습니다");
      }
    } else if (Click == false) {
      setClick((Click) => !Click);
    }
  };

  //-----------------------------------------------
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setcontent] = useState("");

  // --------------------------------------------
  //수정버튼 눌렀을때 글상자에 원본 내용 나오게
  function setting() {
    setcontent(reviewlist.content);
  }
  const outNickneme = useRef();
  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (
        nicknameon &&
        outNickneme.current &&
        !outNickneme.current.contains(e.target)
      ) {
        setNicknameon(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [nicknameon]);
  useEffect(() => {
    setting();
    setRating(reviewlist.star);
  }, []);

  return (
    <div ref={reviewlist && reviewRef} className="userdiv">
      <div className="starcreatedate" ref={outNickneme}>
        {/* 별점 ---------------------------------- */}
        {Click == false && (
          <div className="star-rating">
            평점 :　
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= reviewlist.star ? "on" : "off"}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>
        )}
        {Click == true && (
          <div className="star-rating">
            평점 :　
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hover || rating) ? "on" : "off"}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>
        )}
        {/* 별점끝------------------------------------ */}
        {/* 날짜 -------------------------------------- */}
        <div className="createDate">
          {reviewlist.createDate.substring(0, 10)}
          &nbsp;
          {reviewlist.createDate.substring(11, 16)}
        </div>
        {user?.id == reviewlist.user?.id && (
          <>
            <button className="textbut">
              <span onClick={toggleClick}>수정</span>
            </button>
            <button className="textbut" onClick={onSubmoit}>
              <span>삭제</span>
            </button>
          </>
        )}
        {/* 리뷰 content--------------------------------- */}
      </div>
      {Click == false && (
        <div className="사용자">
          {nicknameon === true ? (
            <div className={`nameContextMenu`}>
              <table class="mbLayer">
                <tbody>
                  <tr>
                    <td className="sideViewRow_mb_cid">
                      <a href="" rel="nofollow">
                        📚북마크
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td className="sideViewRow_mb_cid">
                      <a href="" rel="nofollow">
                        🧡찜목록
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="sideViewRow_new">
                      <a
                        href=""
                        rel="nofollow"
                        class="link_new_page"
                        onclick=""
                      >
                        😶‍🌫️리뷰보기
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}
          <div className="usercon">
            <div className="userimg">
              <img className="usersimg" src={reviewlist.user?.imgUrl} alt="" />
            </div>
            <div>
              <span
                className="review_nick2"
                onClick={() => {
                  setNicknameon(true);
                }}
              >
                {reviewlist.user?.nickname}
              </span>
            </div>
          </div>
          <div className="contant">
            <div>{reviewlist.content}</div>
          </div>
        </div>
      )}
      {Click == true && (
        <div className="사용자">
          <div className="usercon">
            <div className="userimg">
              <img className="usersimg" src="/images/user.png" alt="" />
            </div>
            <div>{reviewlist.nickname}</div>
          </div>

          <textarea
            className="editcontent"
            cols="100"
            rows="9"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
          >
            {reviewlist.content}
          </textarea>
        </div>
      )}
    </div>
  );
};

export default Comment;
