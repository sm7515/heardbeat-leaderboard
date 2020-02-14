import React from "react";
import { Button, Box } from "@material-ui/core";

export default function Logout({ logout }) {
  return (
    <Box pt={5} mb={5} height="100%" width="100%">
      <Button variant="outlined" color="primary" onClick={logout}>
        logout
      </Button>
    </Box>
  );
}
