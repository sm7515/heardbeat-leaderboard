import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import "./App.css";
import Signin from "./Pages/Signin";
import UpdateScore from "./Components/UpdateScore";
import Manage from "./Pages/Manage";
import Logout from "./Pages/Logout";
import LeaderBoard from "./Pages/LearderBoard";

function App() {
  let [login, setLogin] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("loggedin")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [login]);

  useEffect(() => {
    setLogin(login);
  }, [login]);

  function loginFunction() {
    window.localStorage.setItem("loggedin", "123");
    login = true;
    console.log(login);
  }

  function logoutFunction() {
    window.localStorage.setItem("loggedin", false);
    window.location.pathname = "/signin";
    login = false;
  }

  return (
    <div className="App">
      {window.location.pathname !== "/signin" &&
        window.location.pathname !== "/leaderboard" && (
          <Logout logout={logoutFunction} />
        )}
      <Router>
        <Route path="/signin">
          <Signin login={loginFunction} />
        </Route>
        <Route path="/manage">
          <Manage />
        </Route>
        <Route path="/score">
          <UpdateScore />
        </Route>
        <Route path="/leaderboard">
          <LeaderBoard />
        </Route>
      </Router>
    </div>
  );
}

export default App;
