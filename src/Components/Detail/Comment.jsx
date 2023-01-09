import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../utils";
import "../../Style/Detail/Comment.scss";

const Comment = ({ reviewlist, nickname, reviewRef }) => {
  const onSubmoit = (e) => {
    e.preventDefault(); //동작때마다 새로고침 중지
    if (window.confirm("삭제하시겠습니까?") == true) {
      deletecontent();
      console.log("삭제가 완료되었습니다.");
    } else {
      // false는 취소버튼을 눌렀을 때, 취소됨
      console.log("취소되었습니다");
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
      console.log(rating, content, reviewlist.id);
      if (window.confirm("수정하시겠습니까?") == true) {
        get();
        console.log("수정 완료되었습니다.");
      } else {
        // false는 취소버튼을 눌렀을 때, 취소됨
        console.log("취소되었습니다");
      }
    } else if (Click == false) {
      setClick((Click) => !Click);
    }
    console.log(Click);
  };
  //-----------------------------------------------
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setcontent] = useState("");
  // --------------------------------------------
  //수정버튼 눌럿을때 글상자에 원본 내용 나오게
  function setting() {
    setcontent(reviewlist.content);
  }

  useEffect(() => {
    setting();
    setRating(reviewlist.star);
  }, []);

  return (
    <div ref={reviewRef} className="userdiv">
      <div className="starcreatedate">
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
        {nickname == reviewlist.nickname && (
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
          <div className="usercon">
            <img className="userimg" src="/images/6.jpg" alt="" />
            <div>{reviewlist.nickname}</div>
          </div>
          <div className="contant">
            <div> {reviewlist.content}</div>
          </div>
        </div>
      )}
      {Click == true && (
        <div className="사용자">
          <div className="usercon">
            <img className="userimg" src="/images/6.jpg" alt="" />
            <div>{reviewlist.nickname}
            <div class="nameContextMenu" style="position: absolute; top: 144px; left: 275px; display: block;"><table class="mbLayer"><tbody><tr><td id="sideViewRow_info"><a href="https://tv11.avsee.in/bbs/profile.php?mb_id=avavsee6974" rel="nofollow" onclick="win_profile(this.href); return false;">자기소개</a></td></tr><tr><td id="sideViewRow_memo"><a href="https://tv11.avsee.in/bbs/memo_form.php?me_recv_mb_id=avavsee6974" rel="nofollow" onclick="win_memo(this.href); return false;">쪽지보내기</a></td></tr><tr><td id="sideViewRow_mb_id"><a href="https://tv11.avsee.in/bbs/board.php?bo_table=community&amp;sca=&amp;sfl=mb_id,1&amp;stx=avavsee6974" rel="nofollow">게시물검색</a></td></tr><tr><td id="sideViewRow_mb_cid"><a href="https://tv11.avsee.in/bbs/board.php?bo_table=community&amp;sca=&amp;sfl=mb_id,0&amp;stx=avavsee6974" rel="nofollow">코멘트검색</a></td></tr><tr><td id="sideViewRow_new"><a href="https://tv11.avsee.in/bbs/new.php?mb_id=avavsee6974" rel="nofollow" class="link_new_page" onclick="check_goto_new(this.href, event);">전체게시물</a></td></tr></tbody></table></div>
<div ></div></div>
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
