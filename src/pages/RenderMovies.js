import * as React from "react";
import { IMAGE_URL } from "../api/config";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const StyleOuterRate = styled("div")({
  position: "absolute",
  top: "-25px",
  right: "5px",
  height: "38px",
  width: "42px",
  padding: "2px",
  border: "solid #ffee58",
  borderRadius: "10px",
  backgroundColor: "#ffee58",
  opacity: "0.85",
});

const StyleRateRing = styled("div")({
  position: "relative",
  textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#f57f17",
  fontSize: "1.75rem",
  fontWeight: "700",
});

export default function RenderMovies({ movie }) {
  return (
    <Card
      sx={{ width: "100%", height: "100%" }}
      style={{ borderRadius: 10, position: "relative" }}
    >
      <CardMedia
        component="img"
        image={`${IMAGE_URL}${movie.poster_path}`}
        alt={movie.title}
      />

      <CardContent style={{ position: "relative" }}>
        <StyleOuterRate>
          <StyleRateRing>{movie.vote_average} </StyleRateRing>
        </StyleOuterRate>
        <Typography variant="h6" color="text.primary" fontWeight={550}>
          {movie.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {movie.release_date}
        </Typography>
      </CardContent>
    </Card>
  );
}
