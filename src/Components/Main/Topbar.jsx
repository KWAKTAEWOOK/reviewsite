import React from "react";
import { TiThMenu } from "react-icons/ti";
import { BiCurrentLocation } from "react-icons/bi";
import "../../Style/Main/Topbar.scss";

const Topbar = () => {
  return (
    <>
      <div className="backbar">
        <div className="menuBar">
          <div className="siteLogo">
            <a href="/main">넌 어때?</a>
          </div>
          <div className="menuList">
            <div className="menu1">
              <ul>
                <li>
                  <TiThMenu className="TiThMenu" />
                  <h3>&nbsp;&nbsp;메뉴</h3>
                </li>
                <ul>
                  <li>
                    <a href="/main">내 주변 찾기</a>
                  </li>
                  <li>
                    <a href="/main">카테고리별 찾기</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="/main">내가 찜한 가게</a>
                  </li>
                  <li>
                    <a href="/main">내가 작성한 리뷰</a>
                  </li>
                </ul>
              </ul>
            </div>
            <div className="menu1 sign_btn">
              <div className="loginBtn">
                <a href="/login">
                  <h3>로그인</h3>
                </a>
              </div>
              <div className="signUpBtn">
                <a href="/signUp">
                  <h3>회원가입</h3>
                </a>
              </div>
              <div className="now_location">
                <BiCurrentLocation className="BiCurrentLocation" />
                <p>대전시 서구 둔산동</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
