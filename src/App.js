import * as React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import Movies from "./pages/Movies";
import Trending from "./pages/Trending";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
