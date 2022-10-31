import React from "react";
import TopbarV2 from "../Main/TopbarV2";
import "../../Style/Sign/FindPw.scss";
import password from "../../Style/image/password.png";

const FindPw = () => {
  return (
    <>
      <TopbarV2 />
      <div className="helpBackGround">
        <div className="findIdTemplate">
          <div className="findSubject">비밀번호 변경하기</div>
          <hr className="findHr" />
          <div className="findBody">
            <img className="idImg findidImg findPwImg" src={password} alt="" />
            <div className="findInput findInput_2">
              <form action="">
                <div>
                  이름
                  <input type="text" />
                </div>
                <br />
                <div>
                  ID
                  <input type="text" />
                </div>
                <br />
                <div>
                  이메일
                  <input type="text" />
                </div>
              </form>
            </div>
            <button className="findBtn findBtn2">비밀번호 변경하기</button>
          </div>
          <div
            className="changePwBtn"
            onClick={() => {
              window.location.href = "/help/findId";
            }}
          >
            아이디 찾으러가기
          </div>
        </div>
      </div>
    </>
  );
};

export default FindPw;
