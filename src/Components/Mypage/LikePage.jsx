import React, { useEffect } from "react";
import TopbarV2 from "../Main/TopbarV2";
import "../../Style/Mypage/LikePage.scss";
import { BACKEND_URL } from "../../utils";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import { useState } from "react";
import LikePageList from "./LikePageList";

const LikePage = () => {
  const [user, setUser] = useRecoilState(userState);
  const [userid, setUserid] = useState(user && user.id);
  const [likePosts, setLikePosts] = useState([]);

  useEffect(() => {
    const getData = async (e) => {
      const data = await axios({
        url: `${BACKEND_URL}/heart/user?userId=${userid}`,
        method: "GET",
      });
      setLikePosts(data.data);
    };
    getData();
  }, []);

  return (
    <>
      <TopbarV2 />
      <div className="likebackground">
        <div className="liketemplate">
          <div className="like_wrap">
            <p>✨ 내가 찜한 가게 ✨</p>
            <div className="like_post_map">
              {likePosts.map((likePost, index) => (
                <LikePageList key={index} likePost={likePost} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LikePage;
