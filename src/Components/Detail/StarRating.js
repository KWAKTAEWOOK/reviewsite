import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import "../../Style/Detail/StarRating.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const StarRating = ({ getdata, reviewRef }) => {
  const { id } = useParams();
  const { place_name } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [user, setUser] = useRecoilState(userState);
  const [content, setContent] = useState("");
  const [flies, setFlies] = useState([]);

  //-----------------------------------------------
  const [nickname, setNickname] = useState("");
  const [Click, setClick] = useState(false);

  function setting() {
    setNickname(user.nickname);
  }
  useEffect(() => {
    setting();
  }, []);

  const star = rating;
  const detail_id = id;
  const detail_name = place_name;

  const formData = new FormData();

  const post = async (e) => {
    formData.append("content", content);
    formData.append("detail_id", detail_id);
    formData.append("detail_name", detail_name);
    formData.append("star", star);
    formData.append("nickname", nickname);
    for (let i = 0; i < flies.length; i++) {
      formData.append("files", flies[i]);
    }

    if (window.confirm("등록하시겠습니까?"))
      try {
        const data = await axios({
          url: `${BACKEND_URL}/answer/create/post?userId=${user.id}`,
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        window.location.reload();
      } catch (e) {
        console.log(e);
        alert("값 입력 실패");
      }
  };
  const message = () => {
    if (content == "") {
      alert("내용을 입력해주세요");
    } else if (star == 0) {
      alert("평점을 입력해주세요");
    } else {
      post();
    }
  };

  const onSubmit = (e) => {
    setFlies(e.target.files);
  };

  const onContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="star_rate_wrap">
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
        <input
          className="fileupload"
          type="file"
          multiple
          onChange={onSubmit}
        />
        <button
          className="plugin"
          onClick={() => {
            message();
          }}
        >
          <img src="/images/입력.png" />
        </button>
      </div>
      <div className="사용자">
        <div className="usercon">
          <div className="userimg">
            <img ref={reviewRef} className="usersimg" src={user?.userImgUrl} />
          </div>
          <div className="review_nick">{user?.nickname}</div>
        </div>
        <textarea
          className="comment_textarea"
          onChange={onContent}
          cols="100"
          rows="10"
        ></textarea>
      </div>
      <div className="imgsee" />
    </div>
  );
};

export default StarRating;
