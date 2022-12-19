import React, { useState } from "react";
import TopbarV2 from "../Main/TopbarV2";
import "../../Style/Sign/FindPw.scss";
import password from "../../Style/image/password.png";
import axios from "axios";
import { BACKEND_URL } from "../../utils";

const FindPw = () => {
  const [id, setId] = useState("");
  const [userid, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userPw, setUserPw] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const findUserPw = async (e) => {
    e.preventDefault();
    try {
      const data = await axios({
        url: `${BACKEND_URL}/user/updatePw`,
        method: "GET",
        params: {
          username,
          userid,
          email,
        },
      });
      setUsername("");
      setUserId("");
      setEmail("");
      setId(data.data.id);
      setUserPw(data.data.password1);
    } catch (e) {
      alert("등록된 정보가 없습니다.");
    }
  };

  const updateUserPw = async (e) => {
    e.preventDefault();
    try {
      const data = await axios({
        url: `${BACKEND_URL}/user/updatePw/${id}`,
        method: "PATCH",
        data: {
          password1,
          password2,
        },
      });
      setUserPw(data.data);
      alert("비밀번호가 변경되었습니다.");
      window.location.href = "/main";
    } catch (e) {
      if (password1 != password2) {
        alert("작성된 비밀번호가 다릅니다.");
      } else {
        alert("비밀번호 변경 실패! 다시 시도해주세요");
      }
    }
  };

  return (
    <>
      <TopbarV2 />
      {userPw ? (
        <div className="helpBackGround">
          <div className="findIdTemplate">
            <div className="findSubject">비밀번호 변경하기</div>
            <hr className="findHr" />
            <div className="findBody">
              <img
                className="idImg findidImg findPwImg"
                src={password}
                alt=""
              />
              <form onSubmit={updateUserPw}>
                <div className="findInput findPwInput">
                  <div>
                    패스워드 변경
                    <input
                      type="password"
                      value={password1}
                      onChange={(e) => {
                        setPassword1(e.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    패스워드 확인
                    <input
                      type="password"
                      value={password2}
                      onChange={(e) => {
                        setPassword2(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <button className="findBtn findBtn2">비밀번호 변경하기</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="helpBackGround">
          <div className="findIdTemplate">
            <div className="findSubject">비밀번호 변경하기</div>
            <hr className="findHr" />
            <div className="findBody">
              <img
                className="idImg findidImg findPwImg"
                src={password}
                alt=""
              />
              <form onSubmit={findUserPw}>
                <div className="findInput findInput_2">
                  <div>
                    이름
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    ID
                    <input
                      type="text"
                      value={userid}
                      onChange={(e) => {
                        setUserId(e.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    이메일
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <button className="findBtn findBtn2">비밀번호 변경하기</button>
              </form>
            </div>
            <div
              className="changePwBtn"
              onClick={() => {
                window.location.href = "/help/findId";
              }}
            >
              아이디 찾으러가기
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FindPw;
