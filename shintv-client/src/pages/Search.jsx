// Search.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useAppState } from "../context/AppStateContext";

export default function Search() {
  const { state, fetchSearchResults } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search).get('query');
  const isLoading = state.searchResults.isLoading;
  const searchResults = state.searchResults.list;

  useEffect(() => {
    if (querySearch) {
      fetchSearchResults(querySearch);
    }
  }, [querySearch, fetchSearchResults]);

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
            {searchResults.map((result, index) => (
              <Card key={index} animeData={result} />
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
