// Home.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Slider from "../components/Slider";
import loader from "../assets/loader.gif";
import { useAppState } from "../context/AppStateContext";
import Hero from "../components/Hero";

export default function Home() {
  const { state, setState } = useAppState();
  const navigate = useNavigate();

  const { hero, topAirings, mostPopular, recentRelease, isLoading } = state.home;

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
  }, [navigate]);

  const [isScrolled, setIsScrolled] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoaderContainer>
          <img src={loader} alt="loader" className="loader" />
        </LoaderContainer>
      ) : (
        <Container>
          <Navbar isScrolled={isScrolled} />
          <div className="hero">
            <Hero isLiked={false} heroData={hero} />
          </div>
          <Slider airingAnimes={topAirings} popularAnimes={mostPopular} recentAnimes={recentRelease} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
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
