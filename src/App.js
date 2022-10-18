import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Main from "./Components/Main/Main";
import SignUp from "./Components/Sign/SignUp";
import Detail from "./Components/Detail/Detail";
import Login from "./Components/Sign/Login";
import Mypage from "./Components/Mypage/Mypage";
import MyReview from "./Components/Mypage/MyReview";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path={"/"} exact>
            <Home />
          </Route>
          <Route path={"/main"} exact>
            <Main />
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
          <Route path={"/Mypage"} exact>
            <Mypage />
          </Route>
          <Route path={"/MyReview"} exact>
            <MyReview />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
