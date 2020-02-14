import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayTop from "../Components/DisplayTop";
import DisplayRest from "../Components/DisplayRest";

export default function LeaderBoard() {
  const [groups, setGroups] = useState([]);
  const [topFive, setTopFive] = useState([]);
  const [fiveToTen, setFiveToTen] = useState([]);
  const [tenToTwen, setTenToTwen] = useState([]);
  const [theRest, setRest] = useState([]);

  function getAllGroups() {
    axios
      .get(`https://heartbeat-api.herokuapp.com/group/getByRank`)
      .then(res => {
        console.log(res.data);
        setGroups(res.data);
      });
  }

  useEffect(() => {
    getAllGroups();
  }, []);

  useEffect(() => {
    groups && setTopFive(groups.slice(0, 5));
    groups && setFiveToTen(groups.slice(5, 10));
    groups && setTenToTwen(groups.slice(10, 20));
    groups && setRest(groups.slice(20));
  }, [groups]);

  return (
    <div className="leaderboard-container">
      <div className="top-container">
        {topFive.length !== 0 &&
          topFive.map((ele, i) => {
            return (
              <DisplayTop
                key={i}
                type="topfive"
                index={i}
                rank={ele.rank}
                name={ele.groupName}
                score={ele.score}
                profileImg={ele.profileImg}
              />
            );
          })}
        {fiveToTen.length !== 0 &&
          fiveToTen.map((ele, i) => {
            return (
              <DisplayTop
                key={i}
                type="fiveToTen"
                index={i}
                rank={ele.rank}
                name={ele.groupName}
                score={ele.score}
                profileImg={ele.profileImg}
              />
            );
          })}
        {tenToTwen.length !== 0 &&
          tenToTwen.map((ele, i) => {
            return (
              <DisplayTop
                key={i}
                type="tenToTwen"
                index={i}
                rank={ele.rank}
                name={ele.groupName}
                score={ele.score}
                profileImg={ele.profileImg}
              />
            );
          })}
      </div>
      <div className="rest-container">
        {theRest.length !== 0 &&
          theRest.map((ele, i) => {
            return (
              <DisplayRest
                key={i}
                type="rest"
                index={i}
                rank={ele.rank}
                name={ele.groupName}
                score={ele.score}
                profileImg={ele.profileImg}
              />
            );
          })}
      </div>
    </div>
  );
}
