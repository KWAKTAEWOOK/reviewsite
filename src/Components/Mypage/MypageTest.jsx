import React from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../../utils";
// import { useRecoilState } from "recoil";
// import { userState } from "../../recoil/user";
import TopbarV2 from "../Main/TopbarV2";
import "../../Style/Mypage/MypageTest.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import

const MypageTest = () => {
  return (
    <div>
      <TopbarV2 />
      <div className="MypageEditBoxContainer">
        <div className="MypageEditBox">
          <i class="fa fa-user-circle" aria-hidden="true"></i>
          <h2 className="MypageEditTitle">나의 정보</h2>
        </div>
      </div>
    </div>
  );
};

export default MypageTest;
