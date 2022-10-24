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
import Mypage3 from "./Components/Mypage/Mypage3";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState(sessionStorage.getItem("search"));

  const onChange = (e) => {
    setInputText(e.target.value);
    sessionStorage.setItem("search", e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
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
              />
            </Route>
            <Route path={"/signUp"} exact>
              <SignUp />
            </Route>
            <Route path={"/login"} exact>
              <Login />
            </Route>
            <Route path={"/Detail"} exact>
              <Detail />
            </Route>
            <Route path={"/Mypage3"} exact>
              <Mypage3 />
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
