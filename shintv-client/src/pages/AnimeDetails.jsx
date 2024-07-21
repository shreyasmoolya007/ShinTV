// AnimeDetails.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import Navbar from "../components/Navbar";
import Episodes from "../components/Episodes";
import { useAppState } from "../context/AppStateContext";

export default function AnimeDetails() {
  const { state, fetchAnimeDetails } = useAppState();
  const location = useLocation();
  const animeId = location.state?.animeId;

  const details = state.animeDetails[animeId] || {};
  const isLoading = details.isLoading === undefined ? true : details.isLoading;

  useEffect(() => {
    if (!details.info) {
      fetchAnimeDetails(animeId);
    }
  }, [animeId, details.info, fetchAnimeDetails]);

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
          <div className="details">
            <div className="left-section">
              <div className="info">
                <h1>{details.info?.name}</h1>
                <p>{details.info?.description}</p>
                <h3>Rating: {details.info?.stats.rating}</h3>
                <h3>Quality: {details.info?.stats.quality}</h3>
                <h3>Status: {details.moreInfo?.status}</h3>
                <h3>Score: {details.moreInfo?.malscore}</h3>
              </div>
            </div>
            <div className="right-section">
              <img src={details.info?.poster} alt="anime poster" className="poster" />
            </div>
          </div>
          <div className="episodes">
            <Episodes key={details.info?.id} id={details.info?.id} />
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  .navbar {
    position: absolute;
    z-index: 91;
  }
  .details {
    margin-top: 6.5rem;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;

    .left-section {
      display: flex;
      align-items: flex-start;
      .info {
        h1 {
          font-size: 4rem;
        }
        width: 975px;
        p {
          margin-bottom: 10px;
        }
      }
    }

    .right-section {
      .poster {
        width: 100%;
        height: 100%;
        margin-right: 20px;
        border-radius: 1rem;
      }
    }
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;
