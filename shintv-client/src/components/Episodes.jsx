import React, { useEffect, useState } from "react"
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { getEpisodes } from "../utils";

export default function Episodes({id}) {
    const [episodes, setEpisodes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getEpisodes(id);
            setEpisodes(data.episodes);
          } catch (error) {
            console.error('Error fetching recent releases:', error.message);
          }
        };
        fetchData();
      }, []);

      const handleEpisodeClick = (id) => {
        navigate("/watch",{ state: { episodeId: id } })
      };

  return (
    <Container>
        <div className="heading">
            <h2>Episodes list</h2>
        </div>
        <div className="list">
        {episodes.map((episode) => (
          <Button key={episode.episodeId} onClick={() => handleEpisodeClick(episode.episodeId)}>
            {episode.number}
          </Button>
        ))}
      </div>
    </Container>
  )
}

const Container = styled.div`
    margin-left: 4rem;
    width: 75rem;
    .heading {
        h2 {
            margin-bottom: 10px;
        }
    }
`;

const Button = styled.button`
    width: 50px;
    margin: 5px;
    padding: 10px;
    background-color: white;
    border-radius: 1rem;
    color: black;
    border: 1px solid black;
    cursor: pointer;
    font-weight: bold;
    &:hover {
        background-color: red;
        color: white;
        border: 1px solid white;
    }
`;
