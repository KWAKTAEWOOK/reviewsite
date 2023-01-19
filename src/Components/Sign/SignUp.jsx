import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../../utils";
import "../../Style/Sign/SignUp.scss";
import closeModalBtn from "../../Style/image/close.png";

const SignUp = ({ openModal, closeModal2 }) => {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [userid, setUserid] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  async function checkNickname() {
    const res = await axios
      .get(`${BACKEND_URL}/user/${nickname}/nickname`)
      .catch((err) => {
        console.log(err);
      });

    if (res.data === true) {
      alert("중복된 별명입니다.");
    } else {
      alert("사용가능한 별명입니다.");
    }
  }

  async function checkId() {
    const res = await axios
      .get(`${BACKEND_URL}/user/${userid}/userid`)
      .catch((err) => {
        console.log(err);
      });

    if (res.data === true) {
      alert("중복된 ID입니다.");
    } else {
      alert("사용가능한 ID입니다.");
    }
  }

  async function checkEmail() {
    const res = await axios
      .get(`${BACKEND_URL}/user/${email}/email`)
      .catch((err) => {
        console.log(err);
      });

    if (res.data === true) {
      alert("중복된 이메일입니다.");
    } else {
      alert("사용가능한 이메일입니다.");
    }
  }

  // 이메일 유효성검사
  const chkEmail = function (str) {
    var regExp = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return regExp.test(str) ? true : false;
  };
  //

  return (
    <>
      <div className="signUpbody">
        <div className="signUptemplate">
          <div className="signUpLogo">
            <p className="signUpP">회원가입</p>
            <img
              src={closeModalBtn}
              className="closeModal closeModal2"
              onClick={closeModal2}
            />
          </div>
          <div className="signUpForm">
            <form
              onSubmit={async (e) => {
                if (window.confirm("가입하시겠습니까?🎃")) {
                  if (
                    username === "" ||
                    nickname === "" ||
                    userid === "" ||
                    password1 === "" ||
                    password2 === "" ||
                    email === ""
                  ) {
                    alert("회원가입 정보를 모두 입력해주세요.");
                    e.preventDefault();
                  } else if (nickname.length > 15 || userid.length > 15) {
                    alert("글자수를 초과한 데이터가 있습니다. 확인해주세요.");
                    e.preventDefault();
                  } else if (password1 !== password2) {
                    alert("password를 확인해주세요.");
                    e.preventDefault();
                    setPassword1("");
                    setPassword2("");
                  } else if (chkEmail(email) === false) {
                    alert("이메일 형식이 유효하지않습니다.");
                    e.preventDefault();
                  } else {
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
                      alert("회원가입이 완료되었습니다.😃😃");
                      window.location.href = "/main";
                      e.preventDefault();
                    } catch (e) {
                      alert("회원가입 실패! 데이터를 확인하세요");
                    }
                  }
                } else {
                  e.preventDefault();
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
                    if (e.target.value.length > 15) {
                      document.getElementById("alert").innerHTML =
                        "15자 이내로 입력해주세요.";
                    } else {
                      document.getElementById("alert").innerHTML = "";
                    }
                  }}
                />
                <button
                  type="button"
                  className="confirm"
                  onClick={checkNickname}
                >
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
                    if (e.target.value.length > 15) {
                      document.getElementById("alert2").innerHTML =
                        "15자 이내로 입력해주세요.";
                    } else {
                      document.getElementById("alert2").innerHTML = "";
                    }
                  }}
                />
                <button type="button" className="confirm" onClick={checkId}>
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
                    if (e.target.value.length === 0) {
                      document.getElementById("pwalert").innerHTML = "";
                    }
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
                    if (e.target.value === password1) {
                      document.getElementById("pwalert").innerHTML =
                        "<font color='green'>패스워드 일치";
                    } else {
                      document.getElementById("pwalert").innerHTML =
                        "올바른 패스워드를 입력하세요";
                    }
                    if (e.target.value.length === 0) {
                      document.getElementById("pwalert").innerHTML = "";
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
                <button type="button" className="confirm" onClick={checkEmail}>
                  중복확인
                </button>
              </div>
              <button
                className="signUpButton loginButton"
                onClick={() => {
                  closeModal2();
                  openModal();
                }}
              >
                로그인하기
              </button>
              <button type="submit" className="signUpButton signUpButton2">
                가입하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
