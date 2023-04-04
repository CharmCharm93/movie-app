import {
  Card,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY, IMAGE_URL } from "../api/config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function MovieDetail() {
  let params = useParams();
  let movieId = params.id;
  let navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await apiService.get(
          `/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        );
        // console.log(data);
        setMovie(data);
      } catch (error) {
        console.log(`Movies ${error}`);
      }
    };
    getMovies();
  }, [movieId]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }} mt={2} />
      <IconButton
        disableRipple={true}
        size="large"
        color="inherit"
        onClick={handleBack}
      >
        <Typography variant="h5">
          <ArrowBackIcon /> Go back
        </Typography>
      </IconButton>
      <Box sx={{ flexGrow: 1, position: "relative" }} mt={2}>
        <Card
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: 0,
            filter: "brightness(50%)",
          }}
        >
          <CardMedia
            component="img"
            image={`${IMAGE_URL}${movie?.backdrop_path}`}
          />
        </Card>

        <Grid container spacing={2} style={{ zIndex: 1, position: "relative" }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 5 }}>
              <CardMedia
                component="img"
                image={`${IMAGE_URL}${movie?.poster_path}`}
                alt={movie?.original_title}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper
              sx={{
                boxShadow: "none",
                background: "transparent",
                color: "white",
              }}
            >
              <Box padding={"10px"}>
                <Typography variant="h5" fontWeight={700}>
                  {movie?.original_title} (
                  {new Date(movie?.release_date).getFullYear()})
                </Typography>
                <Typography style={{ fontStyle: "italic" }} variant="subtitle1">
                  {movie?.tagline}
                </Typography>
                <Typography mt={2} mb={2}>
                  Overview
                </Typography>
                <Typography variant="body2">{movie?.overview}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MovieDetail;
