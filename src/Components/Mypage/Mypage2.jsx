import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import "../../Style/Mypage/Mypage2.scss";

const Mypage2 = () => {
  //   const [user, setUser] = useRecoilState(userState);
  //   const [nickname, setNickname] = userState(user.nickname);
  //   const [username, setUsername] = useState(user.username);
  //   const [userid, setUserid] = useState(user.id);
  //   const [password, setPassword] = useState(user.password);
  //   const [email, setEmail] = useState(user.email);

  const [user, setUser] = useRecoilState(userState);
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // setNickname(user.nickname)

  return (
    <>
      <div>ㅇㄹㄴㅇㄹㄴㅇㄹ</div>
      <div
        className="abc"
        style={{ border: "1px solid black", width: "100px", height: "100px" }}
      >
        <input type="text" value={`${nickname}`}></input>
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

export default Mypage2;
