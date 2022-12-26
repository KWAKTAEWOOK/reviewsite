import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./Style/App.css";
import Home from "./Components/Home/Home";
import Main from "./Components/Main/Main";
import SignUp from "./Components/Sign/SignUp";
import Detail from "./Components/Detail/Detail";
import { RecoilRoot } from "recoil";
import MyReview from "./Components/Mypage/MyReview";
import Help from "./Components/Sign/Help";
import FindId from "./Components/Sign/FindId";
import FindPw from "./Components/Sign/FindPw";
import LikePage from "./Components/Mypage/LikePage";
import MypageTest from "./Components/Mypage/MypageTest";
import MypageUserConfirm from "./Components/Mypage/MypageUserConfirm";
import MyPlace from "./Components/MyPlace/MyPlace";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState(sessionStorage.getItem("search"));
  const [searchVisible, setSearchVisible] = useState(true);
  const [keywords, setKeywords] = useState(
    JSON.parse(sessionStorage.getItem("keywords") || "[]")
  );

  const onChange = (e) => {
    setInputText(e.target.value);
    sessionStorage.setItem("search", e.target.value);
  };

  const onAddKeyWord = (text) => {
    const newKeyword = {
      id: Date.now(),
      text,
      date: getDate(),
    };

    setKeywords([newKeyword, ...keywords]);
  };
  const getDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${month}.${day}`;
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    setSearchVisible(true);
  };

  return (
    <>
      {/* RecoilRoot : 로그인상태 유지 */}
      <RecoilRoot>
        <BrowserRouter>
          <Switch>
            <Route path={"/"} exact>
              <Home
                onChange={onChange}
                inputText={inputText}
                setKeywords={setKeywords}
              />
            </Route>
            <Route path={"/main"} exact>
              <Main
                place={place}
                setPlace={setPlace}
                inputText={inputText}
                setInputText={setInputText}
                onChange={onChange}
                searchSubmit={searchSubmit}
                searchVisible={searchVisible}
                keywords={keywords}
                setKeywords={setKeywords}
                setSearchVisible={setSearchVisible}
                onAddKeyWord={onAddKeyWord}
              />
            </Route>
            <Route path={"/signUp"} exact>
              <SignUp />
            </Route>
            <Route path={"/Detail/:place_name/:id"} exact>
              <Detail />
            </Route>
            <Route path={"/MyReview"} exact>
              <MyReview />
            </Route>
            <Route path={"/help/"} exact>
              <Help />
            </Route>
            <Route path={"/help/findId"} exact>
              <FindId />
            </Route>
            <Route path={"/help/findPw"} exact>
              <FindPw />
            </Route>
            <Route path={"/likePage"} exact>
              <LikePage />
            </Route>
            <Route path={"/mypagetest"} exact>
              <MypageTest />
            </Route>
            <Route path={"/MypageUserConfirm"} exact>
              <MypageUserConfirm />
            </Route>
            <Route path={"/myplace"} exact>
              <MyPlace />
            </Route>
          </Switch>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};

export default App;
