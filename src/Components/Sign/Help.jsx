import React from "react";
import TopbarV2 from "../Main/TopbarV2";
import "../../Style/Sign/Help.scss";
import faceId from "../../Style/image/face-id.png";
import password from "../../Style/image/password.png";

const Help = () => {
  return (
    <>
      <TopbarV2 />
      <div className="helpBackGround">
        <div className="helpTemplate">
          <div
            className="findId"
            onClick={() => {
              window.location.href = "/help/findId";
            }}
          >
            <div>
              <img className="idImg" src={faceId} />
              <p>아이디 찾기</p>
            </div>
          </div>
          <div
            className="findId"
            onClick={() => {
              window.location.href = "/help/findPw";
            }}
          >
            <div>
              <img className="idImg lockImg" src={password} />
              <p>비밀번호 변경하기</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
