import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import "../../Style/Mypage/Mypage2.scss";

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

  // useEffect(() => {
  //   setting();
  //   console.log("useEffect  출력");
  //   console.log(`${nickname}`);
  // }, []);

  // function changeNickname(e) {
  //   setNickname(e.target.value);
  // }

  return (
    <>
      <div
        className="abc"
        style={{ border: "1px solid black", width: "100px", height: "100px" }}
      >
        {/* <input type="text" onChange={changeNickname} value={nickname}></input> */}
        <button
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
              setPassword("");
            }
          }}
        >
          수정
        </button>
      </div>
    </>
  );
};

export default Mypage3;
