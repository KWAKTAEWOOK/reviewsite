import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Main from "./Components/Main/Main";
import SignUp from "./Components/Sign/SignUp";
import Detail from "./Components/Detail/Detail";
import Login from "./Components/Sign/Login";

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
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
