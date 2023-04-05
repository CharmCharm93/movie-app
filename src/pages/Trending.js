import * as React from "react";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { API_KEY } from "../api/config";
import apiService from "../api/apiService";
import RenderMovies from "../components/RenderMovies";
import { Box } from "@mui/system";
import FTPagination from "../components/FTPagination";

const queryOptions = [
  {
    value: "day",
  },
  {
    value: "week",
  },
];

function Trending() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [time, setTime] = useState("day");

  const handleChange = (event) => {
    // console.log(event);
    setTime(event.target.value);
  };

  // get movies data
  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await apiService.get(
          `trending/movie/${time}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`
        );
        setMovies(data?.results);
        setTotalPages(data?.total_pages);
      } catch (error) {
        console.log(`Movies ${error}`);
      }
    };
    getMovies();
  }, [page, time]);
  return (
    <>
      <Box flexGrow={1} mt={3} ldisplay="flex" alignItems={"center"}>
        <Typography variant="h2" gutterBottom>
          Trending of the{" "}
          <span>
            <TextField
              id="standard-select-currency"
              select
              label="Sort by"
              value={time}
              onChange={handleChange}
            >
              {queryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </span>
        </Typography>
      </Box>

      <Box flexGrow={1} mt={3} display="flex">
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

export default Trending;
