import React, { useState } from "react";
import "../../Style/Sign/Login.scss";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import closeModalBtn from "../../Style/image/close.png";

const Login = ({ closeModal, openModal2 }) => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userState);

  const loginUser = async (e) => {
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
      alert("로그인 성공!😊");
      // console.log(data.data.userRole);
      window.location.href = "/main";
    } catch (e) {
      console.log(e);
      alert("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
      setPassword("");
    }
  };

  return (
    <>
      <div className="login_body">
        <div className="loginTemplate">
          <div className="signUpLogo">
            <p>로그인</p>
            <img
              src={closeModalBtn}
              className="closeModal"
              onClick={closeModal}
            />
          </div>

          <div className="signUpForm">
            <form onSubmit={loginUser}>
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
            <div
              className="loginButton loginButton2"
              onClick={() => {
                closeModal();
                openModal2();
              }}
            >
              회원가입하기
            </div>
            <div
              className="loginButton idSearchBtn"
              onClick={() => {
                window.location.href = "/help";
              }}
            >
              ID / PW 찾기
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
