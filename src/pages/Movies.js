import * as React from "react";
import apiService from "../api/apiService";
import { useEffect, useState } from "react";
import { API_KEY } from "../api/config";
import { Grid, Typography } from "@mui/material";
import RenderMovies from "../components/RenderMovies";
import { Box } from "@mui/system";
import FTPagination from "../components/FTPagination";
import GenresFT from "../components/GenresFT";
import SearchBox from "../components/SearchBox";
function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [genreId, setGenreId] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [found, setFound] = useState("");
  const [genreName, setGenreName] = useState("");

  console.log(genreId);

  // get movies data
  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await apiService.get(
          `discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreId}`
        );
        setMovies(data?.results);
        setFound(data?.total_results);
        setTotalPages(data?.total_pages);
      } catch (error) {
        console.log(`Movies ${error}`);
      }
    };
    getMovies();
  }, [page, genreId]);

  return (
    <>
      <Box flexGrow={1} mt={3} display="flex" justifyContent="space-between">
        <Box display={"flex"} flexDirection="row">
          <Typography variant="h6" color="text.primary">
            Popular Movies {genreName ? `/ ${genreName}` : ""}
          </Typography>
        </Box>
        <Box>
          <SearchBox />
          <Typography variant="body" color="text.secondary" mb={5}>
            {found} results found
          </Typography>
        </Box>
      </Box>

      <Box flexGrow={1} mt={3} display="flex">
        <Box flexBasis={"100px"} mr={1} flexDirection="column">
          <GenresFT
            genreId={genreId}
            setGenreId={setGenreId}
            genreName={genreName}
            setGenreName={setGenreName}
          />
        </Box>

        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {movies.map((movie) => (
            <Grid key={movie.id} item xs={12} sm={6} md={3}>
              <RenderMovies movie={movie} />
            </Grid>
          ))}
        </Grid>
        <FTPagination setPage={setPage} totalPages={totalPages} />
      </Box>
    </>
  );
}

export default Movies;
