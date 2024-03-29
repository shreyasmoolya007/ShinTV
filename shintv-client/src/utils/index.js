import { SHIN_BASE_URL } from "./constants"
import axios from "axios"

export const getTopAirings = async () => {
  try {
    const response = await axios.get(`${SHIN_BASE_URL}/top-airing`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching recent releases:', error.message);
    throw error;
  }
};

export const getMostPopular = async () => {
    try {
      const response = await axios.get(`${SHIN_BASE_URL}/most-popular`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching recent releases:', error.message);
      throw error;
    }
  };

  export const getRecentRelease = async () => {
    try {
      const response = await axios.get(`${SHIN_BASE_URL}/recently-updated`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching recent releases:', error.message);
      throw error;
    }
  };

  export const getMovies = async () => {
    try {
      const response = await axios.get(`${SHIN_BASE_URL}/movie`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching recent releases:', error.message);
      throw error;
    }
  };

  export const getTVShows = async () => {
    try {
      const response = await axios.get(`${SHIN_BASE_URL}/tv`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching recent releases:', error.message);
      throw error;
    }
  };

  export const getHero = async () => {
    try {
      const response = await axios.get(`${SHIN_BASE_URL}/home `);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching recent releases:', error.message);
      throw error;
    }
  };

  export const getUserLikedAnimes = async (email) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/user/liked/${email}`);
      const animes  = response.data.animes;
      return animes;
    } catch (error) {
      console.error('Error fetching liked movies:', error.message);
      throw error;
    }
  };

  export const getSearchResults = async (query) => {
    try {
      const response = await axios.get(`${SHIN_BASE_URL}/search?q=${query} `);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching recent releases:', error.message);
      throw error;
    }
  };

  export const getDetails = async (id) => {
    try {
      const response = await axios.get(`${SHIN_BASE_URL}/info?id=${id} `);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching recent releases:', error.message);
      throw error;
    }
  };

  export const getEpisodes = async (id) => {
    try {
      const response = await axios.get(`${SHIN_BASE_URL}/episodes/${id} `);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching recent releases:', error.message);
      throw error;
    }
  };

  export const getWatchDetails = async (id) => {
    try {
      const response = await axios.get(`${SHIN_BASE_URL}/episode-srcs?id=${id}&server=vidstreaming&category=sub `);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching recent releases:', error.message);
      throw error;
    }
  };

