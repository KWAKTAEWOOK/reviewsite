import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import { BACKEND_URL } from "../../utils";
import "../../Style/Detail/UserLike.scss";

const UserLike = () => {
  const { id } = useParams();
  const { place_name } = useParams();
  const [user, setUser] = useRecoilState(userState);
  const [postid, setPostId] = useState(id);
  const [postName, setPostName] = useState(place_name);
  const [userid, setUserid] = useState(user && user.id);
  const [like, setLike] = useState(false);
  const [userLike, setUserLike] = useState("");

  const HeartImg = "/images/heart.png";
  const EmptyHeartImg = "/images/heart1.png";

  // 좋아요 상태 표시
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `${BACKEND_URL}/heart/${id}?userId=${userid}`,
          method: "GET",
        });
        setUserLike(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  // 클릭시 좋아요 생성 / 취소
  const likeClick = async (e) => {
    if (!user) {
      alert("로그인 후 이용해주세요 😊");
    } else {
      try {
        e.preventDefault();
        const data = await axios({
          url: `${BACKEND_URL}/heart?userId=${user.id}`,
          method: "POST",
          data: {
            postid,
            postName,
          },
        });
        setPostId(id);
        setLike(!like);
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <div className="like_icon">
        <div>
          <button onClick={likeClick} className="iconbut">
            <img
              className={userLike ? "HeartImg" : "EmptyHeartImg"}
              src={userLike ? EmptyHeartImg : HeartImg}
            />
          </button>
        </div>
        <div className="liketext">
          <div>찜하기</div>
        </div>
      </div>
    </>
  );
};

export default UserLike;
