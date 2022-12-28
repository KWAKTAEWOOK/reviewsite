import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import "../../Style/Detail/StarRating.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const StarRating = () => {
  const { id } = useParams();
  const { place_name } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [user, setUser] = useRecoilState(userState);
  const [content, setContent] = useState("");

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
  formData.append("content", content);
  formData.append("detail_id", detail_id);
  formData.append("detail_name", detail_name);
  formData.append("star", star);
  formData.append("nickname", nickname);

  const post = async (e) => {
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
        <input
          className="fileupload"
          type="file"
          multiple
          onChange={(e) => {
            console.log(e.target.files);
            for (let i = 0; i < e.target.files.length; i++) {
              formData.append("files", e.target.files[i]);
            }
          }}
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
          <img className="userimg" src="/images/3.jpg" />
          <div>{user && user.nickname}</div>
        </div>
        <textarea
          className="comment_textarea"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          cols="100"
          rows="10"
        ></textarea>
      </div>
    </div>
  );
};

export default StarRating;
