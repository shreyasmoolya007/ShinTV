// UserLiked.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useAppState } from "../context/AppStateContext";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

export default function UserLiked() {
  const { state, fetchUserLikedAnimes } = useAppState();
  const navigate = useNavigate();
  const email = state.userLiked.email;
  const isLoading = state.userLiked.isLoading;
  const liked = state.userLiked.list;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        fetchUserLikedAnimes(currentUser.email);
      } else {
        navigate("/login");
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [fetchUserLikedAnimes, navigate]);

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
            {liked.map((anime, index) => (
              <Card key={index} animeData={anime} isLiked={true} />
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
