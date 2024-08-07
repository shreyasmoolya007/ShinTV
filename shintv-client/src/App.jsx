// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppStateProvider } from './context/AppStateContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import UserLiked from "./pages/UserLiked";
import Search from "./pages/Search";
import AnimeDetails from "./pages/AnimeDetails";
import WatchEpisode from "./pages/WatchEpisode";

export default function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/tv" element={<TVShows />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/anime-details" element={<AnimeDetails />} />
          <Route exact path="/watch" element={<WatchEpisode />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/mylist" element={<UserLiked />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  );
}
