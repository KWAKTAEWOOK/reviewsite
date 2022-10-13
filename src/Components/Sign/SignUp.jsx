import React from "react";
import Topbar from "../Main/Topbar";
import "../../Style/Sign/SignUp.scss";

const SignUp = () => {
  return (
    <>
      <Topbar />
      <body className="signUpBody">
        <div className="signUpBack">
          <div className="signUptemplate">
            <div className="signUpLogo">
              Sign-Up
              <hr />
            </div>
            <div className="signUpForm">
              <form>
                <div>
                  이름
                  <br />
                  <input type="text" placeholder="이름을 입력해주세요" />
                </div>
                <div>
                  별명
                  <br />
                  <input type="text" placeholder="사용할 별명을 입력해주세요" />
                </div>
                <div>
                  ID
                  <br />
                  <input type="text" />
                </div>
                <div>
                  password
                  <br />
                  <input type="text" />
                </div>
                <div>
                  Confirm password
                  <br />
                  <input type="text" />
                </div>
                <div>
                  E-mail
                  <br />
                  <input type="text" />
                </div>
                <button type="submit" className="signUpButton">
                  가입하기
                </button>
              </form>
              <div className="loginButton">
                <a href="#">로그인하기</a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default SignUp;
