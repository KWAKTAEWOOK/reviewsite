import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import "../Detail/StarRating.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const StarRating = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [user, setUser] = useRecoilState(userState);
  const [content, setContent] = useState("");

  //-----------------------------------------------
  const [nickname, setNickname] = useState("");

  function setting() {
    setNickname(user.nickname);
  }
  useEffect(() => {
    setting();
  }, []);

  const star = rating;
  const detail_id = id;
  const post = async (e) => {
    try {
      const data = await axios({
        url: `${BACKEND_URL}/answer/create/post`,
        method: "POST",

        data: {
          content,
          detail_id,
          star,
          nickname,
        },
      });

      window.location.reload();
    } catch (e) {
      alert("값 입력 실패");
    }
  };
  const onChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
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
        <button
          className="plugin"
          onClick={() => {
            post();
          }}
        >
          <img src="/images/입력.png" />
        </button>
      </div>
      <div className="사용자">
        <div className="usercon">
          <img className="userimg" src="/images/3.jpg" />
          <div>{user && user.nickname}</div>
        </div>
        <textarea onChange={onChange} id="" cols="100" rows="10"></textarea>
      </div>
    </div>
  );
};

export default StarRating;
