import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import loader from "../assets/loader.gif";
import { getWatchDetails } from "../utils";
import Navbar from "../components/Navbar";

export default function WatchEpisode() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const episodeId = location.state?.episodeId;
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWatchDetails(episodeId);

        if (data.sources.length > 0) {
          initializePlayer(data.sources[0].url, data.tracks);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recent releases:', error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [episodeId]);

  const initializePlayer = (videoUrl, tracks) => {
    const videoOptions = {
      autoplay: true,
      controls: true,
      sources: [{
        src: videoUrl,
        type: 'application/x-mpegURL'
      }],
      tracks: tracks.filter(track => track.kind === 'captions').map(track => ({
        kind: 'captions',
        src: track.file,
        srclang: track.label,
        label: track.label,
        default: track.default
      })),
      fluid: true
    };

    playerRef.current = videojs(videoRef.current, videoOptions, function onPlayerReady() {
      console.log('Player is ready');
    });
  };

  return (
    <>
    {
      isLoading ? <LoaderContainer>
        <img src={loader} alt="loader" className="loader" />
      </LoaderContainer> : (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={true}/>
      </div>
      <VideoContainer>
        <div data-vjs-player>
          <video ref={videoRef} className="video-js vjs-big-play-centered"></video>
        </div>
      </VideoContainer>
    </Container>
    )
    }
    </>
  );
}

const Container = styled.div``;

const VideoContainer = styled.div`
  margin-top: 6.5rem;
  margin-left: 15rem;
  height: 80vh;
  width: 70vw;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;
