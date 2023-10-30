import "./App.css";
import React, { useState, useEffect } from "react";
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PinchOutlinedIcon from '@mui/icons-material/PinchOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Stack, Switch } from "@mui/material";

function App() {
  const [file, setFile] = useState();

  let allowZoom = true;

  function handleUpload(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  function handleZoomLock(e, c) {
    allowZoom = c;
  }

  useEffect(() => {
    const viewerContainerActions = document.getElementsByClassName("viewer__container--actions")[0];

    document.addEventListener('touchmove', event => {
      if (!allowZoom) {
        event.preventDefault();
        console.log("preventing zoom");
        return
      }
      else {
        let scale = (1 / window.visualViewport.scale);
        let scaleOffset = scale*100;
        let offsetLeft = window.visualViewport.offsetLeft;
        let offsetTop = window.visualViewport.offsetTop;
        viewerContainerActions.style.left = offsetLeft-100+scaleOffset + "px";
        viewerContainerActions.style.top =  offsetTop-(7.5*window.visualViewport.scale) + "px";
        viewerContainerActions.style.transform = "scale(" + scale + ")";
        }
    }, { passive: false });
    document.addEventListener('wheel', event => {
      let scale = (1 / window.visualViewport.scale);
      let scaleOffset = scale*100;
      let offsetLeft = window.visualViewport.offsetLeft;
      let offsetTop = window.visualViewport.offsetTop;
      viewerContainerActions.style.left = offsetLeft-100+scaleOffset + "px";
      viewerContainerActions.style.top =  offsetTop-(7.5*window.visualViewport.scale) + "px";
      viewerContainerActions.style.transform = "scale(" + scale + ")";
    });
  });
  
  return (
    <div className="App">

      <div id="viewer__container--actions" className="viewer__container viewer__container--actions">


        <Stack direction="row" spacing={1} alignItems="center" className="viewer__actions-menu">


          <Grid xs={6}
            display="flex"
            justifyContent="right"
            alignItems="center"
          >

            <Button
              component="label"
              tabIndex={-1}
              variant="text"
              color="primary"
              size="large"
              startDecorator={
                <FileUploadOutlinedIcon color="primary" />
              }
            >
              <input type="file" onChange={handleUpload} className="hidden-input" />
            </Button>

          </Grid>

          <Divider orientation="vertical" flexItem />

          <Grid xs={6}
            display="flex"
            justifyContent="left"
            alignItems="center"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <LockOutlinedIcon color="primary" />
              <Switch
                defaultChecked
                onChange={handleZoomLock}
              />
              <PinchOutlinedIcon color="primary" />
            </Stack>
          </Grid>
        </Stack>

      </div>
      <div className="viewer__container viewer__container--image">
        <img src={file} class="viewer-image" alt="" />
      </div >
    </div >


  );
}

export default App;