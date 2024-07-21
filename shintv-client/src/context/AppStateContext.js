// AppStateContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTopAirings, getMostPopular, getRecentRelease, getHero, getDetails, getMovies, getTVShows, getWatchDetails, getUserLikedAnimes, getSearchResults } from '../utils';
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

const AppStateContext = createContext();

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
  const [state, setState] = useState({
    tvShows: {
      list: [],
      isLoading: true,
    },
    movies: {
      list: [],
      isLoading: true,
    },
    userLiked: {
      list: [],
      isLoading: true,
      email: null,
    },
    searchResults: {
      list: [],
      isLoading: true,
    },
    animeDetails: {},
    watchEpisode: {},
    home: {
      hero: [],
      topAirings: [],
      mostPopular: [],
      recentRelease: [],
      isLoading: true,
    },
  });

  const fetchHomeData = async () => {
    try {
      const dataTopAirings = await getTopAirings();
      const dataMostPopular = await getMostPopular();
      const dataRecentRelease = await getRecentRelease();
      const dataHero = await getHero();

      setState(prevState => ({
        ...prevState,
        home: {
          hero: dataHero.spotlightAnimes,
          topAirings: dataTopAirings.animes,
          mostPopular: dataMostPopular.animes,
          recentRelease: dataRecentRelease.animes,
          isLoading: false,
        },
      }));
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setState(prevState => ({
        ...prevState,
        home: { ...prevState.home, isLoading: false },
      }));
    }
  };

  const fetchAnimeDetails = async (animeId) => {
    try {
      const data = await getDetails(animeId);
      setState(prevState => ({
        ...prevState,
        animeDetails: {
          ...prevState.animeDetails,
          [animeId]: { ...data.anime, isLoading: false },
        },
      }));
    } catch (error) {
      console.error('Error fetching anime details:', error.message);
      setState(prevState => ({
        ...prevState,
        animeDetails: {
          ...prevState.animeDetails,
          [animeId]: { error: error.message, isLoading: false },
        },
      }));
    }
  };

  const fetchMovies = async () => {
    try {
      const data = await getMovies();
      setState(prevState => ({
        ...prevState,
        movies: {
          list: data.animes,
          isLoading: false,
        },
      }));
    } catch (error) {
      console.error('Error fetching movies:', error.message);
      setState(prevState => ({
        ...prevState,
        movies: {
          list: [],
          isLoading: false,
        },
      }));
    }
  };

  const fetchTVShows = async () => {
    try {
      const data = await getTVShows();
      setState(prevState => ({
        ...prevState,
        tvShows: {
          list: data.animes,
          isLoading: false,
        },
      }));
    } catch (error) {
      console.error('Error fetching TV shows:', error.message);
      setState(prevState => ({
        ...prevState,
        tvShows: {
          list: [],
          isLoading: false,
        },
      }));
    }
  };

  const fetchWatchEpisode = async (episodeId) => {
    try {
      const data = await getWatchDetails(episodeId);
      setState(prevState => ({
        ...prevState,
        watchEpisode: {
          ...prevState.watchEpisode,
          [episodeId]: { ...data, isLoading: false },
        },
      }));
    } catch (error) {
      console.error('Error fetching watch episode:', error.message);
      setState(prevState => ({
        ...prevState,
        watchEpisode: {
          ...prevState.watchEpisode,
          [episodeId]: { error: error.message, isLoading: false },
        },
      }));
    }
  };

  const fetchUserLikedAnimes = async (email) => {
    try {
      const data = await getUserLikedAnimes(email);
      setState(prevState => ({
        ...prevState,
        userLiked: {
          list: data,
          isLoading: false,
        },
      }));
    } catch (error) {
      console.error('Error fetching user liked animes:', error.message);
      setState(prevState => ({
        ...prevState,
        userLiked: {
          list: [],
          isLoading: false,
        },
      }));
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const data = await getSearchResults(query);
      setState(prevState => ({
        ...prevState,
        searchResults: {
          list: data.animes,
          isLoading: false,
        },
      }));
    } catch (error) {
      console.error('Error fetching search results:', error.message);
      setState(prevState => ({
        ...prevState,
        searchResults: {
          list: [],
          isLoading: false,
        },
      }));
    }
  };

  useEffect(() => {
    if (state.home.isLoading) {
      fetchHomeData();
    }
  }, [state.home.isLoading]);

  useEffect(() => {
    if (state.movies.isLoading) {
      fetchMovies();
    }
  }, [state.movies.isLoading]);

  useEffect(() => {
    if (state.tvShows.isLoading) {
      fetchTVShows();
    }
  }, [state.tvShows.isLoading]);

  return (
    <AppStateContext.Provider value={{ state, setState, fetchAnimeDetails, fetchWatchEpisode, fetchUserLikedAnimes, fetchSearchResults }}>
      {children}
    </AppStateContext.Provider>
  );
};
