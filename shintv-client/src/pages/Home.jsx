import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/conan1.jpg"
import styled from "styled-components"

import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [isScrolled, setIsScrolled] =  useState(false)

  const navigate = useNavigate();


  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <Container>
      <Navbar isScrolled={isScrolled}/>
      <div className="hero">
        <img  className="background-image" src={backgroundImage} alt="background" />     
        <h1></h1>
      </div>
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
