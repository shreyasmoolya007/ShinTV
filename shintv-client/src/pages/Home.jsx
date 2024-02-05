import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar";
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Slider from "../components/Slider";
import loader from "../assets/loader.gif"
import { getTopAirings, getMostPopular, getRecentRelease, getHero } from "../utils";
import Hero from "../components/Hero";

export default function Home() {
  const [isScrolled, setIsScrolled] =  useState(false)
  const navigate = useNavigate();

  const [hero, setHero] = useState([]);
  const [topAirings, setTopAirings] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [recentRelease, setRecentRelease] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataTopAirings = await getTopAirings();
        setTopAirings(dataTopAirings.animes);

        const dataMostPopular = await getMostPopular();
        setMostPopular(dataMostPopular.animes);

        const dataRecentRelease = await getRecentRelease();
        setRecentRelease(dataRecentRelease.animes);

        const dataHero = await getHero();
        setHero(dataHero.spotlightAnimes);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <>
    {
      isLoading ? <LoaderContainer>
        <img src={loader} alt="loader" className="loader" />
      </LoaderContainer> : (
    <Container>
      <Navbar isScrolled={true}/>
      <div className="hero">
        <Hero isLiked={false} heroData={hero}/>
      </div>
      <Slider airingAnimes={topAirings} popularAnimes={mostPopular} recentAnimes={recentRelease}/>
    </Container>
    )
    }
    </>
  )
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
