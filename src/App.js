import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Main from "./Components/Main/Main";
import SignUp from "./Components/Sign/SignUp";
import Detail from "./Components/Detail/Detail";
import Login from "./Components/Sign/Login";
import Mypage from "./Components/Mypage/Mypage";
import { RecoilRoot } from "recoil";
import MyReview from "./Components/Mypage/MyReview";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState(sessionStorage.getItem("search"));
  const [searchVisible, setSearchVisible] = useState(true);

  const onChange = (e) => {
    setInputText(e.target.value);
    sessionStorage.setItem("search", e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    setPlace(sessionStorage.getItem("search"));
    setInputText("");
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
                place={place}
                setPlace={setPlace}
                inputText={inputText}
                setInputText={setInputText}
                onChange={onChange}
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
                setSearchVisible={setSearchVisible}
              />
            </Route>
            <Route path={"/signUp"} exact>
              <SignUp />
            </Route>
            <Route path={"/login"} exact>
              {/* <Login /> */}
            </Route>
            <Route path={"/Detail/:id"} exact>
              <Detail />
            </Route>
            <Route path={"/Mypage"} exact>
              <Mypage />
            </Route>
            <Route path={"/MyReview"} exact>
              <MyReview />
            </Route>
          </Switch>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};

export default App;
