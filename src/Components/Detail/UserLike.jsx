import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import { BACKEND_URL } from "../../utils";

const UserLike = () => {
  const { id } = useParams();
  const [user, setUser] = useRecoilState(userState);
  const [postid, setPostId] = useState(id);
  const [userid, setUserid] = useState(user && user.userid);
  const [like, setLike] = useState(false);
  const [heart, setheart] = useState(false);
  const [userLike, setUserLike] = useState("");

  const likeImg = "/images/like1.png";
  const EmptylinkeImg = "/images/like2.png";
  const HeartImg = "/images/heart.png";
  const EmptyHeartImg = "/images/heart1.png";

  // 좋아요 상태 표시
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `${BACKEND_URL}/heart/${user.userid}/${id}`,
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
      alert("로그인을 해주세요");
    } else {
      try {
        e.preventDefault();
        const data = await axios({
          url: `${BACKEND_URL}/heart`,
          method: "POST",
          data: {
            userid,
            postid,
          },
        });
        setUserid(user.userid);
        setPostId(id);
        setLike(!like);
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const clickHeart = () => {
    setheart((heart) => !heart);
    console.log("하트눌림");
  };

  return (
    <>
      <div className="icon">
        <div>
          <button onClick={likeClick} className="iconbut">
            <img
              className={userLike ? "likeImg" : "EmptylinkeImg"}
              src={userLike ? EmptylinkeImg : likeImg}
            />
          </button>

          <button onClick={clickHeart} className="iconbut">
            <img
              className={heart ? "HeartImg" : "EmptyHeartImg"}
              src={heart ? EmptyHeartImg : HeartImg}
            />
          </button>
        </div>
        <div className="liketext">
          <div>좋아요</div>
          <div>찜콩!!</div>
        </div>
      </div>
    </>
  );
};

export default UserLike;
