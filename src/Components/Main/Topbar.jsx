import React, { useState } from "react";
import "../../Style/Main/Topbar.scss";
import { TiThMenu } from "react-icons/ti";
import { BiCurrentLocation } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import Login from "../Sign/Login";
import SignUp from "../Sign/SignUp";

const Topbar = () => {
  const [user, setUser] = useRecoilState(userState);
  const [modal, setModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const logo = "/images/sitelogo.png";

  const openModal = () => {
    setModal(true);
  };

  const openModal2 = () => {
    setSignUpModal(true);
  };

  const closeModal = (e) => {
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
            <img
              className="siteLogo"
              onClick={() => {
                window.location.href = "/";
              }}
              src={logo}
            />
          </div>
          <div className="menuList">
            <div className="menu1">
              <ul>
                <li className="menu1_li">
                  <TiThMenu className="TiThMenu" />
                  <h3 className="menu_h3">메뉴</h3>
                </li>
                <ul>
                  <li>
                    <a href="/main">🌍 메인페이지</a>
                  </li>
                  {user && (
                    <>
                      <li>
                        <a href="/myplace">🔰 MY PLACE</a>
                      </li>
                      <li>
                        <a href="/likePage">💖 내가 찜한 가게</a>
                      </li>
                      <li>
                        <a href="/MyReview">📝 내가 작성한 리뷰</a>
                      </li>
                      <li>
                        <a href="/MypageUserConfirm">🙋🏻‍♀️ 마이페이지</a>
                      </li>
                    </>
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
              <div className="loginBtn signUpBtn">
                {!user && <h3 onClick={openModal2}>회원가입</h3>}
                <div className="openModal">
                  {signUpModal ? (
                    <SignUp openModal={openModal} closeModal2={closeModal2} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="show_user">
          <p className="username">
            <span
              className="username_span"
              onClick={() => {
                window.location.href = "/MypageUserConfirm";
              }}
            >
              {user && `${user.nickname}`}
            </span>
            {user && "님 환영합니다."}
          </p>
          <div className="now_location">
            <BiCurrentLocation className="BiCurrentLocation" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
