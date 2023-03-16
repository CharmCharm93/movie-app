import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Tab } from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TheatersIcon from "@mui/icons-material/Theaters";
import DrawerMenu from "./DrawerMenu";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledTab = styled(Tab)(({ theme }) => ({
  color: "#fff",
  "&.Mui-selected": {
    backgroundColor: theme.palette.grey[300],
  },
}));

function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);

  const [value, setValue] = useState("movies");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            sx={{
              mr: 2,
              minHeight: "72px",
            }}
          >
            <TheatersIcon />
            <Typography ml={1}>Movie station</Typography>
          </IconButton>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              mr: 2,
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            <StyledTab
              value="movies"
              icon={<LiveTvIcon />}
              label="Movies"
              onClick={() => navigate("/movies")}
            />
            <StyledTab
              value="trending"
              icon={<TrendingUpIcon />}
              label="Trending"
              onClick={() => navigate("/trending")}
            />
          </Tabs>

          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              minHeight: "72px",
              display: { xs: "flex", sm: "none" },
            }}
            onClick={setOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DrawerMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </Box>
  );
}

export default NavBar;
