import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components"
import loader from "../assets/loader.gif"
import Navbar from "../components/Navbar";
import { getUserLikedAnimes } from "../utils";
import Card from "../components/Card";

export default function UserLiked() {
    const [liked, setLiked] = useState([]);
    const [email,setEmail] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
        setEmail(currentUser.email);
        setIsLoading(false);
        } else {
            navigate("/login");
            setIsLoading(false);
        }
    });
    
    return () => {
    unsubscribe();
    };
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getUserLikedAnimes(email);
            setLiked(data);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching recent releases:', error.message);
            setIsLoading(false);
          }
        };
        if (email) {
            fetchData();
          }
      
      }, [email]);

      const removeFromListCallback = async () => {
        const newData = await getUserLikedAnimes(email);
        setLiked(newData);
    };
    

      return (
        <>
        {
          isLoading ? <LoaderContainer>
            <img src={loader} alt="loader" className="loader" />
          </LoaderContainer> : (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={true}/>
            </div>
            <div className="movies">
            {liked.map((anime,index) => (
              <Card key={index} animeData={anime} isLiked={true} removeFromListCallback={removeFromListCallback}/>
            ))}
          </div>
        </Container>
        )
        }
        </>
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

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;
