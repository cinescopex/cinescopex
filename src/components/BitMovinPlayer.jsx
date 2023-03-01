import React, { useEffect, useRef, useState } from "react";
import { Player } from "bitmovin-player/modules/bitmovinplayer-core";
import EngineBitmovinModule from "bitmovin-player/modules/bitmovinplayer-engine-bitmovin";
import MseRendererModule from "bitmovin-player/modules/bitmovinplayer-mserenderer";
import HlsModule from "bitmovin-player/modules/bitmovinplayer-hls";
import DashModule from "bitmovin-player/modules/bitmovinplayer-dash";
import AbrModule from "bitmovin-player/modules/bitmovinplayer-abr";
import XmlModule from "bitmovin-player/modules/bitmovinplayer-xml";
import ContainerTSModule from "bitmovin-player/modules/bitmovinplayer-container-ts";
import ContainerMp4Module from "bitmovin-player/modules/bitmovinplayer-container-mp4";
import SubtitlesModule from "bitmovin-player/modules/bitmovinplayer-subtitles";
import SubtitlesCEA608Module from "bitmovin-player/modules/bitmovinplayer-subtitles-cea608";
import PolyfillModule from "bitmovin-player/modules/bitmovinplayer-polyfill";
import StyleModule from "bitmovin-player/modules/bitmovinplayer-style";
import { UIFactory } from "bitmovin-player/bitmovinplayer-ui";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import Grid2 from '@mui/material/Unstable_Grid2';
import Radio from '@mui/material/Radio';
import "bitmovin-player/bitmovinplayer-ui.css";
import "./BitMovinPlayer.css"
import { Segment } from "@mui/icons-material";

function BitmovinPlayer(props) {
  const content = props.content;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  function handleSetCurrentIndex(index) {    
    if (index >= content.length) index = 0;
    setCurrentIndex(index);
    window.scrollTo(0, 0)
  }

  const { videoUrl, videoTitle, description } = content[currentIndex];
  

  const [player, setPlayer] = useState(null);

  const playerConfig = {
    key: "d5af6a6a-bdc9-4a9b-8cb8-7a84cd52a4a7",
  };

  const playerSource = {
    hls: videoUrl,
    title: videoTitle
  };
  const playerDiv = useRef();

  useEffect(() => {
    function setupPlayer() {
      Player.addModule(EngineBitmovinModule);
      Player.addModule(MseRendererModule);
      Player.addModule(HlsModule);
      Player.addModule(XmlModule);
      Player.addModule(DashModule);
      Player.addModule(AbrModule);
      Player.addModule(ContainerTSModule);
      Player.addModule(ContainerMp4Module);
      Player.addModule(SubtitlesModule);
      Player.addModule(SubtitlesCEA608Module);
      Player.addModule(PolyfillModule);
      Player.addModule(StyleModule);

      const playerInstance = new Player(playerDiv.current, playerConfig);
      UIFactory.buildDefaultUI(playerInstance);
      playerInstance.load(playerSource).then(
        () => {
          setPlayer(playerInstance);
          console.log("Successfully loaded source");
        },
        () => {
          console.log("Error while loading source");
        }
      );
    }

    setupPlayer();

    return () => {
      function destroyPlayer() {
        if (player != null) {
          player.destroy();
          setPlayer(null);
        }
      }

      destroyPlayer();
    };
  }, []);

  useEffect(() => {
    if (playerSource !== null)
      player?.load(playerSource);
  }, [currentIndex]);

  return (    
    <>
      <Grid2 container style={{background:'black'}}>
        <Grid2 xs={0} md={2}>        
            
        </Grid2>
        <Grid2 xs={12} md={8}>        
            <div id="player" ref={playerDiv} />
        </Grid2>
        <Grid2 xs={0} md={2}>        
            
        </Grid2>    
      </Grid2>
      <Grid2 container xs={12} spacing={0}>
        <Grid2 item xs={12} md={4}>
            <ul className="playlist">
              {content.map((item, index)=>{
                const isCurrentItem = item.videoTitle === videoTitle;                
                console.log(isCurrentItem);
                const className = isCurrentItem ? "list-item active" : "list-item" ;
                return (<li className={className} key={index}  onClick={()=>handleSetCurrentIndex(index)}>
                <OndemandVideoIcon className="icon left-elements" />
                <span className="left-elements">{item.videoTitle}</span>
                <Radio className="right-element" checked={isCurrentItem}/>
              </li>)
              })}              
            </ul>
          </Grid2>    
          <Grid2 item xs={12} md={8} p={2}>
            <div className="lesson-typograph">
              <h2 dangerouslySetInnerHTML={{ __html: videoTitle }} />
              <div dangerouslySetInnerHTML={{ __html: description }} />          
            </div>
          </Grid2>
          
      </Grid2>
    </>            
  );
}



export default BitmovinPlayer;
