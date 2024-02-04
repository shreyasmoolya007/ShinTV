import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import {RiThumbUpFill,RiThumbDownFill} from "react-icons/ri"
import {BsCheck} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import {BiChevronDown} from "react-icons/bi"

export default React.memo(function Card({animeData, isLiked=false}) {
    const [isHovered, setIsHovered ] = useState(false)
    const navigate = useNavigate();
  return (
    <Container 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <img src={animeData.poster} alt="anime"/>
      {
        isHovered && (
            <div className="hover">
                <div className="image-video-conatiner">
                    <img 
                        src={animeData.poster}
                        alt="anime"
                        onClick={() => navigate("/player")}
                    />
                </div>
                <div className="info-container flex column">
                    <h3 className="name" onClick={() => navigate("/player")}>{animeData.name}</h3>
                    <div className="icons flex j-between">
                        <div className="controls flex">
                            <RiThumbUpFill title="Like" />
                            <RiThumbDownFill title="Dislike" />
                            {
                                isLiked ? (
                                    <BsCheck title="Remove from List" /> 
                                ) : (
                                    <AiOutlinePlus title="Add to My List" />
                                )
                            }
                        </div>
                        <div className="info">
                            <BiChevronDown title="More info"/>
                        </div>
                    </div>
                    <div className="genres flex">
                        <ul className="flex">
                            <li>SUB :{animeData.episodes.sub}</li>
                            <li>DUB :{animeData.episodes.dub}</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
      }
    </Container>
  )
}
)

const Container = styled.div`
    max-width: 230px;
    width: 170px;
    height: 250px;
    cursor: pointer;
    position: relative;
    img {
        border-radius: 1rem;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    .hover {
        z-index: 90;
        height: max-content;
        width: 15rem;
        position: absolute;
        top: -18vh;
        left: 0;
        border-radius: 1rem;
        box-shadow: rgba(0,0,0,0.75) 0px 3px 10px;
        background-color: #181818;
        transition: 0.3s ease-in-out;
        .image-video-container {
            position: relative;
            img {
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 1rem;
                top: 0;
                z-index: 4;
                position: absolute;
            }
        }
        .info-container {
            padding: 1rem;
            gap: 0.5rem;
        }
        .icons {
            .controls {
                display: flex;
                gap: 1rem;
            }
            svg {
                font-size: 2rem;
                cursor: pointer;
                transition: 0.3s ease-in-out;
                &:hover {
                    color: #b8b8b8;
                }
            }
        }
        .genres {
            ul {
                gap: 1rem;
                li {
                    padding-right: 0.7rem;
                    &:first-of-type {
                        list-style-type: none;
                    }
                }
            }
        }
    }
`;
