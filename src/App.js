import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import Movies from "./pages/Movies";
import Trending from "./pages/Trending";
import Layout from "./layout/Layout";

function App() {
  let location = useLocation();
  let background = location.state && location.state.background;
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Trending />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetail />} />
          <Route path="login" element={<Login />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
        </Routes>
      )}
    </>
  );
}

export default App;
