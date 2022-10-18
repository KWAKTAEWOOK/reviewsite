import React, { useState } from "react";
import Topbar from "../Main/Topbar";
import "../../Style/Sign/Login.scss";
import axios from "axios";
import { BACKEND_URL } from "../../utils";

const Login = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Topbar />
      <div className="signUpBody">
        <div className="signUpBack">
          <div className="loginTemplate">
            <div className="signUpLogo">
              Login
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
                    console.log(data);
                    alert("로그인 성공!");
                  } catch (e) {
                    // e.text().then((msg) => alert(msg));
                    console.log(e);
                    alert("로그인 실패!");
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
