import React from "react";
import "../../Style/Sign/SignUp.scss";

const SignUp = () => {
  return (
    <>
      <body className="signUpBody">
        <div className="signUpBack">
          <div className="signUpLogo">회원가입</div>
          <div className="signUpForm">
            <div>
              이름
              <input type="text" />
            </div>
            <div>
              ID
              <input type="text" />
            </div>
            <div>
              password
              <input type="text" />
            </div>
            <div>
              password
              <input type="text" />
            </div>
            <div>
              email
              <input type="text" />
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default SignUp;
