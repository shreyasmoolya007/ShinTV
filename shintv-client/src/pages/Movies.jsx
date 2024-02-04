import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components"
import Navbar from "../components/Navbar";
import { getMovies } from "../utils";
import Card from "../components/Card";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getMovies();
            setMovies(data.animes);
          } catch (error) {
            console.error('Error fetching recent releases:', error.message);
          }
        };
        fetchData();
      }, []);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        // if (currentUser) navigate("/login");
      });
  return (
    <Container>
        <div className="navbar">
            <Navbar isScrolled={true}/>
        </div>
        <div className="movies">
        {movies.map((movie, index) => (
          <Card key={index} animeData={movie} />
        ))}
      </div>
    </Container>
  )
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
