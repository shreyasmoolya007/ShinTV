import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import {IoPlayCircleSharp} from "react-icons/io5"
import {RiThumbUpFill,RiThumbDownFill} from "react-icons/ri"
import {BsCheck} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styled from "styled-components";

const Hero = ({isLiked=false,heroData}) => {
    const [isPaused, setIsPaused] = useState(false);
    const navigate = useNavigate();
  
    const properties = {
      prevArrow: <div style={{ visibility: 'hidden' }}></div>,
      nextArrow: <div style={{ visibility: 'hidden' }}></div>,
      duration: 4000,
      indicators: true,
      onChange: () => setIsPaused(false),
    };
  
    useEffect(() => {
      const sliderContainer = document.querySelector('.slide-container');
  
      if (sliderContainer) {
        const handleTouchStart = () => {
          setIsPaused(true);
        };
  
        sliderContainer.addEventListener('touchstart', handleTouchStart);
  
        return () => {
          sliderContainer.removeEventListener('touchstart', handleTouchStart);
        };
      }
    }, []);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.slice(0, maxLength) + '...';
        }
        return text;
      };

  return (
    <Container>
      <div className="slide-container">
        <Slide {...properties}>
          {heroData.map((h) => (
            <div key={h.rank} className="each-slide">
              <div className="to-flex">
                <div className="text-content">
                  <h1>{h.name}</h1>
                  <p>{truncateText(h.description, 300)}</p>
                  <div className="icons flex j-between">
                    <div className="controls flex">
                        <IoPlayCircleSharp
                          title="Watch Now"
                          onClick={() => {
                            navigate("/anime-details",{ state: { animeId: h.id } })}
                          }
                        />
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
                    </div>
                </div>
                <div className='img-content'>
                  <img src={h.poster} alt="image" />
                </div>
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .slide-container {
    width: 100%;
    margin: auto;
    padding-top: 4.5%;
    border-radius: 3rem;
    .each-slide {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        .to-flex { 
            width: 100%;
            .text-content {
                text-align: left;
                width: 50%;
                padding: 100px 20px;
                position: absolute;
                h1 {
                font-size: 4em;
                text-shadow: 1px 1px 8px #000;
                }
                p {
                font-size: medium;
                text-shadow: 1px 1px 3px #000;
                }
            }
            .img-content {
                margin-left: 0;
                width: 1100px;
                height: 500px;
                img {
                    object-fit: cover;
                }
            }
            .icons {
              margin-top: 10px;
              .controls {
                  display: flex;
                  align-items: center;
                  gap: 1rem;
              }
              svg {
                  font-size: 2rem;
                  cursor: pointer;
                  transition: 0.3s ease-in-out;
                  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
                  &:hover {
                      color: #b8b8b8;
                  }
              }
              svg:first-of-type {
                  font-size: 5.5rem;
                  &:hover {
                      color: #f34242;
                  }
              }
            }
        }
    }
  }
`;

export default Hero;
