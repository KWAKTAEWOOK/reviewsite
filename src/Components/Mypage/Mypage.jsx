import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../../utils";
import Topbar from "../Main/Topbar";
import "../../Style/Sign/SignUp.scss";

const Mypage = () => {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password1, setPassword1] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <Topbar />
      <div className="signUpBody">
        <div className="signUpBack">
          <div className="signUptemplate">
            <div className="signUpLogo">
              내 프로필 변경
              <hr />
            </div>
            <div className="signUpForm">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const data = await axios({
                      url: `${BACKEND_URL}/user/join`,
                      method: "POST",
                      data: {
                        nickname,
                        password1,
                        email,
                      },
                    });
                    setUsername("");
                    setNickname("");
                    setPassword1("");
                    setEmail("");
                    // alert("회원가입 성공!");
                  } catch (e) {
                    // e.text().then((msg) => alert(msg));
                    console.log(e);
                    // alert("회원가입 실패! 데이터를 확인하세요");
                  }
                }}
              >
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
                    value={password1}
                    onChange={(e) => {
                      setPassword1(e.target.value);
                    }}
                  />
                </div>
                <div>
                  E-mail
                  <br />
                  <input
                    type="text"
                    placeholder="E-mail을 입력해주세요"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <button type="submit" className="signUpButton">
                  변경하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
