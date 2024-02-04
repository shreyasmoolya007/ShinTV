import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components"
import Navbar from "../components/Navbar";
import { getTVShows } from "../utils";
import Card from "../components/Card";

export default function TVShows() {
    const [tvshows, setTVshows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getTVShows();
            setTVshows(data.animes);
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
        <div className="tvshows">
        {tvshows.map((tv, index) => (
          <Card key={index} animeData={tv} />
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
    .tvshows {
        
        margin-top: 5.5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 1rem;
  }

  .tvshows > * {
    flex: 0 0 calc(12.5% - 1rem);
    box-sizing: border-box;
  }
`;
