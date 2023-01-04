import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { userState } from "../../recoil/user";
import TopbarV2 from "../Main/TopbarV2";
import "../../Style/Mypage/MypageUserConfirm.scss";

const MypageUserConfirm = () => {
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

  const confimUser = async (e) => {
    e.preventDefault();
    try {
      const data = await axios({
        url: `${BACKEND_URL}/user/UserConfirmPwd`,
        method: "POST",
        data: {
          userid,
          password,
          nickname,
          email,
          username,
        },
      });
      setUser(data.data);
      alert("본인 확인이 완료되었습니다.");
      setPassword("");
      window.location.href = "/MypageTest";
    } catch (e) {
      alert("비밀번호를 확인하세요.");
      setPassword("");
    }
  };

  return (
    <div>
      <TopbarV2 />
      <form onSubmit={confimUser}>
        <h2 className="MypageUserConfirmTest_Title">회원정보수정</h2>
        <div className="MypageUserConfirmTest_Container">
          <div className="MypageUserConfirmTest_Box">
            <h3>회원확인</h3>
            <h5>
              {user && `${user.nickname}`} 님의 정보를 안전하게 보호하기 위해
              계정을 다시 한번 확인합니다.
            </h5>
            <div className="MypageUserConfirmTest_password_subject">
              비밀번호
            </div>
            <input
              className="MypageUserConfirmTest_password_content"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="MypageUserConfirmTest_CheckBox">
              <a
                className="MypageUserConfirmTest_Cansel_button MyPageUserConfirmTest_button_common_properties"
                href="/main"
              >
                취소
              </a>
              <button
                className="MypageUserConfirmTest_Confirm_button MyPageUserConfirmTest_button_common_properties"
                type="submit"
              >
                확인
              </button>
              <a
                className="MypageUserConfirmTest_FindByPassword"
                href="help/findPw"
              >
                비밀번호찾기
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MypageUserConfirm;
