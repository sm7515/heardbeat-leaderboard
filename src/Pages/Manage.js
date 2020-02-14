import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EdiText from "react-editext";
import axios from "axios";
import ImageUploader from "react-images-upload";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 240
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  typography: {
    fontFamily: "Roboto"
  }
}));

export default function Manage() {
  const [groups, setGroups] = useState([]);
  const [number, setNumber] = useState("");
  let [name, setName] = useState("");
  let [profileimg, setProfileImg] = useState();
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`https://heartbeat-api.herokuapp.com/group/getGroups`)
      .then(res => {
        // console.log(res.data);
        setGroups(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [number, name]);

  useEffect(() => {
    // console.log(number);
    number &&
      axios
        .get(`https://heartbeat-api.herokuapp.com/group/getGroup?No=${number}`)
        .then(res => {
          // console.log(res.data);
          setName(res.data.groupName);
          setProfileImg(res.data.profileImg);
        })
        .catch(err => {
          console.log(err);
        });
  }, [number]);

  const handleChange = event => {
    // console.log(event.target.key);
    setNumber(event.target.value);
  };

  useEffect(() => {
    setName(name);
  }, [name]);

  useEffect(() => {
    setProfileImg(profileimg);
    profileimg && uploadImage();
  }, [profileimg]);

  const handleSave = val => {
    // console.log("Edited Value -> ", val);
    name = val;
    setName(name);
    axios
      .post(`https://heartbeat-api.herokuapp.com/group/updateGroupName`, {
        val,
        number
      })
      .then(res => {
        // console.log(res.data, "new name", name);
      })
      .catch(err => {
        console.log(err);
      });
  };

  function onDrop(picture) {
    // console.log(picture);
    if (picture.length !== 0) {
      const picFile = picture[0];
      const reader = new FileReader();
      reader.readAsDataURL(picFile);
      reader.onloadend = function() {
        profileimg = reader.result;
        setProfileImg(profileimg);
      };
    }
  }

  function uploadImage() {
    profileimg &&
      axios
        .post(`https://heartbeat-api.herokuapp.com/group/updateGroupImage`, {
          profileimg,
          number
        })
        .then(res => {
          // window.location.reload();
        })
        .catch(err => {
          console.log(err);
          alert("error updating image. File size might be too big.");
        });
  }

  return (
    <div className="groupcontainer">
      <FormControl className={classes.formControl}>
        <InputLabel id="number-label">Group No.</InputLabel>
        <Select
          labelId="number-label"
          id="number-select"
          value={number}
          name="number"
          onChange={e => handleChange(e)}
        >
          {groups &&
            groups.map((ele, i) => {
              return (
                <MenuItem value={ele.id} key={i}>
                  {`Group ${ele.id}: ${ele.groupName}`}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      {name && (
        <div id="update">
          <span id="groupname">
            <span>Group name:</span>
            <EdiText type="text" value={name} onSave={handleSave} />
          </span>
          {profileimg && (
            <div id="upload-image">
              <img
                src={profileimg}
                alt="group profile"
                style={{ width: "120px" }}
                id="profileimg"
              />
            </div>
          )}
          <ImageUploader
            withIcon={true}
            buttonText="Change profile picture"
            onChange={onDrop}
            imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
            maxFileSize={1048487}
            withLabel={false}
            withIcon={false}
            singleImage={true}
          />
        </div>
      )}
      {
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.reload();
          }}
        >
          {`refresh the page`}
        </Button>
      }
    </div>
  );
}
