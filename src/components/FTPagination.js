import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material";

const StyledBox = styled("div")({
  position: "fixed",
  bottom: "0",
  zIndex: "10",
  padding: "5px",
  width: "100%",
  backgroundColor: "orange",
  marginLeft: "-10px",
});

function FTPagination({ setPage, totalPages }) {
  const handleChange = (event, value) => {
    // console.log(value);
    setPage(value);
    window.scroll(0, 0);
  };
  return (
    <StyledBox>
      <Pagination
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        variant="outlined"
        shape="rounded"
        count={totalPages}
        onChange={handleChange}
      />
    </StyledBox>
  );
}

export default FTPagination;
