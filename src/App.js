import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import UpdateScore from "./Components/UpdateScore";
import Manage from "./Pages/Manage";
import LeaderBoard from "./Pages/LearderBoard";

function App() {
  return (
    <div className="App">
      <Router>
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
