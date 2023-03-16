import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledListItem = styled(ListItem)({
  cursor: "pointer",
});

function DrawerMenu({ openMenu, setOpenMenu }) {
  const navigate = useNavigate();
  return (
    <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
      <List>
        <StyledListItem onClick={() => navigate("/login")}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </StyledListItem>
        <StyledListItem onClick={() => navigate("/movies")}>
          <ListItemIcon>
            <LiveTvIcon />
          </ListItemIcon>
          <ListItemText primary="Movies" />
        </StyledListItem>
        <StyledListItem onClick={() => navigate("/trending")}>
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary="Trending" />
        </StyledListItem>
      </List>
    </Drawer>
  );
}

export default DrawerMenu;
