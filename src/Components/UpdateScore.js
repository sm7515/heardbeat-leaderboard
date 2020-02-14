import React, { useState, useEffect } from "react";
import EdiText from "react-editext";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function UpdateScore() {
  const [groups, setGroups] = useState([]);

  function getAllGroups() {
    axios
      .get(`https://heartbeat-api.herokuapp.com/group/getGroups`)
      .then(res => {
        console.log(res.data);
        setGroups(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleSave(val, id) {
    console.log(id);
    console.log("Edited Value -> ", val);
    axios
      .post(`https://heartbeat-api.herokuapp.com/group/updateGroupScore`, {
        val,
        id
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllGroups();
  }, []);

  return (
    <div className="wrapper">
      {
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.pathname = process.env.PUBLIC_URL + "/manage";
          }}
        >
          {`<< groups`}
        </Button>
      }
      <span className="group">
        {groups &&
          groups.map((ele, i) => {
            return (
              <span className="group-item" key={i}>
                <span>{`Group: ${ele.id} - ${ele.groupName}`}</span>
                <EdiText
                  type="number"
                  value={ele.score + ""}
                  onSave={value => handleSave(value, ele.id)}
                />
              </span>
            );
          })}
      </span>
    </div>
  );
}
