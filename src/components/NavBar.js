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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Tab } from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import TheatersIcon from "@mui/icons-material/Theaters";
import DrawerMenu from "./DrawerMenu";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const StyledTab = styled(Tab)(({ theme }) => ({
  color: "#fff",
  "&.Mui-selected": {
    backgroundColor: theme.palette.grey[300],
  },
}));

function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [value, setValue] = useState("movies");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogOut = () => {
    auth.logout();
    navigate("/");
  };

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
            disableRipple={true}
          >
            <TheatersIcon />
            <Typography ml={1}>Movie station logo</Typography>
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
              label="Discover"
              onClick={() => navigate("/movies")}
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
              display: { xs: "flex", md: "none" },
            }}
            onClick={setOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          {!auth.user && (
            <IconButton
              size="large"
              color="inherit"
              sx={{ display: { xs: "none", md: "flex" } }}
              component={Link}
              to={"/login"}
            >
              <AccountCircle />
            </IconButton>
          )}

          {auth.user && (
            <>
              <Typography
                variant="h6"
                noWrap
                component="div"
                mr={2}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Welcome {auth.user} !
                <IconButton size="large" color="inherit" onClick={handleLogOut}>
                  <ExitToAppIcon />
                </IconButton>
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
      <DrawerMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </Box>
  );
}

export default NavBar;
