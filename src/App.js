import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Main from "./Components/Main/Main";
import SignUp from "./Components/Sign/SignUp";

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
          <Route path={"/SignUp"} exact>
            <SignUp />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
