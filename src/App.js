import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import BitmovinPlayer from "./components/BitMovinPlayer";
import data from "./components/data.json";
import Grid2 from "@mui/material/Unstable_Grid2";

function App() {
  const content = data.content;
  return (
    <div className="App">
      <Grid2 container className="navbar" style={{ margin: "1.5rem" }}>
        <div className="navbar-logo" />
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} maxWidth="md">
          <BitmovinPlayer content={content} />
        </Grid2>
      </Grid2>
      <div className="footer">
        <Grid2 item xs={12}>
          <div className="footer-logo" />
        </Grid2>
        <Grid2 item xs={12} spacing={0}>
          <p> © 2023 30DaySinger.com </p>
        </Grid2>
      </div>
    </div>
  );
}

export default App;
