import * as React from "react";
import Accordion from "@mui/material/Accordion";
import Chip from "@mui/material/Chip";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { Stack } from "@mui/system";

function GenresFT({ setGenreId, genreId }) {
  const [genres, setGenres] = React.useState([]);
  const [genreName, setGenreName] = React.useState("");
  useEffect(() => {
    const getGenres = async () => {
      try {
        const { data } = await apiService.get(
          `genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenres(data?.genres);
      } catch (error) {
        console.log(`Movies ${error}`);
      }
    };
    getGenres();
  }, []);

  const handleClick = (genreId, genreName) => {
    setGenreId(genreId);
    setGenreName(genreName);
  };
  const handleClear = () => {
    setGenreId(null);
    setGenreName("");
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Genres {genreName ? `/ ${genreName}` : ""} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column" sx={{ margin: "2px" }}>
            <Chip
              label="All"
              size="small"
              variant="outlined"
              onClick={() => handleClear()}
            />
          </Stack>
          {genres.map((genre) => (
            <Stack key={genre.id} direction="column" sx={{ margin: "2px" }}>
              <Chip
                label={genre.name}
                size="small"
                variant="outlined"
                onClick={() => handleClick(genre.id, genre.name)}
              />
            </Stack>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default GenresFT;
