import React, { useState, useEffect } from "react";
import { Box, TextField, Grid, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

export default function Signin({ login }) {
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {}, [empty, error]);

  function handleSubmit(e) {
    e.preventDefault();
    const netid = e.currentTarget.netid.value;
    const pwd = e.currentTarget.pwd.value;
    console.log("netid: ", netid, " pwd: ", pwd);
    if (
      netid === "" ||
      pwd === "" ||
      netid === undefined ||
      pwd === undefined
    ) {
      setEmpty(true);
    } else {
      setEmpty(false);
      axios
        .post(`https://heartbeat-api.herokuapp.com/signin`, {
          netid,
          pwd
        })
        .then(res => {
          setError();
          login();
          window.location.pathname = "/manage";
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          err.response && console.log(err.response.data);
          err.response && setError(err.response.data);
        });
    }
  }
  return (
    <Box pt={10} height="100%" width="100%">
      {empty && (
        <Box pb={5}>
          <Alert severity="error">Please enter your netid or password!</Alert>
        </Box>
      )}
      {error && (
        <Box pb={5}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <form
        className="signin-form"
        noValidate
        autoComplete="off"
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              id="net-id"
              name="netid"
              label="net id"
              variant="outlined"
              placeholder=""
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="pwd"
              id="pwd"
              label="password"
              variant="outlined"
              placeholder=""
            />
          </Grid>
          <Box pt={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              group manager login
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
}
