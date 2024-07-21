// Movies.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useAppState } from "../context/AppStateContext";

export default function Movies() {
  const { state } = useAppState();
  const navigate = useNavigate();

  const { list: movies, isLoading } = state.movies;

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
  }, [navigate]);

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
          <div className="movies">
            {movies.map((movie, index) => (
              <Card key={index} animeData={movie} />
            ))}
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
  .movies {
    margin-top: 5.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
  }

  .movies > * {
    flex: 0 0 calc(12.5% - 1rem);
    box-sizing: border-box;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;
