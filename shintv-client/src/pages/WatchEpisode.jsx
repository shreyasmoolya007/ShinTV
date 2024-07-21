// WatchEpisode.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ReactPlayer from "react-player";
import loader from "../assets/loader.gif";
import Navbar from "../components/Navbar";
import { useAppState } from "../context/AppStateContext";

export default function WatchEpisode() {
  const { state, fetchWatchEpisode } = useAppState();
  const location = useLocation();
  const episodeId = location.state?.episodeId;

  useEffect(() => {
    if (!state.watchEpisode[episodeId]) {
      fetchWatchEpisode(episodeId);
    }
  }, [episodeId, fetchWatchEpisode, state.watchEpisode]);

  const { sources, tracks, isLoading } = state.watchEpisode[episodeId] || {
    sources: [],
    tracks: [],
    isLoading: true,
  };

  const videoSource = sources.length > 0 ? sources[0].url : null;
  const subtitleData =
    tracks && tracks.length > 0
      ? tracks.find((track) => track.default && track.kind === "captions")?.file
      : null;

  return (
    <>
      {isLoading ? (
        <LoaderContainer>
          <img src={loader} alt="loader" className="loader" />
        </LoaderContainer>
      ) : (
        <Container>
          <div className="navbar">
            <Navbar isScrolled={true} />
          </div>
          <VideoContainer>
            {!isLoading && subtitleData && videoSource && (
              <ReactPlayer
                url={videoSource}
                playing={true}
                controls={true}
                width="100%"
                height="100%"
                config={{
                  attributes: {
                    crossOrigin: "anonymous",
                  },
                  tracks: [
                    {
                      kind: "subtitles",
                      src: subtitleData,
                      srcLang: "en",
                      label: "English",
                      default: true,
                    },
                  ],
                }}
              />
            )}
          </VideoContainer>
        </Container>
      )}
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
