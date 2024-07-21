import { SHIN_BASE_URL } from "./constants"
import axios from "axios"
const m3u8Parser = require('m3u8-parser');

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
      const response = await axios.get(`https://shin-tv.onrender.com/api/user/liked/${email}`);
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
      const response = await axios.get(`${SHIN_BASE_URL}/episode-srcs?id=${id}&server=hd-1&category=sub `);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching recent releases:', error.message);
      throw error;
    }
  };

  export const getVideoResolutions = async (manifestUrl) => {
    try {
        const response = await axios.get(manifestUrl);
        const manifestContent = response.data;
        
        const parser = new m3u8Parser.Parser();
        parser.push(manifestContent);
        parser.end();
        
        const parsedManifest = parser.manifest;

        if (parsedManifest && parsedManifest.playlists) {
            const resolutions = parsedManifest.playlists.map(playlist => ({
                resolution: playlist.attributes.RESOLUTION,
                bitrate: playlist.attributes.BANDWIDTH,
                uri: playlist.uri
            }));
            
            return resolutions;
        } else {
            throw new Error('Invalid HLS manifest');
        }
    } catch (error) {
        console.error('Error fetching or parsing HLS manifest:', error.message);
        return null;
    }
};
