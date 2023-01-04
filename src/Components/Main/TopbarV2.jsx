import React, { useState } from "react";
import "../../Style/Main/Topbar.scss";
import { TiThMenu } from "react-icons/ti";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import Login from "../Sign/Login";
import SignUp from "../Sign/SignUp";

const Topbar = () => {
  const [user, setUser] = useRecoilState(userState);
  const [modal, setModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const openModal2 = () => {
    setSignUpModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const closeModal2 = () => {
    setSignUpModal(false);
  };

  return (
    <>
      <div className="backbar">
        <div className="menuBar">
          <div className="siteLogo">
            <a href="/">넌 어때?</a>
          </div>
          <div className="menuList">
            <div className="menu1">
              <ul>
                <li>
                  <TiThMenu className="TiThMenu" />
                  <h3>메뉴</h3>
                </li>
                <ul>
                  <li>
                    <a href="/main">메인페이지</a>
                  </li>
                  <li>
                    <a href="/myplace">🔰 MY PLACE</a>
                  </li>
                  <li>
                    <a href="/likePage">내가 찜한 가게</a>
                  </li>
                  {user && (
                    <li>
                      <a href="/MyReview">내가 작성한 리뷰</a>
                    </li>
                  )}
                  {user && (
                    <li>
                      <a href="/MypageUserConfirm">마이페이지</a>
                    </li>
                  )}
                  {user && user.userRole === "ADMIN" ? (
                    <li>
                      <a href="/main" className="admin_site">
                        관리하기
                      </a>
                    </li>
                  ) : null}
                </ul>
              </ul>
            </div>
            <div className="menu1 sign_btn">
              <div className="loginBtn">
                <h3 onClick={openModal}>{!user && "로그인"}</h3>
                <div className="openModal">
                  {modal ? (
                    <Login closeModal={closeModal} openModal2={openModal2} />
                  ) : null}
                </div>
                <h3
                  className="logoutBtn"
                  onClick={() => {
                    if (window.confirm("로그아웃하시겠습니까?")) {
                      setUser(null);
                      window.location.href = "/main";
                    }
                  }}
                >
                  {user && "로그아웃"}
                </h3>
              </div>
              <div className="signUpBtn">
                <h3 onClick={openModal2}>{!user && "회원가입"}</h3>
                <div className="openModal">
                  {signUpModal ? (
                    <SignUp openModal={openModal} closeModal2={closeModal2} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="username">
            <a href="/MypageUserConfirm">{user && `${user.nickname}`}</a>
          </div>
          <div className="username usernameback">
            {user && "님 환영합니다."}
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
