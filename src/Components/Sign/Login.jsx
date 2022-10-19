import React, { useState } from "react";
import Topbar from "../Main/Topbar";
import "../../Style/Sign/Login.scss";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userState);

  return (
    <>
      <Topbar />
      <div className="signUpBody">
        <div className="signUpBack">
          <div className="loginTemplate">
            <div className="signUpLogo">
              <p>Login</p>
              <hr />
            </div>
            <div className="signUpForm">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const data = await axios({
                      url: `${BACKEND_URL}/user/login`,
                      method: "POST",
                      data: {
                        userid,
                        password,
                      },
                    });
                    setUserid("");
                    setPassword("");
                    setUser(data.data);
                    alert("로그인 성공!");
                    window.location.href = "/main";
                  } catch (e) {
                    // e.text().then((msg) => alert(msg));
                    console.log(e);
                    alert("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
                    setPassword("");
                  }
                }}
              >
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
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <button type="submit" className="signUpButton">
                  로그인
                </button>
              </form>
              <div className="loginButton">
                <a href="/signUp">회원가입하기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
