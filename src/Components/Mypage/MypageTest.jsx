import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BACKEND_URL, LOCAL_URL } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import TopbarV2 from "../Main/TopbarV2";
import "../../Style/Mypage/MypageTest.scss";

const MypageTest = () => {
  const [user, setUser] = useRecoilState(userState);
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);

  async function checkNickname() {
    const res = await axios
      .get(`${BACKEND_URL}/user/${nickname}/nickname`)
      .catch((err) => {
        console.log(err);
      });

    if (res.data === true) {
      alert("사용중인 별명입니다.");
    } else {
      alert("사용가능한 별명입니다.");
    }
  }

  async function checkEmail() {
    const res = await axios
      .get(`${BACKEND_URL}/user/${email}/email`)
      .catch((err) => {
        console.log(err);
      });

    if (res.data === true) {
      alert("사용중인 이메일입니다.");
    } else {
      alert("사용가능한 이메일입니다.");
    }
  }

  function setting() {
    setId(user.id);
    setNickname(user.nickname);
    setUsername(user.username);
    setUserid(user.userid);
    setEmail(user.email);
  }

  useEffect(() => {
    setting();
  }, []);

  function changeNickname(e) {
    setNickname(e.target.value);
  }

  function changePassword(e) {
    setPassword1(e.target.value);
  }

  function changePassword2(e) {
    setPassword2(e.target.value);
  }

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  //--------------------------------------------------------------------------
  //이미지 업로드 로직
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const saveImgFile = (e) => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    setFiles(e.target.files[0]);
  };

  // 버튼클릭시 input태그에 클릭이벤트를 걸어준다.
  const onCickImageUpload = () => {
    imgRef.current.click();
  };

  const formData = new FormData();
  const editProfile = async (e) => {
    if (window.confirm("수정하시겠습니까?")) {
      if (password1 !== password2) {
        alert("비밀번호가 일치하지않습니다.");
        setPassword1("");
        setPassword2("");
        return;
      }
      if (!password1 || !password2) {
        alert("비밀번호를 입력해주세요");
        return;
      }
      if (files.size > 1048576) {
        alert("이미지 사이즈가 1MB이하여야 합니다.");
        return;
      }
      formData.append("id", id);
      formData.append("userid", userid);
      formData.append("username", username);
      formData.append("nickname", nickname);
      formData.append("password1", password1);
      formData.append("email", email);
      {
        !imgFile
          ? formData.append("userImgUrl", user.userImgUrl)
          : formData.append("files", files);
      }
      try {
        const data = await axios({
          url: `${BACKEND_URL}/user/editprofile`,
          method: "PATCH",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setUser(data.data);
        alert("수정되었습니다.");
        window.location.href = "/main";
      } catch (e) {
        console.log(e);
        alert("수정 실패");
        setPassword1("");
        setPassword2("");
      }
    }
  };

  const deleteUser = async (e) => {
    if (
      window.confirm(
        "지금 탈퇴하시면 저장되어있는 모든 정보가 사라집니다.\n탈퇴하시겠습니까?"
      )
    ) {
      e.preventDefault();
      try {
        const data = await axios({
          url: `${BACKEND_URL}/user/delete/${id}`,
          method: "DELETE",
          data: {
            id,
          },
        });
        alert("탈퇴되었습니다.");
        setUser(null);
        window.location.href = "/main";
      } catch (e) {
        console.log(e);
        alert("탈퇴 실패! 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="editProfilePage">
      <TopbarV2 />
      <h2 className="MypageEditTitle">회원정보수정</h2>
      <div className="MypageEditBoxContainer">
        <div className="MypageEditBox">
          <h3>기본정보 수정</h3>
          <div className="MypageEdit_userIdbox MypageEdit_Common_Style">
            <div className="MypageEdit_userIdbox_subject MyPageEdit_box_subject">
              ID
            </div>
            <div className="MypageEdit_userIdbox_ID MyPageEdit_box_content">{`${userid}`}</div>
          </div>
          <div className="MypageEdit_usernamebox MypageEdit_Common_Style">
            <div className="MypageEdit_usernamebox_subject MyPageEdit_box_subject">
              이름
            </div>
            <div className="MypageEdit_usernamebox_username MyPageEdit_box_content">{`${username}`}</div>
          </div>
          <div className="MypageEdit_profilepicturebox">
            <img src={imgFile ? imgFile : user?.userImgUrl} />
            <input
              type="file"
              style={{ display: "none" }}
              onChange={saveImgFile}
              ref={imgRef}
            />
            <button
              className="MypageEgit_profilepicture_button"
              label="이미지 업로드"
              onClick={onCickImageUpload}
            >
              <span> 이미지업로드</span>
            </button>
          </div>
          <div className="MypageEdit_nicknamebox">
            <div className="MypageEdit_nicknamebox_subject MyPageEdit_box_subject">
              별명
            </div>
            <div className="MypageEdit_nicknamebox_nickname MyPageEdit_box_content">
              <input
                className="MypageEdit_nicknamebox_nickname_input input_common_properties"
                type="text"
                onChange={changeNickname}
                value={nickname}
              ></input>
              <button
                type="button"
                className="MypageEdit_nickname_confirm MypageEdit_confirm_common_properties"
                onClick={checkNickname}
              >
                중복확인
              </button>
            </div>
          </div>
          <div className="MypageEdit_emailbox">
            <div className="MypageEdit_emailbox_subject MyPageEdit_box_subject">
              이메일
            </div>
            <div className="MypageEdit_emailbox_email MyPageEdit_box_content">
              <input
                className="MypageEdit_emailbox_email_input input_common_properties"
                type="text"
                onChange={changeEmail}
                value={email}
              ></input>
              <button
                type="button"
                className="MypageEdit_email_confirm MypageEdit_confirm_common_properties"
                onClick={checkEmail}
              >
                중복확인
              </button>
            </div>
          </div>
          <div className="MypageEdit_passwordbox">
            비밀번호 변경
            <div className="MypageEdit_passwordbox_newpasswordbox_subject MyPageEdit_box_subject">
              새 비밀번호
            </div>
            <div className="MypageEdit_passwordbox_newpasswordbox_content MyPageEdit_box_content">
              <input
                className="MypageEdit_passwordbox_newpasswordbox_input input_common_properties"
                type="password"
                value={password1}
                onChange={changePassword}
                placeholder="비밀번호를 입력해주세요(8 - 12자리)"
              ></input>
            </div>
            <div className="MypageEdit_passwordbox_newpasswordbox2_subject MyPageEdit_box_subject">
              새 비밀번호 확인
            </div>
            <div className="MypageEdit_passwordbox_newpasswordbox2_content MyPageEdit_box_content">
              <input
                className="MypageEdit_passwordbox_newpasswordbox2_input input_common_properties"
                type="password"
                value={password2}
                onChange={changePassword2}
              ></input>
            </div>
          </div>
          <div className="edit_button">
            <button
              className="MypageEdit_cansel_button MyPageEdit_button_common_properties"
              onClick={() => {
                window.location.href = `${LOCAL_URL}/main`;
              }}
            >
              취소
            </button>
            <button
              className="MypageEdit_confirm_button MyPageEdit_button_common_properties"
              onClick={editProfile}
            >
              수정
            </button>
          </div>
          <button className="MypageEdit_deleteUser" onClick={deleteUser}>
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default MypageTest;
