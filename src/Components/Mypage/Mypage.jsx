import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import "../../Style/Mypage/Mypage.scss";
import TopbarV2 from "../Main/TopbarV2";

const Mypage3 = () => {
  const [user, setUser] = useRecoilState(userState);
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function setting() {
    setId(user.id);
    setNickname(user.nickname);
    setUsername(user.username);
    setUserid(user.userid);
    setPassword(user.password);
    setEmail(user.email);
  }

  useEffect(() => {
    setting();
  }, []);

  function changeNickname(e) {
    setNickname(e.target.value);
  }

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <>
      <TopbarV2 />
      <div className="signUpBody">
        <div className="signUpBack">
          <div className="signUptemplate">
            <div className="signUpLogo">
              <p>프로필 수정</p>
            </div>
            <div className="signUpForm">
              <div>
                이름
                <br />
                <div className="gray_box">{`${username}`}</div>
              </div>
              <div>
                별명
                <br />
                <input
                  className="input_nickname"
                  type="text"
                  onChange={changeNickname}
                  value={nickname}
                ></input>
              </div>
              <div>
                ID
                <br />
                <div className="gray_box">{`${userid}`}</div>
              </div>
              <div>
                Password
                <br />
                <div className="gray_box"></div>
              </div>
              <div>
                Confirm password
                <br />
                <div className="gray_box"></div>
              </div>
              <div>
                E-mail
                <br />
                <input
                  className="input_email"
                  type="text"
                  value={email}
                  onChange={changeEmail}
                />
              </div>
              <button
                className="signUpButton"
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    const data = await axios({
                      url: `${BACKEND_URL}/user/modify`,
                      method: "POST",
                      data: {
                        id,
                        userid,
                        username,
                        nickname,
                        password,
                        email,
                      },
                    });
                    setUser(data.data);
                    alert("수정 성공!");
                    // window.location.href = "/main";
                  } catch (e) {
                    // e.text().then((msg) => alert(msg));
                    console.log(e);
                    alert("수정 실패");
                    // setPassword("");
                  }
                }}
              >
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage3;
