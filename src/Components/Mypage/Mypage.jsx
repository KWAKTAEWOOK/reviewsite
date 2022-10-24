import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import "../../Style/Mypage/Mypage.scss";
import TopbarV2 from "../Main/TopbarV2";

const Mypage3 = () => {
  const [user, setUser] = useRecoilState(userState);
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function setting() {
    setNickname(user.nickname);
    setUsername(user.username);
    setUserid(user.userid);
    setPassword(user.password);
    setEmail(user.email);
    // console.log(user.nickname);
    // console.log("출력");
  }

  useEffect(() => {
    setting();
    console.log("useEffect  출력");
    console.log(`${nickname}`);
  }, []);

  function changeNickname(e) {
    setNickname(e.target.value);
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
                <input type="text" value={email} />
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
                        userid,
                        username,
                        nickname,
                        password,
                        email,
                      },
                    });
                    setUser(data.data);
                    alert("수정 성공!");
                    window.location.href = "/main";
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
