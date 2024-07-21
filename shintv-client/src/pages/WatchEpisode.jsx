import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ReactPlayer from "react-player";
import loader from "../assets/loader.gif"
import { getWatchDetails } from "../utils";
import Navbar from "../components/Navbar";

export default function WatchEpisode() {
  const [videoSource, setVideoSource] = useState(null);
  const [subtitleData, setSubtitleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const episodeId = location.state?.episodeId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWatchDetails(episodeId);

        if (data.sources.length > 0) {
          setVideoSource(data.sources[0].url);
        }

        if (data.tracks && data.tracks.length > 0) {
          const defaultSubtitle = data.tracks.find(track => track.default && track.kind === "captions");
          if (defaultSubtitle) {
            setSubtitleData(defaultSubtitle.file);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recent releases:', error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [episodeId]);

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
        {!isLoading && subtitleData && videoSource && (
          <ReactPlayer
            url={videoSource}
            playing={true}
            controls={true}
            width="100%"
            height="100%"
            config={{
              attributes: {
                crossOrigin: "anonymous"
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
    )
    }
    </>
  );
}

const Container = styled.div`
  
`;

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
