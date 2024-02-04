import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar";
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Slider from "../components/Slider";
import { getTopAirings, getMostPopular, getRecentRelease } from "../utils";
import Hero from "../components/Hero";

export default function Home() {
  const [isScrolled, setIsScrolled] =  useState(false)
  const navigate = useNavigate();

  const [topAirings, setTopAirings] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [recentRelease, setRecentRelease] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopAirings();
        setTopAirings(data.animes);
      } catch (error) {
        console.error('Error fetching recent releases:', error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMostPopular();
        setMostPopular(data.animes);
      } catch (error) {
        console.error('Error fetching recent releases:', error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecentRelease();
        setRecentRelease(data.animes);
      } catch (error) {
        console.error('Error fetching recent releases:', error.message);
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
  console.log(topAirings);
  return (
    <Container>
      <Navbar isScrolled={true}/>
      <div className="hero">
        <Hero />
      </div>
      <Slider airingAnimes={topAirings} popularAnimes={mostPopular} recentAnimes={recentRelease}/>
    </Container>
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
