import React from "react";
import Topbar from "../Main/Topbar";
import "../../Style/Sign/Login.scss";

const Login = () => {
  return (
    <>
      <Topbar />
      <div className="signUpBody">
        <div className="signUpBack">
          <div className="loginTemplate">
            <div className="signUpLogo">
              Login
              <hr />
            </div>
            <div className="signUpForm">
              <form>
                <div>
                  ID
                  <br />
                  <input />
                </div>
                <div>
                  password
                  <br />
                  <input />
                </div>
                <button type="submit" className="signUpButton">
                  로그인
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
