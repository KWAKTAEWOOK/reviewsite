import React from "react";
import "../../Style/Sign/FindId.scss";
import TopbarV2 from "../Main/TopbarV2";
import faceId from "../../Style/image/face-id.png";

const FindId = () => {
  return (
    <>
      <TopbarV2 />
      <div className="helpBackGround">
        <div className="findIdTemplate">
          <div className="findSubject">아이디 찾기</div>
          <hr className="findHr" />
          <div className="findBody">
            <p className="findP">· 이메일로 인증하기</p>
            <img className="idImg findidImg" src={faceId} alt="" />
            <div className="findInput">
              <form action="">
                <div>
                  이름
                  <input type="text" />
                </div>
                <br />
                <div>
                  이메일
                  <input type="text" />
                </div>
              </form>
            </div>
            <button className="findBtn">ID찾기</button>
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
