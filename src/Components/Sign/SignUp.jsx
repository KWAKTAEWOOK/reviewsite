import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../../utils";
import Topbar from "../Main/Topbar";
import "../../Style/Sign/SignUp.scss";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [userid, setUserid] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <Topbar />
      <div className="signUpBody">
        <div className="signUpBack">
          <div className="signUptemplate">
            <div className="signUpLogo">
              Sign-Up
              <hr />
            </div>
            <div className="signUpForm">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const data = await axios({
                      url: "http://localhost:8085/api/v1/user/join",
                      method: "POST",
                      data: {
                        username,
                        nickname,
                        userid,
                        password1,
                        password2,
                        email,
                      },
                    });
                    console.log(data);
                  } catch (e) {
                    console.log({
                      username,
                      nickname,
                      userid,
                      password1,
                      password2,
                      email,
                    });
                  }
                }}
              >
                <div>
                  이름
                  <br />
                  <input
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div>
                  별명
                  <br />
                  <input
                    type="text"
                    placeholder="사용할 별명을 입력해주세요"
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                  />
                </div>
                <div>
                  ID
                  <br />
                  <input
                    type="text"
                    value={userid}
                    onChange={(e) => {
                      setUserid(e.target.value);
                    }}
                  />
                </div>
                <div>
                  password
                  <br />
                  <input
                    type="password"
                    value={password1}
                    onChange={(e) => {
                      setPassword1(e.target.value);
                    }}
                  />
                </div>
                <div>
                  Confirm password
                  <br />
                  <input
                    type="password"
                    value={password2}
                    onChange={(e) => {
                      setPassword2(e.target.value);
                    }}
                  />
                </div>
                <div>
                  E-mail
                  <br />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
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
      </div>
    </>
  );
};

export default SignUp;
