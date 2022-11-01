import React, { useState } from "react";
import "../../Style/Sign/FindId.scss";
import TopbarV2 from "../Main/TopbarV2";
import faceId from "../../Style/image/face-id.png";
import axios from "axios";
import { BACKEND_URL } from "../../utils";

const FindId = () => {
  const [userid, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const findUserID = async (e) => {
    e.preventDefault();
    try {
      const data = await axios({
        url: `${BACKEND_URL}/user/findId`,
        method: "GET",
      });
      setUserId(data.data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <TopbarV2 />
      <div className="helpBackGround">
        <div className="findIdTemplate">
          <div className="findSubject">아이디 찾기</div>
          <hr className="findHr" />
          <div className="findBody">
            <p className="findP">· 등록된 이메일로 찾기</p>
            <img className="idImg findidImg" src={faceId} alt="" />
            <form onSubmit={findUserID}>
              <div className="findInput">
                <div>
                  이름
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <br />
                <div>
                  이메일
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <button className="findBtn">ID찾기</button>
            </form>
          </div>
          <div
            className="changePwBtn "
            onClick={() => {
              window.location.href = "/help/findPw";
            }}
          >
            패스워드 변경하러가기
          </div>
        </div>
      </div>
    </>
  );
};

export default FindId;
