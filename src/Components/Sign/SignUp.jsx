import axios from "axios";
import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../../utils";
import "../../Style/Sign/SignUp.scss";
import TopbarV2 from "../Main/TopbarV2";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [userid, setUserid] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  async function checkNickname() {
    const res1 = await axios
      .get(`${BACKEND_URL}/user/${nickname}/nickname`)
      .catch((err) => {
        console.log(err);
      });

    if (res1.data == true) {
      document.getElementById("alert").innerHTML = "이미 존재하는 별명입니다.";
    } else {
      document.getElementById("alert").innerHTML =
        "<font color='green'>사용가능한 별명입니다.";
    }
  }

  async function checkId() {
    const res = await axios
      .get(`${BACKEND_URL}/user/${userid}/userid`)
      .catch((err) => {
        console.log(err);
      });

    if (res.data == true) {
      document.getElementById("alert2").innerHTML = "이미 존재하는 ID입니다.";
    } else {
      document.getElementById("alert2").innerHTML =
        "<font color='green'>사용가능한 ID입니다.";
    }
  }

  async function checkEmail() {
    const res = await axios
      .get(`${BACKEND_URL}/user/${email}/email`)
      .catch((err) => {
        console.log(err);
      });

    if (res.data == true) {
      document.getElementById("alert3").innerHTML =
        "이미 존재하는 이메일입니다.";
    } else {
      document.getElementById("alert3").innerHTML =
        "<font color='green'>사용가능한 이메일입니다.";
    }
  }

  return (
    <>
      <TopbarV2 />
      <div className="signUpBody">
        <div className="signUpBack">
          <div className="signUptemplate">
            <div className="signUpLogo">
              <p>Sign-Up</p>
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
                        username,
                        nickname,
                        userid,
                        password1,
                        password2,
                        email,
                      },
                    });
                  } catch (e) {
                    alert("회원가입 실패! 데이터를 확인하세요");
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
                  <button className="confirm" onClick={checkNickname}>
                    중복확인
                  </button>
                  <p id="alert" className="alert"></p>
                </div>
                <div>
                  ID
                  <br />
                  <input
                    type="text"
                    placeholder="사용할 ID를 입력해주세요"
                    value={userid}
                    onChange={(e) => {
                      setUserid(e.target.value);
                    }}
                  />
                  <button className="confirm" onClick={checkId}>
                    중복확인
                  </button>
                  <p id="alert2" className="alert"></p>
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
                      if (e.target.value == password1) {
                        document.getElementById("pwalert").innerHTML =
                          "<font color='green'>패스워드 일치";
                      } else {
                        document.getElementById("pwalert").innerHTML =
                          "올바른 패스워드를 입력하세요";
                      }
                    }}
                  />
                  <p id="pwalert" className="alert"></p>
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
                  <button className="confirm" onClick={checkEmail}>
                    중복확인
                  </button>
                  <p id="alert3" className="alert"></p>
                </div>
                <button
                  type="submit"
                  className="signUpButton"
                  onClick={() => {
                    if (window.confirm("가입하시겠습니까?")) {
                      alert("회원가입 성공!");
                      setUsername("");
                      setNickname("");
                      setUserid("");
                      setPassword1("");
                      setPassword2("");
                      setEmail("");
                      window.location.href = "/main";
                    }
                  }}
                >
                  가입하기
                </button>
              </form>
              <div className="loginButton">
                <a href="/login">로그인하기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
